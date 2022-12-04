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
export type BinarySensorProperties ={state: boolean, attributes: {device_class: BinarySensorDeviceClass, [x:string]: string}}

export type BinarySensorEntity =  {
    entity_id: BinarySensorEntityId,
    entity: BinarySensorProperties
    isOn: ()=> boolean
    isOff: ()=> boolean
}

export const BinarySensorStateMapper:Record<string, boolean|undefined> = {
    "on": true,
    "off": false,
}

export type BinarySensor<T extends string = string>  = {
    [entity_id in T]: BinarySensorEntity
}
