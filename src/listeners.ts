import {eventListener, StateChangeEvent, stateListener} from './connexion';
import {HassEntity, HassServiceTarget} from "home-assistant-js-websocket";
import {isString} from "./utils/isString";
import {isRegExp} from "util/types";
import cron from 'node-cron';

type Dependency = | RegExp
    | ((event: StateChangeEvent) => boolean)
    | HassEntity
    | HassServiceTarget
    | string
    | {eventType?:string}

type Effect = (callback: (event?: StateChangeEvent) => void|Promise<void>, dependencies:Dependency[]) => void

const isCronString = (str: string) => {
  return str.split(' ').length === 5
}

//TODO add timer support and cron support
export const effect: Effect = (callback, dependencies) =>{
  dependencies.forEach(dependency => {
    if(!dependency) return;
    if(isString(dependency)){
      if(isCronString(dependency)){
        cron.schedule(dependency, ()=>callback())
      }
      else{
        stateListener((event) => {
          if (event.data.entity_id === dependency) callback(event);
        });
      }
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
    else if("eventType" in dependency){
      eventListener(callback, dependency.eventType)
    }
  })
}
