import { KeyOfAsString } from "../keyOfAsString";
import {
  AirQuality,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const air_quality: Record<string,KeyOfAsString<AirQuality>> = {}

export const getImportString =  () => `import {callService, shadowState, AirQuality, AirQualityProperties} from "@herja/core"
export type AirQualityIDs = "${Object.keys(air_quality).join('" | "')}"
export type AirQualityEntities = Record<AirQualityIDs, AirQuality>`

export const airQualityHandler = (entity: {entity_id:string}) =>{
  air_quality[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as AirQualityProperties}`,
  }
}

export const getFile = () =>`${getImportString()}

export const air_quality: AirQuality = {
${Object.entries(air_quality).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeAirQuality = async(path:string) => {
  if(Object.keys(air_quality).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
