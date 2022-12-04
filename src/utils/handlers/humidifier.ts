import { KeyOfAsString } from "../keyOfAsString";
import {
  HumidifierEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const humidifier: Record<string,KeyOfAsString<HumidifierEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Humidifier, HumidifierProperties} from "@herja/core"
export type HumidifierIDs = "${Object.keys(humidifier).join('" | "')}"
export type HumidifierEntities = Record<HumidifierIDs, Humidifier>`

export const humidifierHandler = (entity: {entity_id:string}) =>{
  humidifier[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as HumidifierProperties}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.humidifier}", "turn_on", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.humidifier}", "turn_off", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const humidifier: Humidifier<HumidifierIDs> = {
${Object.entries(humidifier).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeHumidifier = async(path:string) => {
  await outputFile(path, getFile())
}
