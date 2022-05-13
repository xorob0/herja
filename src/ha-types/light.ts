import {HassEntity} from "home-assistant-js-websocket";

export type LightEntityId = string //`light.${string}`
export type LightTurnOnOptions = {
    transition?: number,
    profile?: string,
    hs_color?: [number, number],
    xy_color?: [number, number],
    rgb_color?: [number, number, number],
    rgbw_color?: [number, number, number, number],
    rgbww_color?: [number, number, number, number, number],
    color_temp?: number,
    kelvin?: number,
    color_name?: string,
    brightness?: number,
    brightness_pct?: number,
    brightness_step?: number,
    brightness_step_pct?: number,
    white?: number,
    flash?:"long"|"short",
    effect?: string
}
export type LightTurnOn = (options?: LightTurnOnOptions) => void

export type LightToggle = (options?: LightTurnOnOptions) => void

export type LightTurnOffOptions = {transition?: number}
export type LightTurnOff = (options?: LightTurnOffOptions) => void

export enum ColorModes {
UNKNOWN = "unknown",
ONOFF = "onoff",
BRIGHTNESS = "brightness",
COLOR_TEMP = "color_temp",
HS = "hs",
XY = "xy",
RGB = "rgb",
RGBW = "rgbw",
RGBWW = "rgbww",
WHITE = "white"
}


export type LightState = HassEntity & {
    entity_id: LightEntityId,
    state: "on" | "off" | "unavailable",
    attributes: {
        supported_color_modes: ColorModes[],
        min_mireds: number,
        max_mireds: number,
        effect_list: string[]
    },
}


export type Light<T extends string = string> = {
    [entity_id in T]: {
        entity_id: LightEntityId
        state: LightState
        turn_on: LightTurnOn
        turn_off: LightTurnOff
        toggle: LightToggle
    }
}