import { KeyOfAsString } from "../keyOfAsString";
import {
  AlarmControlPanelEntity,
  AlarmControlPanelState,
  HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const alarm_control_panel: Record<string,KeyOfAsString<AlarmControlPanelEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, AlarmControlPanel, AlarmControlPanelProperties, ArmingOptions} from "@herja/core"
export type AlarmControlPanelIDs = "${Object.keys(alarm_control_panel).join('" | "')}"
export type AlarmControlPanelEntities = Record<AlarmControlPanelIDs, AlarmControlPanel>`

export const alarmControlPanelHandler = (entity: {entity_id:string}) =>{
  alarm_control_panel[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as AlarmControlPanelProperties}`,
    isArmed: `isArmed() { return !!shadowState["${entity.entity_id}"].state.toString().match(/armed/)}`,
    isDisarmed: `isDisarmed() { return shadowState["${entity.entity_id}"].state.toString() === "${AlarmControlPanelState.DISARMED}"}`,
    armAway: `armAway(options?: ArmingOptions, serviceData?: Record<string, any>) { return callService("${HAEntityTypes.alarm_control_panel}", "alarm_arm_away", {code: process?.env?.ALARM_CODE, ...serviceData}, {entity_id: "${entity.entity_id}"})}`,
    armHome: `armHome(options?: ArmingOptions, serviceData?: Record<string, any>) { return callService("${HAEntityTypes.alarm_control_panel}", "alarm_arm_home", {code: process?.env?.ALARM_CODE, ...serviceData}, {entity_id: "${entity.entity_id}"})}`,
    armNight: `armNight(options?: ArmingOptions, serviceData?: Record<string, any>) { return callService("${HAEntityTypes.alarm_control_panel}", "alarm_arm_night", {code: process?.env?.ALARM_CODE, ...serviceData}, {entity_id: "${entity.entity_id}"})}`,
    armVacation: `armVacation(options?: ArmingOptions, serviceData?: Record<string, any>) { return callService("${HAEntityTypes.alarm_control_panel}", "alarm_arm_vacation", {code: process?.env?.ALARM_CODE, ...serviceData}, {entity_id: "${entity.entity_id}"})}`,
    armCustomBypass: `armCustomBypass(options?: ArmingOptions, serviceData?: Record<string, any>) { return callService("${HAEntityTypes.alarm_control_panel}", "alarm_arm_vacation", {code: process?.env?.ALARM_CODE, ...serviceData}, {entity_id: "${entity.entity_id}"})}`,
    trigger: `trigger(serviceData?: Record<string, any>) { return callService("${HAEntityTypes.alarm_control_panel}", "trigger", {code: process?.env?.ALARM_CODE, ...serviceData}, {entity_id: "${entity.entity_id}"})}`,
    disarm: `disarm(serviceData?: Record<string, any>) { return callService("${HAEntityTypes.alarm_control_panel}", "disarm", {code: process?.env?.ALARM_CODE, ...serviceData}, {entity_id: "${entity.entity_id}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const alarm_control_panel: AlarmControlPanel<AlarmControlPanelIDs> = {
${Object.entries(alarm_control_panel).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeAlarmControlPanel = async(path:string) => {
  await outputFile(path, getFile())
}
