import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type WaterHeaterEntityId = `${HAEntityTypes.water_heater}.${string}`

export enum WaterHeaterTemperatureUnit {
    TEMP_CELSIUS = "C",
    TEMP_FAHRENHEIT = "F",
    TEMP_KELVIN = "K",
}

export enum WaterHeateState {
    STATE_ECO = "STATE_ECO",
    STATE_ELECTRIC = "STATE_ELECTRIC",
    STATE_PERFORMANCE = "STATE_PERFORMANCE",
    STATE_HIGH_DEMAND = "STATE_HIGH_DEMAND",
    STATE_HEAT_PUMP = "STATE_HEAT_PUMP",
    STATE_GAS = "STATE_GAS",
    STATE_OFF = "STATE_OFF",
}

export type WaterHeaterProperties = HassEntity & {
    state: WaterHeateState,
    attributes: {
        min_temp?: number,
        max_temp?: number,
        current_temperature?: number,
        target_temperature?: number,
        target_temperature_high?: number,
        target_temperature_low?: number,
        temperature_unit?: WaterHeaterTemperatureUnit,
        current_operation?: string,
        operation_list?: string[],
        supported_features?: string[],
        is_away_mode_on?: boolean,
    }
}

export type WaterHeaterEntity = {
    entity_id: WaterHeaterEntityId,
    entity: WaterHeaterProperties,
    setTemperature: (temperature:number)=> void,
    setOperationMode: (mode:string)=> void,
    turnOnAwayMode: ()=> void,
    turnOffAwayMode: ()=> void,
}

export type WaterHeater<T extends string = string>  = {
    [entity_id in T]: WaterHeaterEntity
}
