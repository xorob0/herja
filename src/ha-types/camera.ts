import {HassEntity} from "home-assistant-js-websocket";
import { HAEntityTypes } from "./entityTypes";

export type CameraEntityId = `${HAEntityTypes.camera}.${string}`

export type CameraProperties = HassEntity & {
    state: string
    attributes: {
        is_recording?: boolean,
        is_streaming?: boolean,
        motion_detection_enabled: boolean,
        is_on?: boolean,
        brand?: string,
        model?: string,
        frame_interval: number,
        frontend_stream_type?: string,
    }
}

export type CameraEntity = {
    entity_id: CameraEntityId,
    entity: CameraProperties,
    turnOn: ()=> void,
    turnOff: ()=> void,
    enableMotionDetection: ()=> void,
    disableMotionDetection: ()=> void
}

export type Camera<T extends string = string>  = {
    [entity_id in T]: CameraEntity
}
