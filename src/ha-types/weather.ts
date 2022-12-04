import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type WeatherEntityId = `${HAEntityTypes.weather}.${string}`

export type Forecast = {
    datetime: string,
    native_temperature: number,
    condition?: string,
    native_templow?: number,
    native_precipitation?: number,
    precipitation_probability?: number,
    native_pressure?: number,
    wind_bearing?: number|string,
    native_wind_speed?: number,
}

export type WeatherProperties = HassEntity & {
    state: boolean,
    attributes: {
        condition: string,
        native_temperature: number,
        native_temperature_unit: string,
        native_pressure?: number,
        native_pressure_unit?: string,
        humidity?: number,
        ozone?: number,
        native_visibility?: number,
        native_visibility_unit?: string,
        native_wind_speed?: number,
        native_wind_speed_unit?: string,
        native_precipitation?: number,
        native_precipitation_unit?: string,
        wind_bearing?: number | string,
        forecast?: Forecast[]
    }
}
export type WeatherEntity = {
    entity_id: WeatherEntityId,
      entity: WeatherProperties,
}

export type Weather<T extends string = string>  = {
    [entity_id in T]: WeatherEntity
}
