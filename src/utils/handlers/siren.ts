import { KeyOfAsString } from "../keyOfAsString";
import {
  SirenEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const siren: Record<string,KeyOfAsString<SirenEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Siren, SirenProperties, SirenTurnOnAttributes} from "@herja/core"
export type SirenIDs = "${Object.keys(siren).join('" | "')}"
export type SirenEntities = Record<SirenIDs, Siren>`

export const sirenHandler = (entity: {entity_id:string}) =>{
  siren[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as SirenProperties}`,
    turnOn: `turnOn(attributes: SirenTurnOnAttributes) { return callService("${HAEntityTypes.siren}", "turn_on", attributes, {entity_id: "${entity.entity_id}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.siren}", "turn_off", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const siren: Siren<SirenIDs> = {
${Object.entries(siren).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeSiren = async(path:string) => {
  await outputFile(path, getFile())
}
