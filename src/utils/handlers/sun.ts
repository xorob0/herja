import { KeyOfAsString } from "../keyOfAsString";
import {
  SunEntity,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const sun: Record<string,KeyOfAsString<SunEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Sun, SunProperties} from "@herja/core"
export type SunIDs = "${Object.keys(sun).join('" | "')}"
export type SunEntities = Record<SunIDs, Sun>`

export const sunHandler = (entity: {entity_id:string}) =>{
  sun[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as SunProperties}`,
    isAboveHorizon: `isAboveHorizon() { return shadowState["${entity.entity_id}"].state === "above_horizon" }`,
    isBelowHorizon: `isBelowHorizon() { return shadowState["${entity.entity_id}"].state === "below_horizon" }`,
  }
}

export const getFile = () =>`${getImportString()}

export const sun: Sun<SunIDs> = {
${Object.entries(sun).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeSun = async(path:string) => {
  await outputFile(path, getFile())
}
