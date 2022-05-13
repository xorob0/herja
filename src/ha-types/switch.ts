export type SwitchEntityId = string //`switch.${string}`
export type SwitchTurnOn = () => void

export type SwitchToggle = () => void

export type SwitchTurnOff = () => void

//TODO abstract this
export type SwitchState = {
    entity_id: SwitchEntityId,
    state: string,//"on" | "off" | "unavailable",
    last_changed: string,
    last_updated: string,
    context: {
        id: string,
        parent_id?: string| null,
        user_id: string
    }
}


export type Switch = {
    [entity_id: string]: {
        entity_id: SwitchEntityId,
        state: SwitchState,
        turn_on: SwitchTurnOn,
        turn_off: SwitchTurnOff,
        toggle: SwitchToggle
    }
}