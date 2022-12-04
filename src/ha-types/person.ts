import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type PersonId =`${HAEntityTypes.person}.${string}`

export type PersonProperties = HassEntity & {
    state: "home" | "not_home" | "unavailable"| string,
}

export type PersonEntity = {
    entity_id: PersonId,
    entity: PersonProperties,
    isHome: ()=> boolean
}

export type Person<T extends string = string>  = {
    [entity_id in T]: PersonEntity
}
