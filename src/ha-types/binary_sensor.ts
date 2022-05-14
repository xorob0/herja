import {HassEntity} from "home-assistant-js-websocket";

export type BinarySensorEntityId = string//`binary_sensor.${string}`

//TODO abstract this
export type BinarySensorState = HassEntity & {
    entity_id: BinarySensorEntityId,
    state: {state: "on" | "off" | "unavailable"},
}

export type BinarySensor<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: BinarySensorEntityId,
        state: BinarySensorState,
    }
}