import { KeyOfAsString } from "../keyOfAsString";
import {
  PersonEntity,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const person: Record<string,KeyOfAsString<PersonEntity>> = {}

export const getImportString =  () => `import {shadowState, Person, PersonProperties} from "@herja/core"
export type PersonIDs = "${Object.keys(person).join('" | "')}"
export type PersonEntities = Record<PersonIDs, Person>`

export const personHandler = (entity: {entity_id:string}) =>{
  person[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as PersonProperties}`,
    isHome: `isHome() { return shadowState["${entity.entity_id}"].state === "home"}`,
  }
}

export const getFile = () =>`${getImportString()}

export const person: Person<PersonIDs> = {
${Object.entries(person).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writePerson = async(path:string) => {
  if(Object.keys(person).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
