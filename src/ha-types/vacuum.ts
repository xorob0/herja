import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type VacuumEntityId = `${HAEntityTypes.vacuum}.${string}`

export enum VacuumState {
    STATE_CLEANING = "STATE_CLEANING",
    STATE_DOCKED = "STATE_DOCKED",
    STATE_PAUSED = "STATE_PAUSED",
    STATE_RETURNING = "STATE_RETURNING",
    STATE_ERROR = "STATE_ERROR",
    STATE_IDLE = "STATE_IDLE",
}

export type VacuumProperties = HassEntity & {
    state: VacuumState,
    attributes: {
        name: string
        battery_level?: number,
        battery_icon?: string,
        fan_speed?: string,
        fan_speed_list?: string[],
        error?: string,
    }
}

export type VacuumEntity = {
    entity_id: VacuumEntityId,
    entity: VacuumProperties,
    turnOn: ()=> void,
    turnOff: ()=> void,
    returnToBase: ()=> void,
    stop: ()=> void,
    start: ()=> void,
    locate: ()=> void,
    setFanSpeed: (fan_speed: string)=> void,
    sendCommand: (command: string)=> void,
}

export type Vacuum<T extends string = string>  = {
    [entity_id in T]: VacuumEntity
}
