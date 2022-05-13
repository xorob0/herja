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
export type LightTurnOn = (options: LightTurnOnOptions) => void

export type LightToggle = (options: LightTurnOnOptions) => void

export type LightTurnOffOptions = {transition: number}
export type LightTurnOff = (options: LightTurnOffOptions) => void

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


export type LightState = {
    entity_id: LightEntityId,
    state: "on" | "off" | "unavailable",
    attributes: {
        supported_color_modes: ColorModes[],
        friendly_name: string,
        supported_features: number,
        min_mireds: number,
        max_mireds: number,
        effect_list: string[]
        //TODO probably more
    },
    last_changed: string,
    last_updated: string,
    context: {
        id: string,
        parent_id?: string| null,
        user_id: string
    }
}


export type Light = {
    [entity_id: string]: {
        entity_id: LightEntityId,
        state: LightState,
        turn_on: LightTurnOn,
        turn_off: LightTurnOff,
        toggle: LightToggle
    }
}