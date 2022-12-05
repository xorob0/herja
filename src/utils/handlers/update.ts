import { KeyOfAsString } from "../keyOfAsString";
import {
  UpdateEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const update: Record<string,KeyOfAsString<UpdateEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Update, UpdateProperties, UpdateInstallAttributes} from "@herja/core"
export type UpdateIDs = "${Object.keys(update).join('" | "')}"
export type UpdateEntities = Record<UpdateIDs, Update>`

export const updateHandler = (entity: {entity_id:string}) =>{
  update[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as UpdateProperties}`,
    install: `install(attributes: UpdateInstallAttributes) { return callService("${HAEntityTypes.update}", "install", attributes, {entity_id: "${entity.entity_id}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const update: Update<UpdateIDs> = {
${Object.entries(update).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeUpdate = async(path:string) => {
  if(Object.keys(update).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
