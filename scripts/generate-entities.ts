import {configure, shadowState} from "../src";
import * as fs from "fs";

type Props= {
    config:{
        path: string
    }
}

const generateEntities: (props: Props) => void = ({config:{path}}) => {
    // TODO add type for domains later
    let light:Record<string, any> = {}
    let binary_sensor:Record<string, any> = {}
    let switches:Record<string, any> = {}

    Object.keys(shadowState).forEach(entity_id => {
        const domain = entity_id.split('.')[0]
        const name = entity_id.split('.')[1]
        if(domain === 'light')
        light[name] = {
            getState: `get state() { return shadowState["${entity_id}"]}`,
            turn_on: `(serviceData = {}) => callService("${domain}", 'turn_on', serviceData, {entity_id: "${entity_id}"})`,
            turn_off: `(serviceData = {}) => callService("${domain}", 'turn_off', serviceData, {entity_id: "${entity_id}"})`,
            toggle: `(serviceData = {}) => callService("${domain}", 'toggle', serviceData, {entity_id: "${entity_id}"})`,
            }
        if(domain === 'switch')
            switches[name] = {
                getState: `get state() { return shadowState["${entity_id}"]}`,
                turn_on: `(serviceData = {}) => callService("${domain}", 'turn_on', serviceData, {entity_id: "${entity_id}"})`,
                turn_off: `(serviceData = {}) => callService("${domain}", 'turn_off', serviceData, {entity_id: "${entity_id}"})`,
                toggle: `(serviceData = {}) => callService("${domain}", 'toggle', serviceData, {entity_id: "${entity_id}"})`,
            }
        if(domain === 'binary_sensor')
            binary_sensor[name] = {
                getState: `get state() { return shadowState["${entity_id}"]}`,
            }
    })

    console.log(light)
    fs.writeFile(`${path}/light.ts`,
        `import {callService, shadowState, Light} from "@homeassistant-node/main"
const light: Light = {
  ${Object.keys(light).reduce((acc, entity_id)=>`${acc}
  ["${entity_id}"]: {
    entity_id: "${entity_id}",
    turn_on: ${light[entity_id].turn_on},  
    turn_off: ${light[entity_id].turn_off},  
    toggle: ${light[entity_id].toggle},
    ${light[entity_id].getState},  
  },\n`, '')}}`, console.log)

    fs.writeFile(`${path}/switch.ts`,
        `import {callService, shadowState, Switch} from "@homeassistant-node/main"
const switch: Switch = {
  ${Object.keys(switches).reduce((acc, entity_id)=>`${acc}
  ["${entity_id}"]: {
    entity_id: "${entity_id}",
    turn_on: ${switches[entity_id].turn_on},  
    turn_off: ${switches[entity_id].turn_off},  
    toggle: ${switches[entity_id].toggle},
    ${switches[entity_id].getState},  
  },\n`, '')}}
  export default switch
  `, console.log)

    fs.writeFile(`${path}/binary_sensor.ts`,
        `import {callService, shadowState, BinarySensor} from "@homeassistant-node/main"
const binary_sensor: BinarySensor = {
  ${Object.keys(binary_sensor).reduce((acc, entity_id)=>`${acc}
  ["${entity_id}"]: {
    entity_id: "${entity_id}",
    ${binary_sensor[entity_id].getState},  
  },\n`, '')}}
  export default binary_sensor
  `, console.log)
}

export default generateEntities