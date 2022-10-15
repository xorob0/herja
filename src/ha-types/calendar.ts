import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type CalendarEntityId = `${HAEntityTypes.calendar}.${string}`


export type CalendarState = HassEntity & {
    entity_id: CalendarEntityId,
    event: unknown,
    state: boolean,
}

export type Calendar<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: CalendarEntityId,
        state: CalendarState,
        press: ()=> boolean
    }
}