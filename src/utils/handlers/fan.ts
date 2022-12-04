import { KeyOfAsString } from "../keyOfAsString";
import {
  FanEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const fan: Record<string,KeyOfAsString<FanEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Fan, FanProperties} from "@herja/core"
export type FanIDs = "${Object.keys(fan).join('" | "')}"
export type FanEntities = Record<FanIDs, Fan>`

export const fanHandler = (entity: {entity_id:string}) =>{
  fan[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as FanProperties}`,
    setDirection: `setDirection(direction:string) { return callService("${HAEntityTypes.fan}", "set_direction", {direction}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setPresetMode: `setPresetMode(preset_mode:string) { return callService("${HAEntityTypes.fan}", "set_preset_mode", {preset_mode}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSpeedPercentage: `setSpeedPercentage(percentage:string) { return callService("${HAEntityTypes.fan}", "set_percentage", {percentage}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.fan}", "turn_on", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.fan}", "turn_off", {}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setOscillating: `setOscillating(oscillating:booleant) { return callService("${HAEntityTypes.fan}", "turn_off", {oscillating}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const fan: Fan<FanIDs> = {
${Object.entries(fan).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeFan = async(path:string) => {
  await outputFile(path, getFile())
}
