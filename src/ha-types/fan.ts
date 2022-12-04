import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type FanEntityId = `${HAEntityTypes.fan}.${string}`

export type FanProperties = HassEntity & {
    state: boolean,
    attributes: {
        current_direction?: string,
        is_on: boolean,
        oscillating: boolean,
        percentage: number,
        speed_count: number,
        supported_features: number,
        preset_mode?: string,
        preset_modes?: string[],
    }
}

export type FanEntity = {
    entity_id: FanEntityId,
    entity: FanProperties,
    setDirection?: (direction:string)=> void,
    setPresetMode?: (presetMode:string)=> void,
    setSpeedPercentage?: (speedPercentage:number)=> void,
    turnOn: ()=> void,
    turnOff: ()=> void,
    setOscillating?: (oscillating:boolean)=> void,
}

export type Fan<T extends string = string>  = {
    [entity_id in T]: FanEntity
}
