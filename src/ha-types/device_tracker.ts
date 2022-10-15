import {HassEntity} from "home-assistant-js-websocket";

export type DeviceTrackerEntityId = string//`binary_sensor.${string}`

export enum DeviceTrackerStateState {
    HOME = "home",
    NOT_HOME = "not_home",
}

export enum SourceType {
    GPS = "gps",
    BLUETOOTH = "bluetooth",
    ROUTER = "router",
    WIFI = "wifi",
    CELL = "cell",
}

//TODO abstract this
export type DeviceTrackerState = HassEntity & {
    entity_id: DeviceTrackerEntityId,
    state: DeviceTrackerStateState,
    source_type?: SourceType
    is_connected?: boolean,
    battery_level?: number,
    ip_address?: string,
    mac_address?: string,
    hostname?: string,
    latitude?: number,
    longitude?: number,
    location_accuracy?: number,
    location_name?: string,

}

export type DeviceTracker<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: DeviceTrackerEntityId,
        state: DeviceTrackerState,
        isHome: ()=> boolean
    }
}