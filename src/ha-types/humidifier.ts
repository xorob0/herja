import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type HumidifierEntityId = `${HAEntityTypes.humidifier}.${string}`

export enum HumidifierModes {
    MODE_NORMAL = "MODE_NORMAL",
    MODE_ECO = "MODE_ECO",
    MODE_AWAY = "MODE_AWAY",
    MODE_BOOST = "MODE_BOOST",
    MODE_COMFORT = "MODE_COMFORT",
    MODE_HOME = "MODE_HOME",
    MODE_SLEEP = "MODE_SLEEP",
    MODE_AUTO = "MODE_AUTO",
    MODE_BABY = "MODE_BABY",
}

export enum HumidifierDeviceClasses {
    DEVICE_CLASS_DEHUMIDIFIER = "DEVICE_CLASS_DEHUMIDIFIER",
    DEVICE_CLASS_HUMIDIFIER = "DEVICE_CLASS_HUMIDIFIER",
}

export type HumidifierProperties = HassEntity & {
    state: boolean,
    attributes: {
        target_humidity: number,
        max_humidity: number,
        min_humidity: number,
        mode: HumidifierModes,
        available_modes: HumidifierModes[],
        is_on: boolean,
        device_class: HumidifierDeviceClasses
    }
}

export type HumidifierEntity = {
    entity_id: HumidifierEntityId,
    entity: HumidifierProperties,
    setMode?: (mode:HumidifierModes)=> void,
    setHumidity?: (humidity:string)=> void,
    turnOn: ()=> void,
    turnOff: ()=> void,
}

export type Humidifier<T extends string = string>  = {
    [entity_id in T]: HumidifierEntity
}
