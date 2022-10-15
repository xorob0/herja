import { HassEntity } from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type AlarmControlPanelEntityId = `${HAEntityTypes.alarm_control_panel}.${string}`

export type ArmingOptions = {
    code?: string
}

export enum AlarmControlPanelStateState {
    DISARMED = "disarmed",
    ARMED_HOME = "armed_home",
    ARMED_AWAY = "armed_away",
    ARMED_NIGHT = "armed_night",
    ARMED_VACATION = "armed_vacation",
    ARMED_CUSTOMBYPASS = "armed_custom_bypass",
    PENDING = "pending",
    ARMING = "arming",
    DISARMING = "disarming",
    TRIGGERED = "triggered"
}

export type AlarmControlPanelState = HassEntity & {
    entity_id: AlarmControlPanelEntityId,
    state: AlarmControlPanelStateState
}

export type AlarmControlPanel<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: AlarmControlPanelEntityId,
        state: AlarmControlPanelState,
        isArmed: () => boolean,
        isDisarmed: () => boolean,
        armAway: (option?: ArmingOptions) => void,
        armCustomBypass: (option?: ArmingOptions) => void,
        armHome: (option?: ArmingOptions) => void,
        armNight: (option?: ArmingOptions) => void,
        armVacation: (option?: ArmingOptions) => void,
        trigger: (option?: ArmingOptions) => void,
        disarm: (option?: ArmingOptions) => void,
    }
}