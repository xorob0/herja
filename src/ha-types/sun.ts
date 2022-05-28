import {HassEntity} from "home-assistant-js-websocket";

export type SunId = string//`binary_sensor.${string}`

//TODO abstract this
export type SunState = HassEntity & {
    entity_id: SunId,
    state: "below_horizon" | "above_horizon" | "unavailable"| string,
}

export type Sun<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: SunId,
        state: SunState,
        isAboveHorizon: ()=> boolean,
        isBelowHorizon: ()=> boolean
    }
}