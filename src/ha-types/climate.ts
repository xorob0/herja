import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type ClimateEntityId = `${HAEntityTypes.climate}.${string}`

export enum HVAC_MODE {
    OFF='off',
    ON='on',
    HEAT="heat",
    HEAT_COOL="heat_cool",
    COOL="cool",
    AUTO="auto",
    DRY="dry",
    FAN_ONLY="fan_only"
}
export enum PRESET_MODE  {
    ECO='eco',
    AWAY="away",
    BOOST="boost",
    COMFORT="comfort",
    HOME="home",
    SLEEP="sleep",
    ACTIVITY="activity"
}
export enum FAN_MODE {
    ON="on",
    OFF="off",
    AUTO="auto",
    LOW="low",
    MEDIUM="medium",
    HIGH="high",
    MIDDLE="middle",
    FOCUS="focus",
    DIFFUSE="diffuse",
}
export enum SWING_MODE {
    ON="on",
    OFF="off",
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
    BOTH = 'both'
}

export type ClimateProperties = HassEntity & {
    state: HVAC_MODE,
    attributes: {
        temperature_unit?: string,
        precision?: number,
        current_temperature?: number,
        current_humidity?: number,
        target_temperature?: number,
        target_temperature_high?: number,
        target_temperature_low?: number,
        target_temperature_step?: number,
        target_humidity?: number,
        max_temp?: number,
        min_temp?: number,
        max_humidity?: number,
        min_humidity?: number,
        hvac_mode?: HVAC_MODE,
        preset_mode?: PRESET_MODE,
        preset_modes?: PRESET_MODE[],
        fan_mode?: FAN_MODE,
        fan_modes?: FAN_MODE[],
        swing_mode?: SWING_MODE,
        swing_modes?: SWING_MODE[],
        is_aux_heat?: boolean,
        supported_features?: number
    }
}

export type ClimateEntity = {
    entity_id: ClimateEntityId,
    entity: ClimateProperties,
    turnOn: () => void,
    turnOff: () => void,
    setHeating: () => void,
    setCooling: () => void,
    setHeatCool: () => void,
    setAuto: () => void,
    setDry: () => void,
    setFanOnly: () => void,
    setEco: () => void,
    setAway: () => void,
    setBoost: () => void,
    setComfort: () => void,
    setHome: () => void,
    setSleep: () => void,
    setActivity: () => void,
    setFanOn: () => void,
    setFanOff: () => void,
    setFanAuto: () => void,
    setFanLow: () => void,
    setFanMedium: () => void,
    setFanHigh: () => void,
    setFanMiddle: () => void,
    setFanFocus: () => void,
    setFanDiffuse: () => void,
    setSwingOff: () => void,
    setSwingOn: () => void,
    setSwingVertical: () => void,
    setSwingHorizontal: () => void,
    setSwingBoth: () => void,
    setTargetTemperature: (temperature: number) => void,
    setTargetTemperatureRange: (min: number, max: number) => void,
    setFanMode: (fanMode: FAN_MODE) => void,
    setPresetMode: (presetMode: PRESET_MODE) => void,
    setSwingMode: (swingMode: SWING_MODE) => void,
    setAuxHeatOn: () => void,
    setAuxHeatOff: () => void,
}

export type Climate<T extends string = string>  = {
    [entity_id in T]: ClimateEntity
}
