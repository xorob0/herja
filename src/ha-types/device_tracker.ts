import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type DeviceTrackerEntityId = `${HAEntityTypes.device_tracker}.${string}`

export enum DeviceTrackerState {
    HOME = "home",
    NOT_HOME = "not_home",
    UNKNOWN = "unknown",
}

export enum SourceType {
    GPS = "gps",
    BLUETOOTH = "bluetooth",
    ROUTER = "router",
    WIFI = "wifi",
    CELL = "cell",
}

export type DeviceTrackerProperties = HassEntity & {
    state: DeviceTrackerState,
    attributes: {
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
}

export type DeviceTrackerEntity = {
    entity_id: DeviceTrackerEntityId,
    entity: DeviceTrackerProperties,
    isHome: ()=> boolean
}

export type DeviceTracker<T extends string = string>  = {
    [entity_id in T]: DeviceTrackerEntity
}
