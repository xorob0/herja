import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type SunId = `${HAEntityTypes.sun}.${string}`

export enum SunState {
    ABOVE_HORIZON = "above_horizon",
    BELOW_HORIZON = "below_horizon",
}

export type SunProperties = HassEntity & {
    state: SunState,
}

export type SunEntity = {
    entity_id: SunId,
    entity: SunProperties,
    isAboveHorizon: ()=> boolean,
    isBelowHorizon: ()=> boolean
}

export type Sun<T extends string = string>  = {
    [entity_id in T]: SunEntity
}
