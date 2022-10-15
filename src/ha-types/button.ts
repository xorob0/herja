import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type ButtonEntityId = `${HAEntityTypes.button}.${string}`
export enum ButtonStateDeviceClasses {
    RESTART = "restart",
    UPDATE = "update",
}

//TODO maybe add icon and name for all entities ?
export type ButtonState = HassEntity & {
    entity_id: ButtonEntityId,
    device_class?: ButtonStateDeviceClasses
}

export type Button<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: ButtonEntityId,
        state: ButtonState,
        press: ()=> boolean
    }
}