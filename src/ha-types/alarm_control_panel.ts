import {HassEntity} from "home-assistant-js-websocket";

export type AlarmControlPanelEntityId = string//`binary_sensor.${string}`

export type ArmingOptions = {
    code?: string
}

//TODO abstract this
export type AlarmControlPanelState = HassEntity & {
    entity_id: AlarmControlPanelEntityId,
    state: "disarmed" | "armed_home" | "armed_away" | "armed_night" | "unavailable" | string,
}

export type AlarmControlPanel<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: AlarmControlPanelEntityId,
        state: AlarmControlPanelState,
        isArmed: () => boolean,
        isDisarmed: () => boolean,
        armAway: (option?: ArmingOptions) => void,
        armHome: (option?: ArmingOptions) => void,
        armNight: (option?: ArmingOptions) => void,
        disarm: (option?: ArmingOptions) => void,
    }
}