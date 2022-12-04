import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type CoverEntityId = `${HAEntityTypes.cover}.${string}`

export enum CoverState {
    OPEN="open",
    CLOSED="closed",
    OPENING = "opening",
    CLOSING = "closing",
}

export enum CoverDeviceClasses {
    AWNING = "awning",
    BLIND = "blind",
    CURTAIN = "curtain",
    DOOR = "door",
    GARAGE = "garage",
    GATE = "gate",
    SHADE = "shade",
    SHUTTER = "shutter",
    WINDOW = "window",
}

export type CoverProperties = HassEntity & {
    state: CoverState,
    attributes: {
        current_cover_position?: number,
        current_cover_tilt_position?: number,
        is_opening?: boolean,
        is_closing?: boolean,
        is_closed?: boolean,
        device_class?: CoverDeviceClasses,
    }
}

export type CoverEntity = {
    entity_id: CoverEntityId,
    entity: CoverProperties,
    isClosed: () => boolean,
    open: () => void,
    openTilt: () => void,
    close: () => void,
    closeTilt: () => void,
    stop: () => void,
    stopTilt: () => void,
    toggle: () => void,
    setPosition: (position: number) => void,
    setTiltPosition: (position: number) => void,
}

export type Cover<T extends string = string>  = {
    [entity_id in T]: CoverEntity
}
