import { KeyOfAsString } from "../keyOfAsString";
import {
  AirQuality,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const air_quality: Record<string,KeyOfAsString<AirQuality>> = {}

export const getImportString =  () => `import {callService, shadowState, AirQuality, AirQualityProperties} from "@herja/core"
export type AlarmControlPanelIDs = "${Object.keys(air_quality).join('" | "')}"
export type AlarmControlPanelEntities = Record<AirQualityIDs, AirQuality>`

export const airQualityHandler = (entity: {entity_id:string}) =>{
  air_quality[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as AlarmControlPanelProperties}`,
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
  await outputFile(path, getFile())
}
