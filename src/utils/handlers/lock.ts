import { KeyOfAsString } from "../keyOfAsString";
import {
  LockEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const lock: Record<string,KeyOfAsString<LockEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Lock, LockProperties} from "@herja/core"
export type LockIDs = "${Object.keys(lock).join('" | "')}"
export type LockEntities = Record<LockIDs, Lock>`

export const lockHandler = (entity: {entity_id:string}) =>{
  lock[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as LockProperties}`,
    lock: `lock() { return callService("${HAEntityTypes.lock}", "lock", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    unlock: `unlock() { return callService("${HAEntityTypes.lock}", "unlock", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    open: `open() { return callService("${HAEntityTypes.lock}", "open", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const lock: Lock<LockIDs> = {
${Object.entries(lock).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeLock = async(path:string) => {
  await outputFile(path, getFile())
}
