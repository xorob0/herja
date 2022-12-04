import { KeyOfAsString } from "../keyOfAsString";
import {
  VacuumEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const vacuum: Record<string,KeyOfAsString<VacuumEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Vacuum, VacuumProperties} from "@herja/core"
export type VacuumIDs = "${Object.keys(vacuum).join('" | "')}"
export type VacuumEntities = Record<VacuumIDs, Vacuum>`

export const vacuumHandler = (entity: {entity_id:string}) =>{
  vacuum[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as VacuumProperties}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.vacuum}", "turn_on", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.vacuum}", "turn_off", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    returnToBase: `returnToBase() { return callService("${HAEntityTypes.vacuum}", "return_to_base", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    locate: `locate() { return callService("${HAEntityTypes.vacuum}", "locate", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    stop: `stop() { return callService("${HAEntityTypes.vacuum}", "stop", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    sendCommand: `sendCommand(command:string) { return callService("${HAEntityTypes.vacuum}", "send_command", {command}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanSpeed: `setFanSpeed(fan_speed: string) { return callService("${HAEntityTypes.vacuum}", "set_fan_speed", {fan_speed}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const vacuum: Vacuum<VacuumIDs> = {
${Object.entries(vacuum).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeVacuum = async(path:string) => {
  await outputFile(path, getFile())
}
