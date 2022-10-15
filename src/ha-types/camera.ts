import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type CameraEntityId = `${HAEntityTypes.camera}.${string}`

export type CameraState = HassEntity & {
    entity_id: CameraEntityId,
    is_recording?: boolean,
    is_streaming?: boolean,
    motion_detection_enabled: boolean,
    is_on?: boolean,
    brand?: string,
    model?: string,
    frame_interval: number,
    frontend_stream_type?: string,
}

export type Camera<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: CameraEntityId,
        state: CameraState,
        turnOn: ()=> boolean,
        turnOff: ()=> boolean,
        enableMotionDetection: ()=> boolean,
        disableMotionDetection: ()=> boolean
    }
}