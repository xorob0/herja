import { KeyOfAsString } from "../keyOfAsString";
import {
  SelectEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const select: Record<string,KeyOfAsString<SelectEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Select, SelectProperties} from "@herja/core"
export type SelectIDs = "${Object.keys(select).join('" | "')}"
export type SelectEntities = Record<SelectIDs, Select>`

export const selectHandler = (entity: {entity_id:string}) =>{
  select[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as SelectProperties}`,
    selectOption: `selectOption(option:string) { return callService("${HAEntityTypes.select}", "select_option", {option}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const select: Select<SelectIDs> = {
${Object.entries(select).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeSelect = async(path:string) => {
  await outputFile(path, getFile())
}
