import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type SwitchEntityId = `${HAEntityTypes.switch}.${string}`

export type SwitchProperties = HassEntity & {
    state: boolean,
    attributes: {
        is_on?: boolean,
    }
}

export type SwitchEntity = {
    entity_id: SwitchEntityId,
    entity: SwitchProperties,
    turnOn: ()=> void,
    turnOff: ()=> void,
    toggle: ()=> void,
    isOn: ()=> boolean
}

export type Switch<T extends string = string>  = {
    [entity_id in T]: SwitchEntity
}
