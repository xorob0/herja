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
    open: `open() { return callService("${HAEntityTypes.cover}", "open", {}, {entity_id: "${entity.entity_id}"})}`,
    close: `close() { return callService("${HAEntityTypes.cover}", "close", {}, {entity_id: "${entity.entity_id}"})}`,
    openTilt: `openTilt() { return callService("${HAEntityTypes.cover}", "open_tilt", {}, {entity_id: "${entity.entity_id}"})}`,
    closeTilt: `closeTilt() { return callService("${HAEntityTypes.cover}", "close_tilt", {}, {entity_id: "${entity.entity_id}"})}`,
    stop: `stop() { return callService("${HAEntityTypes.cover}", "stop", {}, {entity_id: "${entity.entity_id}"})}`,
    stopTilt: `stopTilt() { return callService("${HAEntityTypes.cover}", "stop_tilt", {}, {entity_id: "${entity.entity_id}"})}`,
    toggle: `toggle() { return callService("${HAEntityTypes.cover}", "toggle", {}, {entity_id: "${entity.entity_id}"})}`,
    setPosition: `setPosition(position: number) { return callService("${HAEntityTypes.cover}", "toggle", {position}, {entity_id: "${entity.entity_id}"})}`,
    setTiltPosition: `setTiltPosition(tilt_position: number) { return callService("${HAEntityTypes.cover}", "toggle", {tilt_position}, {entity_id: "${entity.entity_id}"})}`,
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
  if(Object.keys(cover).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
