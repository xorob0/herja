import {configure, shadowState} from "../src";
import * as fs from "fs";

type Props= {
    auth:{
        url: string,
        access_token: string
    }
    config:{
        path: string
    }
}

const generateEntities: (props: Props) => Promise<void> = async ({auth: {url, access_token}, config:{path}}) => {
    await configure({
        url,
        access_token,
    });
    console.log("finished configuring")
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
    toggle: ${light[entity_id].toggle}
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
    toggle: ${switches[entity_id].toggle}
    ${switches[entity_id].getState},  
  },\n`, '')}}`, console.log)

    fs.writeFile(`${path}/binary_sensor.ts`,
        `import {callService, shadowState, BinarySensor} from "@homeassistant-node/main"
const binary_sensor: BinarySensor = {
  ${Object.keys(binary_sensor).reduce((acc, entity_id)=>`${acc}
  ["${entity_id}"]: {
    entity_id: "${entity_id}",
    ${binary_sensor[entity_id].getState},  
  },\n`, '')}}`, console.log)
}

generateEntities({auth:{
        url: "ws://10.200.0.5:8123/api/websocket",
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjMWIyNDM4OTMzYjM0ZGRkYTM2OWVjMDQ0NGQ2NGQwMiIsImlhdCI6MTY1MjA5ODM0OCwiZXhwIjoxOTY3NDU4MzQ4fQ.OdqlEOZo-uwo4qZPaxkmmwwlf6OwhmySIutzitDbm3g",
    }, config: {path: "/tmp"}})
export default generateEntities