import { KeyOfAsString } from "../keyOfAsString";
import {
  BinarySensorEntity,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const binary_sensor: Record<string,KeyOfAsString<BinarySensorEntity>> = {}

export const getImportString =  () => `import {shadowState, BinarySensor, BinarySensorProperties, BinarySensorStateMapper} from "@herja/core"
export type BinarySensorIDs = "${Object.keys(binary_sensor).join('" | "')}"
export type BinarySensorEntities = Record<BinarySensorIDs, BinarySensor>`

export const binarySensorHandler = (entity: {entity_id:string}) =>{
  binary_sensor[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: BinarySensorStateMapper[shadowState["${entity.entity_id}"].state as string], attributes: shadowState["${entity.entity_id}"].attributes} as BinarySensorProperties}`,
    isOn: `isOn() { return shadowState["${entity.entity_id}"].state.toString() === "on"}`,
    isOff: `isOff() { return shadowState["${entity.entity_id}"].state.toString() === "off"}`,
  }
}

export const getFile = () =>`${getImportString()}

export const binary_sensor: BinarySensor<BinarySensorIDs> = {
${Object.entries(binary_sensor).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeBinarySensors = async(path:string) => {
  if(Object.keys(binary_sensor).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
