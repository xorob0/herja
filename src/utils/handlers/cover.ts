import { KeyOfAsString } from "../keyOfAsString";
import {
  CoverEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const cover: Record<string,KeyOfAsString<CoverEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Cover, CoverProperties} from "@herja/core"
export type CoverIDs = "${Object.keys(cover).join('" | "')}"
export type CoverEntities = Record<CoverIDs, Cover>`

export const coverHandler = (entity: {entity_id:string}) =>{
  cover[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as CoverProperties}`,
    isClosed: `isClosed() { return shadowState["${entity.entity_id}"].state === "closed" }`,
    open: `open() { return callService("${HAEntityTypes.cover}", "open", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    close: `close() { return callService("${HAEntityTypes.cover}", "close", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    openTilt: `openTilt() { return callService("${HAEntityTypes.cover}", "open_tilt", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    closeTilt: `closeTilt() { return callService("${HAEntityTypes.cover}", "close_tilt", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    stop: `stop() { return callService("${HAEntityTypes.cover}", "stop", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    stopTilt: `stopTilt() { return callService("${HAEntityTypes.cover}", "stop_tilt", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    toggle: `toggle() { return callService("${HAEntityTypes.cover}", "toggle", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setPosition: `setPosition(position: number) { return callService("${HAEntityTypes.cover}", "toggle", {position}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setTiltPosition: `setTiltPosition(tilt_position: number) { return callService("${HAEntityTypes.cover}", "toggle", {tilt_position}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const cover: Cover<CoverIDs> = {
${Object.entries(cover).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeCover = async(path:string) => {
  await outputFile(path, getFile())
}
