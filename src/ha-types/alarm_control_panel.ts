import { HAEntityTypes } from "./entityTypes";

export type AlarmControlPanelEntityId = `${HAEntityTypes.alarm_control_panel}.${string}`

export type CodeFormat = "number" | "text"

export type ArmingOptions = {
    code?: string
}

export enum AlarmControlPanelState {
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

export type AlarmControlPanelProperties = {
    state: AlarmControlPanelState
    attributes: {
        code_format: string,
        changed_by: string,
    }
}

export type AlarmControlPanelEntity = {
    entity_id: AlarmControlPanelEntityId,
    entity: AlarmControlPanelProperties,
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

export type AlarmControlPanel<T extends string = string>  = {
    [entity_id in T]: AlarmControlPanelEntity
}
