import {HassEntity} from "home-assistant-js-websocket";

export type PersonId = string//`binary_sensor.${string}`

//TODO abstract this
export type PersonState = HassEntity & {
    entity_id: PersonId,
    state: "home" | "not_home" | "unavailable"| string,
}

export type Person<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: PersonId,
        state: PersonState,
        isHome: ()=> boolean
    }
}