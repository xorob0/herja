import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type ButtonEntityId = `${HAEntityTypes.button}.${string}`
export enum ButtonStateDeviceClasses {
    RESTART = "restart",
    UPDATE = "update",
}

//TODO maybe add icon and name for all entities ?
export type ButtonProperties = HassEntity & {
    state: unknown,
    attributes: {
        device_class?: ButtonStateDeviceClasses,
    }
}

export type ButtonEntity = {
    entity_id: ButtonEntityId,
    entity: ButtonProperties,
    press: ()=> Promise<unknown>
}

export type Button<T extends string = string>  = {
    [entity_id in T]: ButtonEntity
}
