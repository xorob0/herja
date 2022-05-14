import {HassEntity} from "home-assistant-js-websocket";

export type SwitchEntityId = string //`switch.${string}`
export type SwitchTurnOn = () => void

export type SwitchToggle = () => void

export type SwitchTurnOff = () => void

//TODO abstract this
export type SwitchState = HassEntity & {
    entity_id: SwitchEntityId,
    state: {state: "on" | "off" | "unavailable"},
}


export type Switch<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: SwitchEntityId,
        state: SwitchState,
        turn_on: SwitchTurnOn,
        turn_off: SwitchTurnOff,
        toggle: SwitchToggle
    }
}