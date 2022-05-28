import {HassEntity} from "home-assistant-js-websocket";

export type CoverEntityId = string//`binary_sensor.${string}`

export type SetPositionOption = {
    position: number
}

//TODO abstract this
export type CoverState = HassEntity & {
    entity_id: CoverEntityId,
    state: "open" | "closed" | "opening" | "closing" | "unavailable" | string,
}

export type Cover<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: CoverEntityId,
        state: CoverState,
        isClosed: () => boolean,
        open: () => void,
        close: () => void,
        stop: () => void,
        toggle: () => void,
        setPosition: (option: SetPositionOption) => void,
    }
}