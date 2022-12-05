import { KeyOfAsString } from "../keyOfAsString";
import {
  CameraEntity, HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const camera: Record<string,KeyOfAsString<CameraEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Camera, CameraProperties} from "@herja/core"
export type CameraIDs = "${Object.keys(camera).join('" | "')}"
export type CameraEntities = Record<CameraIDs, Camera>`

export const cameraHandler = (entity: {entity_id:string}) =>{
  camera[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as CameraProperties}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.camera}", "turn_on", {}, {entity_id: "${entity.entity_id}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.camera}", "turn_off", {}, {entity_id: "${entity.entity_id}"})}`,
    enableMotionDetection: `enableMotionDetection() { return callService("${HAEntityTypes.camera}", "enable_motion_detection", {}, {entity_id: "${entity.entity_id}"})}`,
    disableMotionDetection: `disableMotionDetection() { return callService("${HAEntityTypes.camera}", "enable_motion_detection", {}, {entity_id: "${entity.entity_id}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const camera: Camera<CameraIDs> = {
${Object.entries(camera).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeCamera = async(path:string) => {
  if(Object.keys(camera).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
