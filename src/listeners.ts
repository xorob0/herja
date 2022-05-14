import { StateChangeEvent, stateListener } from './connexion';
import { EntityId } from './ha-types';
import {HassEntity, HassServiceTarget} from "home-assistant-js-websocket";
import {isString} from "./utils/isString";
import {isRegExp} from "util/types";

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
      stateListener((event) => {
        if (event.data.entity_id === dependency) callback(event);
      });
    }
    else if(isRegExp(dependency)){
      stateListener((event) => {
        if (event.data.entity_id.match(dependency)) callback(event);
      });
    }
    else if(typeof dependency === "function"){
      stateListener((event) => {
        if (dependency(event)) callback(event);
      });
    }
    else if("entity_id" in dependency){
      stateListener((event) => {
        if (event.data.entity_id === dependency.entity_id) callback(event);
      });
    }
  })
}
