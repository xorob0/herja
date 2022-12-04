import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type SelectEntityId = `${HAEntityTypes.select}.${string}`

export type SelectProperties = HassEntity & {
    state: string,
    attributes: {
        options: string[],
        current_option?: string,
    }
}

export type SelectEntity = {
    entity_id: SelectEntityId,
    entity: SelectProperties,
    selectOption: (option:string)=> void,
}

export type Select<T extends string = string>  = {
    [entity_id in T]: SelectEntity
}
