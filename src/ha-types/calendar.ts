import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type CalendarEntityId = `${HAEntityTypes.calendar}.${string}`


export type CalendarProperties = HassEntity & {
    state: boolean,
    attributes: {
        event: unknown,
    }
}

export type CalendarEntity = {
    entity_id: CalendarEntityId,
    entity: CalendarProperties,
}

export type Calendar<T extends string = string>  = {
    [entity_id in T]: CalendarEntity
}
