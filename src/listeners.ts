import { shadowState, StateChangeEvent, stateListener } from './connexion';
import { EntityId } from './ha-types/common';
import {HassEntity, HassServiceTarget} from "home-assistant-js-websocket";
import {isString} from "./utils/isString";
import {isRegExp} from "util/types";

/**
 * @deprecated Use effect instead
 */
export const listenForEntity: <T>(
  entity:
    | EntityId
    | EntityId[]
    | RegExp
    | ((event: StateChangeEvent<T>) => boolean),
  callback: (event: StateChangeEvent<T>) => void,
) => void = (entity, callback) => {
  if (typeof entity === 'string')
    stateListener((event) => {
      if (event.data.entity_id === entity) callback(event);
    });
  else if ('exec' in entity)
    stateListener((event) => {
      if (event.data.entity_id.match(entity)) callback(event);
    });
  else if (typeof entity === 'function') {
    stateListener((event) => {
      if (entity(event)) {
        callback(event);
      }
    });
  } else
    entity.forEach((id) =>
      stateListener((event) => {
        if (event.data.entity_id === id) callback(event);
      }),
    );
};


/**
 * @deprecated Use effect instead
 */
export const onEntitiesStates: <T>(
  entitiesState: ({ entity_id: EntityId } & Partial<{
    state: number | boolean | string;
    not: number | boolean | string;
  }>)[],
  callback: (event: StateChangeEvent<T>) => void,
  otherwise?: (event: StateChangeEvent<T>) => void,
) => void = (entitiesState, callback, otherwise) => {
  entitiesState.forEach(({ entity_id, state: currentEntityState }) => {
    listenForEntity(entity_id, (event) => {
      const isAllEntitiesCorrect = entitiesState.reduce(
        (isCorrect, { entity_id, state }) => {
          if (!isCorrect) return false;
          if (
            entity_id === event.data.entity_id &&
            currentEntityState === event.data.new_state.state
          )
            return true;
          return shadowState[entity_id].state === state;
        },
        true,
      );

      if (isAllEntitiesCorrect) callback(event);
      else otherwise?.(event);
    });
  });
};


type Dependency<T> = | EntityId
    | RegExp
    | ((event: StateChangeEvent<T>) => boolean)
    | HassEntity
    | HassServiceTarget
    | string

type Effect = <T = unknown>(callback: (event: StateChangeEvent) => void, dependencies:Dependency<T>[]) => void

export const effect: Effect = (callback, dependencies) =>{
  dependencies.forEach(dependency => {
    if(isString(dependency)){
      console.log('string', dependency)
      stateListener((event) => {
        if (event.data.entity_id === dependency) callback(event);
      });
    }
    else if(isRegExp(dependency)){
      console.log('regex', dependency)
      stateListener((event) => {
        if (event.data.entity_id.match(dependency)) callback(event);
      });
    }
    else if(typeof dependency === "function"){
      console.log('function', dependency)
      stateListener((event) => {
        if (dependency(event)) callback(event);
      });
    }
    else if("entity_id" in dependency){
      console.log('entity', dependency)
      stateListener((event) => {
        if (event.data.entity_id === dependency.entity_id) callback(event);
      });
    }
  })
}
