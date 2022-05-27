// Based on https://github.com/keesschollaart81/vscode-home-assistant/blob/master/src/language-service/src/home-assistant/socket.ts
import WebSocket = require('ws');
import {
  callService as cs,
  ConnectionOptions,
  createConnection,
  getStates as gs,
  HassEntity,
  HassServiceTarget,
  HaWebSocket,
} from 'home-assistant-js-websocket';
import generateEntities from './utils/generate-entities';

const MSG_TYPE_AUTH_REQUIRED = 'auth_required';
const MSG_TYPE_AUTH_INVALID = 'auth_invalid';
const MSG_TYPE_AUTH_OK = 'auth_ok';
const ERR_CANNOT_CONNECT = 1;
const ERR_INVALID_AUTH = 2;

export let shadowState = {} as { [x in string]: HassEntity };

export type StateChangeEvent = Record<string, unknown> & {
  data: HassEntity & {new_state: HassEntity, old_state: HassEntity}
};

export let callService: (
  domain: string,
  service: string,
  serviceData?: object,
  target?: HassServiceTarget,
) => Promise<unknown> | never = () => {
  throw new Error('Connection was not initialized');
};

export let stateListener: (
  callback: (event: StateChangeEvent) => void,
) => void = () => {
  throw new Error('Connection was not initialized');
};

export let eventListener: (
    callback: (event: StateChangeEvent) => void,
    eventType?: string
) => void = () => {
  throw new Error('Connection was not initialized');
};

export const configure = async ({
  url,
  access_token,
  path,
}: {
  url: string;
  access_token: string;
  path?: string;
}) => {
  const createSocket: (
    options: ConnectionOptions,
  ) => Promise<HaWebSocket> = () => {
    console.log(
      '[Auth phase] Initializing WebSocket connection to Home Assistant',
      url,
    );

    const connect: (
      triesLeft: number,
      promResolve: (socket: any) => void,
      promReject: (err: number) => void,
    ) => void = (triesLeft, promResolve, promReject) => {
      console.log(
        `[Auth Phase] Connecting to Home Assistant... Tries left: ${triesLeft}`,
        url,
      );

      const socket: WebSocket & { haVersion?: string } = new WebSocket(url, {
        rejectUnauthorized: false,
      });

      // If invalid auth, we will not try to reconnect.
      let invalidAuth = false;

      const closeMessage = (ev: {
        wasClean: boolean;
        code: number;
        reason: string;
        target: WebSocket;
      }) => {
        let errorMessage;
        if (ev && ev.code && ev.code !== 1000) {
          errorMessage = `WebSocket connection to Home Assistant closed with code ${ev.code} and reason ${ev.reason}`;
        }
        closeOrError(errorMessage);
      };

      const errorMessage = (ev: {
        error: any;
        message: any;
        type: string;
        target: WebSocket;
      }) => {
        // If we are in error handler make sure close handler doesn't also fire.
        socket.removeEventListener('close', closeMessage);
        let errMessage =
          'Disconnected from Home Assistant with a WebSocket error';
        if (ev.message) {
          errMessage += ` with message: ${ev.message}`;
        }
        closeOrError(errMessage);
      };

      const closeOrError = (errorText?: string) => {
        if (errorText) {
          console.log(
            `WebSocket Connection to Home Assistant closed with an error: ${errorText}`,
          );
        }
        if (invalidAuth) {
          promReject(ERR_INVALID_AUTH);
          return;
        }

        // Reject if we no longer have to retry
        if (triesLeft === 0) {
          // We never were connected and will not retry
          promReject(ERR_CANNOT_CONNECT);
          return;
        }

        const newTries = triesLeft === -1 ? -1 : triesLeft - 1;
        // Try again in a second
        setTimeout(() => connect(newTries, promResolve, promReject), 1000);
      };

      // Auth is mandatory, so we can send the auth message right away.
      const handleOpen = async (): Promise<void> => {
        try {
          socket.send(
            JSON.stringify({
              type: 'auth',
              access_token,
            }),
          );
        } catch (err) {
          // Refresh token failed
          invalidAuth = err === ERR_INVALID_AUTH;
          socket.close();
        }
      };

      const handleMessage = (event: {
        data: any;
        type: string;
        target: WebSocket;
      }) => {
        const message = JSON.parse(event.data);

        console.log(
          `[Auth phase] Received a message of type ${message.type}`,
          message,
        );

        switch (message.type) {
          case MSG_TYPE_AUTH_INVALID:
            invalidAuth = true;
            socket.close();
            break;

          case MSG_TYPE_AUTH_OK:
            socket.removeEventListener('open', handleOpen);
            socket.removeEventListener('message', handleMessage);
            socket.removeEventListener('close', closeMessage);
            socket.removeEventListener('error', errorMessage);
            socket.haVersion = message.ha_version;
            promResolve(socket);
            break;

          default:
            // We already send this message when socket opens
            if (message.type !== MSG_TYPE_AUTH_REQUIRED) {
              console.log('[Auth phase] Unhandled message', message);
            }
        }
      };

      socket.addEventListener('open', handleOpen);
      socket.addEventListener('message', handleMessage);
      socket.addEventListener('close', closeMessage);
      socket.addEventListener('error', errorMessage);
    };

    return new Promise((resolve, reject) => connect(3, resolve, reject));
  };

  const connection = await createConnection({
    createSocket,
  });

  callService = (domain, service, serviceData, target) => {
    return cs(connection, domain, service, serviceData, target);
  };

  stateListener = (callback) => {
    connection.subscribeEvents(callback, 'state_changed');
  };
  eventListener = (callback, eventType) => {
    connection.subscribeEvents(callback, eventType);
  };

  // Init state
  const states = await gs(connection);
  shadowState = states.reduce(
    (acc, entity) => ({ ...acc, [entity.entity_id]: entity }),
    {},
  );
  stateListener((event) => {
    shadowState[event.data.entity_id] = event.data.new_state;
  });

  if (path) {
    await generateEntities({ config: { path } });
    console.log('Entites generated');
  }

  return connection;
};
