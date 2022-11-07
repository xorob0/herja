import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";
import { CalendarEntityId } from "./calendar";

export type MediaPlayerEntityId = `${HAEntityTypes.calendar}.${string}`

export enum CalendarStateState {
    ON="on",
    OFF="off",
    IDLE="idle",
    PLAYING="playing",
    PAUSED="paused",
    STANDBY="standby",
    UNAVAILABLE="unavailable",
    BUFFERING="buffering",
}

export type MediaPlayerState = HassEntity & {
    entity_id: CalendarEntityId,
    supported_features: number,
    sound_mode: string,
    sound_mode_list: string[],
    source: string,
    source_list: string[],
    media_image_url: string,
    media_image_remotely_accessible: boolean,
    device_class: string,
    group_members: string[],
    state: CalendarStateState,
}

export type MediaPlayer<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: MediaPlayerEntityId,
        state: MediaPlayerState,
        turn_on: ()=> boolean,
        turn_off: ()=> boolean,
    }
}
