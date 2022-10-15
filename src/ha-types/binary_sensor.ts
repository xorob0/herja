import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type BinarySensorEntityId = `${HAEntityTypes.binary_sensor}.${string}`

export enum BinarySensorDeviceClass {
    BATTERY="battery",
    BATTERY_CHARGING="battery_charging",
    CO="co",
    COLD="cold",
    CONNECTIVITY="connectivity",
    DOOR="door",
    GARAGE_DOOR="garage_door",
    GAS="gas",
    HEAT="heat",
    LIGHT="light",
    LOCK="lock",
    MOISTURE="moisture",
    MOTION="motion",
    MOVING="moving",
    OCCUPANCY="occupancy",
    OPENING="opening",
    PLUG="plug",
    POWER="power",
    PRESENCE="presence",
    PROBLEM="problem",
    RUNNING="running",
    SAFETY="safety",
    SMOKE="smoke",
    SOUND="sound",
    TAMPER="tamper",
    UPDATE="update",
    VIBRATION="vibration",
    WINDOW="window"
}
export type BinarySensorState = HassEntity & {
    entity_id: BinarySensorEntityId,
    state: boolean,
    device_class?: BinarySensorDeviceClass
}

export type BinarySensor<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: BinarySensorEntityId,
        state: BinarySensorState,
        isOn: ()=> boolean
    }
}