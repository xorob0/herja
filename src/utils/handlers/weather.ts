import { KeyOfAsString } from "../keyOfAsString";
import {
  WeatherEntity,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const weather: Record<string,KeyOfAsString<WeatherEntity>> = {}

export const getImportString =  () => `import {shadowState, Weather, WeatherProperties} from "@herja/core"
export type WeatherIDs = "${Object.keys(weather).join('" | "')}"
export type WeatherEntities = Record<WeatherIDs, Weather>`

export const weatherHandler = (entity: {entity_id:string}) =>{
  weather[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as WeatherProperties}`,
  }
}

export const getFile = () =>`${getImportString()}

export const weather: Weather<WeatherIDs> = {
${Object.entries(weather).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeWeather = async(path:string) => {
  await outputFile(path, getFile())
}
