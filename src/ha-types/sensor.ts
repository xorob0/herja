import {HassEntity} from "home-assistant-js-websocket";

export type SensorEntityId = string//`binary_sensor.${string}`

//TODO abstract this
export type SensorState = HassEntity & {
    entity_id: SensorEntityId,
    state: "unavailable"| string,
}

export type Sensor<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: SensorEntityId,
        state: SensorState,
    }
}