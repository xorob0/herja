import { HAEntityTypes } from "./entityTypes";

export type SwitchEntityId = `${HAEntityTypes.switch}.${string}`

export type SwitchProperties = {
    state: boolean | null,
    attributes: {
        is_on?: boolean,
        [x:string]: string | boolean | undefined,
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

export const SwitchStateMapper:Record<string, boolean|undefined> = {
    "on": true,
    "off": false,
}
