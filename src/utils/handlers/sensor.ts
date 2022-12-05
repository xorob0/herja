import { KeyOfAsString } from "../keyOfAsString";
import {
  SensorEntity,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const sensor: Record<string,KeyOfAsString<SensorEntity>> = {}

export const getImportString =  () => `import {shadowState, Sensor, SensorProperties} from "@herja/core"
export type SensorIDs = "${Object.keys(sensor).join('" | "')}"
export type SensorEntities = Record<SensorIDs, Sensor>`

export const sensorHandler = (entity: {entity_id:string}) =>{
  sensor[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as SensorProperties}`,
  }
}

export const getFile = () =>`${getImportString()}

export const sensor: Sensor<SensorIDs> = {
${Object.entries(sensor).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeSensor = async(path:string) => {
  if(Object.keys(sensor).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
