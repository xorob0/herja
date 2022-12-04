import { KeyOfAsString } from "../keyOfAsString";
import {
  ClimateEntity, HAEntityTypes
} from "../../ha-types";
import { outputFile } from 'fs-extra';

export const climate: Record<string,KeyOfAsString<ClimateEntity>> = {}

export const getImportString =  () => `import {callService, shadowState, Climate, ClimateProperties, HVAC_MODE, PRESET_MODE, FAN_MODE, SWING_MODE} from "@herja/core"
export type ClimateIDs = "${Object.keys(climate).join('" | "')}"
export type ClimateEntities = Record<ClimateIDs, Climate>`

export const climateHandler = (entity: {entity_id:string}) =>{
  climate[entity.entity_id.split('.')[1]] = {
    entity_id: `entity_id: "${entity.entity_id}"`,
    entity: `get entity() { return {state: shadowState["${entity.entity_id}"].state, attributes: shadowState["${entity.entity_id}"].attributes} as ClimateProperties}`,
    turnOn: `turnOn() { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode: HVAC_MODE.ON}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    turnOff: `turnOff() { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode: HVAC_MODE.OFF}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setHeating: `setHeating() { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode: HVAC_MODE.HEAT}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setCooling: `setCooling() { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode: HVAC_MODE.COOL}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setHeatCool: `setHeatCool() { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode: HVAC_MODE.HEAT_COOL}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setAuto: `setAuto () { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode: HVAC_MODE.AUTO}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setDry: `setDry () { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode:  HVAC_MODE.DRY}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanOnly: `setFanOnly() { return callService("${HAEntityTypes.climate}", "set_hvac_mode", {hvac_mode: HVAC_MODE.FAN_ONLY}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setEco: `setEco () { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode: PRESET_MODE.ECO}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setAway: `setAway () { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode: PRESET_MODE.AWAY}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setBoost: `setBoost () { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode: PRESET_MODE.BOOST}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setComfort: `setComfort() { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode: PRESET_MODE.COMFORT}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setHome: `setHome () { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode: PRESET_MODE.HOME}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSleep: `setSleep () { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode: PRESET_MODE.SLEEP}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setActivity: `setActivity() { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode: PRESET_MODE.ACTIVITY}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanOn: `setFanOn () { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.ON}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanOff: `setFanOff() { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.OFF}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanAuto: `setFanAuto() { return callService("${HAEntityTypes.climate}","set_fan_mode", {fan_mode: FAN_MODE.AUTO}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanLow: `setFanLow() { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.LOW}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanMedium: `setFanMedium() { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.MEDIUM}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanHigh: `setFanHigh() { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.HIGH}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanMiddle: `setFanMiddle() { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.MIDDLE}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanFocus: `setFanFocus() { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.FOCUS}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanDiffuse: `setFanDiffuse() { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode: FAN_MODE.DIFFUSE}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSwingOff: `setSwingOff() { return callService("${HAEntityTypes.climate}", "set_swing_mode", {switch_mode: SWING_MODE.OFF}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSwingOn: `setSwingOn() { return callService("${HAEntityTypes.climate}", "set_swing_mode", {switch_mode: SWING_MODE.ON}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSwingVertical: `setSwingVertical() { return callService("${HAEntityTypes.climate}", "set_swing_mode", {switch_mode: SWING_MODE.VERTICAL}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSwingHorizontal: `setSwingHorizontal() { return callService("${HAEntityTypes.climate}", "set_swing_mode", {switch_mode: SWING_MODE.HORIZONTAL}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSwingBoth: `setSwingBoth() { return callService("${HAEntityTypes.climate}", "set_swing_mode", {switch_mode: SWING_MODE.BOTH}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setTargetTemperature: `setTargetTemperature(temperature: number) { return callService("${HAEntityTypes.climate}", "set_temperature", {temperature}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setTargetTemperatureRange: `setTargetTemperatureRange(min:number, max:number) { return callService("${HAEntityTypes.climate}", "set_temperature", {target_temp_high:max, target_temp_low:min}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setFanMode: `setFanMode(fan_mode: FAN_MODE) { return callService("${HAEntityTypes.climate}", "set_fan_mode", {fan_mode}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setPresetMode: `setPresetMode(preset_mode: PRESET_MODE) { return callService("${HAEntityTypes.climate}", "set_preset_mode", {preset_mode}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setSwingMode: `setSwingMode(swing_mode: SWING_MODE) { return callService("${HAEntityTypes.climate}", "set_swing_mode", {swing_mode}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setAuxHeatOn: `setAuxHeatOn() { return callService("${HAEntityTypes.climate}", "set_aux_heat", {aux_heat:true}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
    setAuxHeatOff: `setAuxHeatOff() { return callService("${HAEntityTypes.climate}", "set_aux_heat", {aux_heat:false}, {entity_id: "${entity.entity_id.split('.')[1]}"})}`,
  }
}

export const getFile = () =>`${getImportString()}

export const climate: Climate<ClimateIDs> = {
${Object.entries(climate).reduce((acc, [key, value]) => `${acc}
['${key}']: {
  ${Object.values(value).join(',\n')}
},
`, '')}
}
`

export const writeClimate = async(path:string) => {
  await outputFile(path, getFile())
}
