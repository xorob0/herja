import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type UpdateEntityId = `${HAEntityTypes.update}.${string}`

export type UpdateProperties = HassEntity & {
    state: boolean,
    attributes: {
        auto_update?: boolean,
        in_progress?: boolean | number,
        installed_version?: string,
        latest_version?: string,
        release_summary?: string,
        release_url?: string,
        title?: string
    }
}

export type UpdateInstallAttributes = {
    version?: string,
    backup?: boolean,
}

export type UpdateEntity = {
    entity_id: UpdateEntityId,
    entity: UpdateProperties,
    install: (attributes: UpdateInstallAttributes)=> void,
}

export type Update<T extends string = string>  = {
    [entity_id in T]: UpdateEntity
}
