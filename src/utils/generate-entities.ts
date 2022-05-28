import { outputFile } from 'fs-extra';
import { shadowState } from '../index';

type Props = {
  config: {
    path: string;
  };
};

type GenerateEntities = (props: Props) => Promise<void>;

const generateEntities: GenerateEntities = async ({ config: { path } }) => {
  // TODO add type for domains later
  let light: Record<string, any> = {};
  let sun: Record<string, any> = {};
  let person: Record<string, any> = {};
  let binary_sensor: Record<string, any> = {};
  let switches: Record<string, any> = {};
  let sensor: Record<string, any> = {};

  Object.keys(shadowState).forEach((entity_id) => {
    const domain = entity_id.split('.')[0];
    const name = entity_id.split('.')[1];
    if (domain === 'sun')
      sun[name] = {
        getState: `get state() { return shadowState["${entity_id}"]}`,
        isBelowHorizon: `() => shadowState["${entity_id}"].state === "below_horizon"`,
        isAboveHorizon: `() => shadowState["${entity_id}"].state === "above_horizon"`,
      }
    if (domain === 'sensor')
      sensor[name] = {
        getState: `get state() { return shadowState["${entity_id}"]}`,
      }
    if (domain === 'person')
      person[name] = {
        getState: `get state() { return shadowState["${entity_id}"]}`,
        isHome: `() => shadowState["${entity_id}"].state === "home"`,
      }
    if (domain === 'light')
      light[name] = {
        getState: `get state() { return shadowState["${entity_id}"]}`,
        turn_on: `(serviceData = {}) => callService("${domain}", 'turn_on', serviceData, {entity_id: "${entity_id}"})`,
        turn_off: `(serviceData = {}) => callService("${domain}", 'turn_off', serviceData, {entity_id: "${entity_id}"})`,
        toggle: `(serviceData = {}) => callService("${domain}", 'toggle', serviceData, {entity_id: "${entity_id}"})`,
        isOn: `() => shadowState["${entity_id}"].state === "on"`,
      };
    if (domain === 'switch')
      switches[name] = {
        getState: `get state() { return shadowState["${entity_id}"]}`,
        turn_on: `(serviceData = {}) => callService("${domain}", 'turn_on', serviceData, {entity_id: "${entity_id}"})`,
        turn_off: `(serviceData = {}) => callService("${domain}", 'turn_off', serviceData, {entity_id: "${entity_id}"})`,
        toggle: `(serviceData = {}) => callService("${domain}", 'toggle', serviceData, {entity_id: "${entity_id}"})`,
        isOn: `() => shadowState["${entity_id}"].state === "on"`,
      };
    if (domain === 'binary_sensor')
      binary_sensor[name] = {
        getState: `get state() { return shadowState["${entity_id}"]}`,
        isOn: `() => shadowState["${entity_id}"].state === "on"`,
      };
  });

  const lightFile = {
    path: `${path}/light.ts`,
    data: `import {callService, shadowState, Light} from "@herja/core"
    export type LightIDs = "${Object.keys(light).join('" | "')}"
export const light: Light<LightIDs> = {
${Object.keys(light).reduce(
  (acc, entity_id) => `${acc}
["${entity_id}"]: {
entity_id: "light.${entity_id}",
turn_on: ${light[entity_id].turn_on},
turn_off: ${light[entity_id].turn_off},
isOn: ${light[entity_id].isOn},
toggle: ${light[entity_id].toggle},
${light[entity_id].getState},
},\n`,
  '',
)}}
`,
  };

  const switchFile = {
    path: `${path}/switch.ts`,
    data: `import {callService, shadowState, Switch} from "@herja/core"
        export type SwitchIDs = "${Object.keys(switches).join('" | "')}"
export const switches: Switch<SwitchIDs> = {
  ${Object.keys(switches).reduce(
    (acc, entity_id) => `${acc}
  ["${entity_id}"]: {
    entity_id: "switch.${entity_id}",
    turn_on: ${switches[entity_id].turn_on},
    turn_off: ${switches[entity_id].turn_off},
    isOn: ${switches[entity_id].isOn},
    toggle: ${switches[entity_id].toggle},
    ${switches[entity_id].getState},
  },\n`,
    '',
  )}}
  `,
  };

  const binarySensorFile = {
    path: `${path}/binary_sensor.ts`,
    data: `import {shadowState, BinarySensor} from "@herja/core"
        export type BinarySensorIDs = "${Object.keys(binary_sensor).join(
          '" | "',
        )}"
export const binary_sensor: BinarySensor<BinarySensorIDs> = {
  ${Object.keys(binary_sensor).reduce(
    (acc, entity_id) => `${acc}
  ["${entity_id}"]: {
    entity_id: "binary_sensor.${entity_id}",
    isOn: ${binary_sensor[entity_id].isOn},
    ${binary_sensor[entity_id].getState},
  },\n`,
    '',
  )}}
  `,
  };

  const sunFile = {
    path: `${path}/sun.ts`,
    data: `import { shadowState, Sun} from "@herja/core"
        export type SunIDs = "${Object.keys(sun).join(
      '" | "',
    )}"
export const sun: Sun<SunIDs> = {
  ${Object.keys(sun).reduce(
      (acc, entity_id) => `${acc}
  ["${entity_id}"]: {
    entity_id: "sun.${entity_id}",
    isBelowHorizon: ${sun[entity_id].isBelowHorizon},
    isAboveHorizon: ${sun[entity_id].isAboveHorizon},
    ${sun[entity_id].getState},
  },\n`,
      '',
    )}}
  `,
  };

  const personFile = {
    path: `${path}/person.ts`,
    data: `import { shadowState, Person} from "@herja/core"
        export type PersonIDs = "${Object.keys(person).join(
      '" | "',
    )}"
export const person: Person<PersonIDs> = {
  ${Object.keys(person).reduce(
      (acc, entity_id) => `${acc}
  ["${entity_id}"]: {
    entity_id: "person.${entity_id}",
    isHome: ${person[entity_id].isHome},
    ${person[entity_id].getState},
  },\n`,
      '',
    )}}
  `,
  };

  const sensorFile = {
    path: `${path}/sensor.ts`,
    data: `import { shadowState, Sensor} from "@herja/core"
        export type SensorIDs = "${Object.keys(sensor).join(
      '" | "',
    )}"
export const sensor: Sensor<SensorIDs> = {
  ${Object.keys(sensor).reduce(
      (acc, entity_id) => `${acc}
  ["${entity_id}"]: {
    entity_id: "sensor.${entity_id}",
    ${sensor[entity_id].getState},
  },\n`,
      '',
    )}}
  `,
  };

  return outputFiles([lightFile, switchFile, binarySensorFile, sunFile, personFile, sensorFile]);
};

export default generateEntities;

const outputFiles = async (props: { path: string; data: string }[]) => {
  await Promise.all(
    props.map(({ path, data }) =>
      outputFile(path, data, (e) => {
        if (e) console.warn(e);
      }),
    ),
  );
};
