import { KeyOfAsString } from "../keyOfAsString";
import {
  DeviceTrackerEntity,
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const device_tracker: Record<string,KeyOfAsString<DeviceTrackerEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, DeviceTracker, DeviceTrackerProperties} from "@herja/core"
export type DeviceTrackerIDs = "${Object.keys(device_tracker).join('" | "')}"
export type DeviceTrackerEntities = Record<DeviceTrackerIDs, DeviceTracker>`

export const device_trackerHandler = (entity: {entity_id:string}) =>{
  device_tracker[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as DeviceTrackerProperties}`,
    isHome: `isHome() { return shadowState["${entity.entity_id}"].state === "home"}`,
  }
}

export const getFile = () =>`${getImportString()}

export const device_tracker: DeviceTracker<DeviceTrackerIDs> = {
${Object.entries(device_tracker).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeDeviceTracker = async(path:string) => {
  await outputFile(path, getFile())
}
