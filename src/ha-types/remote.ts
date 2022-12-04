import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type RemoteEntityId = `${HAEntityTypes.remote}.${string}`

export type RemoteProperties = HassEntity & {
    state: string,
    attributes: {
        current_activity?: string,
        activity_list?: string[],
    }
}

export type RemoteEntity = {
    entity_id: RemoteEntityId,
    entity: RemoteProperties,
    turnOn: ()=> void,
    turnOff: ()=> void,
    toggle: ()=> void,
    sendCommand: (command: string|string[]) => void,
    learnCommand: (attributes: {command: string, timeout: number}) => void,
    deleteCommand: (command: string) => void,
}

export type Remote<T extends string = string>  = {
    [entity_id in T]: RemoteEntity
}
