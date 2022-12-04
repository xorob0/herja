import { KeyOfAsString } from "../keyOfAsString";
import {
  WaterHeaterEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const water_heater: Record<string,KeyOfAsString<WaterHeaterEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, WaterHeater, WaterHeaterProperties} from "@herja/core"
export type WaterHeaterIDs = "${Object.keys(water_heater).join('" | "')}"
export type WaterHeaterEntities = Record<WaterHeaterIDs, WaterHeater>`

export const water_heaterHandler = (entity: {entity_id:string}) =>{
  water_heater[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as WaterHeaterProperties}`,
    setOperationMode: `setOperationMode(operation_mode:string) { return callService("${HAEntityTypes.water_heater}", "set_operation_mode", {operation_mode}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setTemperature: `setTemperature(temperature: number) { return callService("${HAEntityTypes.water_heater}", "set_temperature", {temperature}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOffAwayMode: `turnOffAwayMode() { return callService("${HAEntityTypes.water_heater}", "turn_off_away_mode", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOnAwayMode: `turnOnAwayMode() { return callService("${HAEntityTypes.water_heater}", "turn_on_away_mode", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const water_heater: WaterHeater<WaterHeaterIDs> = {
${Object.entries(water_heater).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeWaterHeater = async(path:string) => {
  await outputFile(path, getFile())
}
