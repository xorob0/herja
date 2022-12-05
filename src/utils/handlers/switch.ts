import { KeyOfAsString } from "../keyOfAsString";
import {
  SwitchEntity,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const switches: Record<string,KeyOfAsString<SwitchEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Switch, SwitchProperties, SwitchStateMapper} from "@herja/core"
export type SwitchIDs = "${Object.keys(switches).join('" | "')}"
export type SwitchEntities = Record<SwitchIDs, Switch>`

export const switchesHandler = (entity: {entity_id:string}) =>{
  switches[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: SwitchStateMapper[shadowState["${entity.entity_id}"].state as string], attributes: shadowState["${entity.entity_id}"].attributes} as SwitchProperties}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.switch}", "turn_off", {}, {entity_id: "${entity.entity_id}"})}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.switch}", "turn_on", {}, {entity_id: "${entity.entity_id}"})}`,
    toggle: `toggle() { return callService("${HAEntityTypes.switch}", "toggle", {}, {entity_id: "${entity.entity_id}"})}`,
    isOn: `isOn() { return shadowState["${entity.entity_id}"].state === "on" }`,
  }
}

export const getFile = () =>`${getImportString()}

export const switches: Switch<SwitchIDs> = {
${Object.entries(switches).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeSwitch = async(path:string) => {
  if(Object.keys(switches).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
