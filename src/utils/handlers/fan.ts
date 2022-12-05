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
    setDirection: `setDirection(direction:string) { return callService("${HAEntityTypes.fan}", "set_direction", {direction}, {entity_id: "${entity.entity_id}"})}`,
    setPresetMode: `setPresetMode(preset_mode:string) { return callService("${HAEntityTypes.fan}", "set_preset_mode", {preset_mode}, {entity_id: "${entity.entity_id}"})}`,
    setSpeedPercentage: `setSpeedPercentage(percentage:string) { return callService("${HAEntityTypes.fan}", "set_percentage", {percentage}, {entity_id: "${entity.entity_id}"})}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.fan}", "turn_on", {}, {entity_id: "${entity.entity_id}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.fan}", "turn_off", {}, {entity_id: "${entity.entity_id}"})}`,
    setOscillating: `setOscillating(oscillating:booleant) { return callService("${HAEntityTypes.fan}", "turn_off", {oscillating}, {entity_id: "${entity.entity_id}"})}`,
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
  if(Object.keys(fan).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
