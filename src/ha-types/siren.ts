import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type SirenEntityId = `${HAEntityTypes.siren}.${string}`

export type SirenProperties = HassEntity & {
    state: boolean,
    attributes: {
        is_on?: boolean,
        available_tones?: string[],
    }
}

export type SirenTurnOnAttributes = {
    tone?: string,
    duration?: number,
    volume_level?: number,
}
export type SirenEntity = {
    entity_id: SirenEntityId,
    entity: SirenProperties,
    turnOn: (attributes: SirenTurnOnAttributes)=> void,
    turnOff: ()=> void,
}

export type Siren<T extends string = string>  = {
    [entity_id in T]: SirenEntity
}
