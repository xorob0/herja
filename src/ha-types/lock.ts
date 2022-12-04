import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type LockEntityId = `${HAEntityTypes.lock}.${string}`

export enum LockState {
    LOCKED = "locked",
    UNLOCKED = "unlocked",
    LOCKING = "locking",
    UNLOCKING = "unlocking",
}

export type LockProperties = HassEntity & {
    state: LockState,
    attributes: {
        is_locked?: boolean,
        is_unlocked?: boolean,
        is_locking?: boolean,
        is_unlocking?: boolean,
        is_jammed?: boolean,
        code_format?: "number" | "text",
        changed_by?: string,
    }
}

export type LockEntity = {
    entity_id: LockEntityId,
    entity: LockProperties,
    lock: () => void,
    unlock: ()=> void,
    open: ()=> void,
}

export type Lock<T extends string = string>  = {
    [entity_id in T]: LockEntity
}
