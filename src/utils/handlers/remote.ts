import { KeyOfAsString } from "../keyOfAsString";
import {
  RemoteEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const remote: Record<string,KeyOfAsString<RemoteEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Remote, RemoteProperties} from "@herja/core"
export type RemoteIDs = "${Object.keys(remote).join('" | "')}"
export type RemoteEntities = Record<RemoteIDs, Remote>`

export const remoteHandler = (entity: {entity_id:string}) =>{
  remote[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as RemoteProperties}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.remote}", "turn_on", {}, {entity_id: "${entity.entity_id}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.remote}", "turn_off", {}, {entity_id: "${entity.entity_id}"})}`,
    sendCommand: `sendCommand(command: string|string[]) { return callService("${HAEntityTypes.remote}", "send_command", {command}, {entity_id: "${entity.entity_id}"})}`,
    learnCommand: `learnCommand(attributes: {command: string, timeout:number}) { return callService("${HAEntityTypes.remote}", "press", attributes, {entity_id: "${entity.entity_id}"})}`,
    toggle: `toggle() { return callService("${HAEntityTypes.remote}", "toggle", {}, {entity_id: "${entity.entity_id}"})}`,
    deleteCommand: `deleteCommand(command:string) { return callService("${HAEntityTypes.remote}", "delete_command", {command}, {entity_id: "${entity.entity_id}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const remote: Remote<RemoteIDs> = {
${Object.entries(remote).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeRemote = async(path:string) => {
  await outputFile(path, getFile())
}
