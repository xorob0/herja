import { KeyOfAsString } from "../keyOfAsString";
import {
  CalendarEntity,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const calendar: Record<string,KeyOfAsString<CalendarEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Calendar, CalendarProperties} from "@herja/core"
export type CalendarIDs = "${Object.keys(calendar).join('" | "')}"
export type CalendarEntities = Record<CalendarIDs, Calendar>`

export const calendarHandler = (entity: {entity_id:string}) =>{
  calendar[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as CalendarProperties}`,
  }
}

export const getFile = () =>`${getImportString()}

export const calendar: Calendar<CalendarIDs> = {
${Object.entries(calendar).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeCalendar = async(path:string) => {
  if(Object.keys(calendar).length === 0) {
    return
  }
  await outputFile(path, getFile())
}
