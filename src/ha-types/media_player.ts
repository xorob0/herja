import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type MediaPlayerEntityId = `${HAEntityTypes.media_player}.${string}`

export enum MediaPlayerState {
    ON="on",
    OFF="off",
    IDLE="idle",
    PLAYING="playing",
    PAUSED="paused",
    STANDBY="standby",
    UNAVAILABLE="unavailable",
    BUFFERING="buffering",
}

export enum MediaType {
    MUSIC="music",
    TVSHOW="tvshow",
    MOVIE="movie",
    VIDEO="video",
    EPISODE="episode",
    CHANNEL="channel",
    PLAYLIST="playlist",
    IMAGE="image",
    URL="url",
    GAME="game",
    APP="app",
}

export enum MediaPlayerDeviceClass {
    TV="tv",
    SPEAKER="speaker",
    RECEIVER="receiver",
}

export type MediaPlayerProperties = HassEntity & {
    state: MediaPlayerState,
    attributes: {
        supported_features: number,
        sound_mode: string,
        sound_mode_list: string[],
        source: string,
        source_list: string[],
        media_image_url: string,
        media_image_remotely_accessible: boolean,
        device_class: MediaPlayerDeviceClass,
        group_members: string[],
    }
}

export type Media = {
    media_type: MediaType,
    media_id: string,
    enqueue?: "add" | "next" | "replace" | "play",
    announce?: boolean,
}

export type MediaPlayerEntity = {
    entity_id: MediaPlayerEntityId,
    entity: MediaPlayerProperties,
    turnOn: ()=> void,
    turnOff: ()=> void,
    playMedia: (media: Media)=> void,
    selectSoundMode: (soundMode: string)=> void,
    selectSource: (source: string)=> void,
}

export type MediaPlayer<T extends string = string>  = {
    [entity_id in T]: MediaPlayerEntity
}
