import { HassEntity } from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type AirQualityEntityId = `${HAEntityTypes.air_quality}.${string}`

export type AirQualityState = HassEntity & {
    entity_id: AirQualityEntityId,
    particulate_matter_2_5: number,
    particulate_matter_10: number,
    particulate_matter_0_1?: number,
    air_quality_index?: number,
    ozone?: number,
    carbon_monoxide?: number,
    carbon_dioxide?: number,
    sulphur_dioxide?: number,
    nitrogen_oxide?: number,
    nitrogen_monoxide?: number,
    nitrogen_dioxide?: number,
    volatile_organic_compounds?: number
}

export type AirQuality<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: AirQualityEntityId,
        state: AirQualityState,
    }
}