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

    Object.keys(shadowState).forEach(entity_id => {
        const domain = entity_id.split('.')[0]
        const name = entity_id.split('.')[1]
        if(domain === 'light')
        light[name] = {
            getState: `get state() { return shadowState["${entity_id}"]}`,
            //TODO manage options
            //TODO enum for actions
            turn_on: `(serviceData = {}) => callService("${domain}", 'turn_on', serviceData, {entity_id: "${entity_id}"})`,
            turn_off: `(serviceData = {}) => callService("${domain}", 'turn_off', serviceData, {entity_id: "${entity_id}"})`
            }
    })

    console.log(light)
    fs.writeFile(`${path}/light.ts`,
        `import {callService, shadowState} from "@homeassistant-node/main"
const light = {
  ${Object.keys(light).reduce((acc, entity_id)=>`${acc}
  ["${entity_id}"]: {
    turn_on: ${light[entity_id].turn_on},  
    turn_off: ${light[entity_id].turn_off},  
    ${light[entity_id].getState},  
  },\n`, '')}}`, console.log)
}
generateEntities({auth:{
        url: "ws://10.200.0.5:8123/api/websocket",
        access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjMWIyNDM4OTMzYjM0ZGRkYTM2OWVjMDQ0NGQ2NGQwMiIsImlhdCI6MTY1MjA5ODM0OCwiZXhwIjoxOTY3NDU4MzQ4fQ.OdqlEOZo-uwo4qZPaxkmmwwlf6OwhmySIutzitDbm3g",
    }, config: {path: "/tmp"}})
export default generateEntities