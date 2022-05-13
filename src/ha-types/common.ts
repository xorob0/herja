import {LightState} from "./light";
import {BinarySensorState} from "./binary_sensor";
import {SwitchState} from "./switch";

export type EntityId = `${string}.${string}`

export type HAState = LightState|BinarySensorState|SwitchState