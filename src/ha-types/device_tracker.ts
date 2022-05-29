import {HassEntity} from "home-assistant-js-websocket";

export type DeviceTrackerEntityId = string//`binary_sensor.${string}`

//TODO abstract this
export type DeviceTrackerState = HassEntity & {
    entity_id: DeviceTrackerEntityId,
    state: "home" | "not_home" | "unavailable"| string,
}

export type DeviceTracker<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: DeviceTrackerEntityId,
        state: DeviceTrackerState,
        isHome: ()=> boolean
    }
}