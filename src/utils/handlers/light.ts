import { KeyOfAsString } from "../keyOfAsString";
import {
  LightEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const light: Record<string,KeyOfAsString<LightEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Light, LightProperties, LightTurnOnAttributes} from "@herja/core"
export type LightIDs = "${Object.keys(light).join('" | "')}"
export type LightEntities = Record<LightIDs, Light>`

export const lightHandler = (entity: {entity_id:string}) =>{
  light[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as LightProperties}`,
    turnOn: `turnOn(attributes?: LightTurnOnAttributes) { return callService("${HAEntityTypes.light}", "turn_on", attributes || {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.light}", "turn_off", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    toggle: `toggle(attributes?: LightTurnOnAttributes) { return callService("${HAEntityTypes.light}", "toggle", attributes || {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const light: Light<LightIDs> = {
${Object.entries(light).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeLight = async(path:string) => {
  await outputFile(path, getFile())
}
