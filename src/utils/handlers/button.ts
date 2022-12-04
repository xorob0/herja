import { KeyOfAsString } from "../keyOfAsString";
import {
  ButtonEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const button: Record<string,KeyOfAsString<ButtonEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Button, ButtonProperties} from "@herja/core"
export type ButtonIDs = "${Object.keys(button).join('" | "')}"
export type ButtonEntities = Record<ButtonIDs, Button>`

export const buttonHandler = (entity: {entity_id:string}) =>{
  button[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as ButtonProperties}`,
    press: `press() { return callService("${HAEntityTypes.button}", "press", {}, {entity_id: "${entity.entity_id}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const button: Button<ButtonIDs> = {
${Object.entries(button).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeButton = async(path:string) => {
  await outputFile(path, getFile())
}
