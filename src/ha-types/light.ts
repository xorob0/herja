import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type LightEntityId = `${HAEntityTypes.light}.${string}`

export type LightProperties = HassEntity & {
    state: boolean,
    attributes: {
        brightness?: number,
        color_temp?: number,
        effect?: string,
        effect_list?: string[],
        max_mireds?: number,
        min_mireds?: number,
        hs_color?: [number, number],
        rgb_color?: [number, number, number],
        rgbw_color?: [number, number, number, number],
        rgbww_color?: [number, number, number, number, number],
        supported_color_modes?: string[],
        supported_features?: number,
        white_value?: number,
        xy_color?: [number, number],
    }
}

export type LightTurnOnAttributes = {
    brightness?: number,
    hs_color?: number,
    rgb_color?: [number, number, number],
    rgbw_color?: [number, number, number, number],
    rgbww_color?: [number, number, number, number, number],
    xy_color?: [number, number],
    transition?: number,
}

export type LightEntity = {
    entity_id: LightEntityId,
    entity: LightProperties,
    turnOn: (attributes?: LightTurnOnAttributes)=> void,
    turnOff: ()=> void,
    toggle: (attributes?: LightTurnOnAttributes)=> void,
}

export type Light<T extends string = string>  = {
    [entity_id in T]: LightEntity
}
