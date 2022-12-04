import { HAEntityTypes } from "../ha-types";
import { alarmControlPanelHandler, writeAlarmControlPanel } from "./handlers/alarm_control_panel";
import { airQualityHandler } from "./handlers/air_quality";
import { binarySensorHandler, writeBinarySensors } from "./handlers/binary_sensor";
import { buttonHandler, writeButton } from "./handlers/button";
import { HassEntity } from "home-assistant-js-websocket";
import { calendarHandler, writeCalendar } from "./handlers/calendar";
import { cameraHandler, writeCamera } from "./handlers/camera";
import { climateHandler, writeClimate } from "./handlers/climate";
import { coverHandler, writeCover } from "./handlers/cover";
import { device_trackerHandler, writeDeviceTracker } from "./handlers/device_tracker";
import { fanHandler, writeFan } from "./handlers/fan";
import { humidifierHandler, writeHumidifier } from "./handlers/humidifier";
import { lightHandler, writeLight } from "./handlers/light";
import { lockHandler, writeLock } from "./handlers/lock";
import { media_playerHandler, writeMediaPlayer } from "./handlers/media_player";
import { personHandler, writePerson } from "./handlers/person";
import { remoteHandler, writeRemote } from "./handlers/remote";
import { selectHandler, writeSelect } from "./handlers/select";
import { sensorHandler, writeSensor } from "./handlers/sensor";
import { sirenHandler, writeSiren } from "./handlers/siren";
import { sunHandler, writeSun } from "./handlers/sun";
import { switchesHandler, writeSwitch } from "./handlers/switch";
import { updateHandler, writeUpdate } from "./handlers/update";
import { vacuumHandler, writeVacuum } from "./handlers/vacuum";
import { water_heaterHandler, writeWaterHeater } from "./handlers/water_heater";
import { weatherHandler, writeWeather } from "./handlers/weather";

type Props = {
  config: {
    path: string;
    states: HassEntity[]
  };
};

const handlerMapper:Record<HAEntityTypes, (entity:{entity_id:string})=> void>  = {
  [HAEntityTypes.alarm_control_panel]: alarmControlPanelHandler,
  [HAEntityTypes.air_quality]: airQualityHandler,
  [HAEntityTypes.binary_sensor]: binarySensorHandler,
  [HAEntityTypes.button]: buttonHandler,
  [HAEntityTypes.calendar]: calendarHandler,
  [HAEntityTypes.camera]: cameraHandler,
  [HAEntityTypes.climate]: climateHandler,
  [HAEntityTypes.cover]: coverHandler,
  [HAEntityTypes.device_tracker]: device_trackerHandler,
  [HAEntityTypes.fan]: fanHandler,
  [HAEntityTypes.humidifier]: humidifierHandler,
  [HAEntityTypes.light]: lightHandler,
  [HAEntityTypes.lock]: lockHandler,
  [HAEntityTypes.media_player]: media_playerHandler,
  [HAEntityTypes.person]: personHandler,
  [HAEntityTypes.remote]: remoteHandler,
  [HAEntityTypes.select]: selectHandler,
  [HAEntityTypes.sensor]: sensorHandler,
  [HAEntityTypes.siren]: sirenHandler,
  [HAEntityTypes.sun]: sunHandler,
  [HAEntityTypes.switch]: switchesHandler,
  [HAEntityTypes.update]: updateHandler,
  [HAEntityTypes.vacuum]: vacuumHandler,
  [HAEntityTypes.water_heater]: water_heaterHandler,
  [HAEntityTypes.weather]: weatherHandler,
}

type GenerateEntities = (props: Props) => Promise<void>;

const generateEntities: GenerateEntities = async ({ config: { path, states } }) => {

  states.forEach(({entity_id}) => {
    const domain = entity_id.split('.')[0] as HAEntityTypes
      if(!handlerMapper[domain]){
        return
      }
      const handler = handlerMapper[domain];
      handler({entity_id})
  })

  await writeAlarmControlPanel(`${path}/${HAEntityTypes.alarm_control_panel}.ts`)
  await writeBinarySensors(`${path}/${HAEntityTypes.binary_sensor}.ts`)
  await writeButton(`${path}/${HAEntityTypes.button}.ts`)
  await writeCalendar(`${path}/${HAEntityTypes.calendar}.ts`)
  await writeCamera(`${path}/${HAEntityTypes.camera}.ts`)
  await writeClimate(`${path}/${HAEntityTypes.climate}.ts`)
  await writeCover(`${path}/${HAEntityTypes.cover}.ts`)
  await writeDeviceTracker(`${path}/${HAEntityTypes.device_tracker}.ts`)
  await writeFan(`${path}/${HAEntityTypes.fan}.ts`)
  await writeHumidifier(`${path}/${HAEntityTypes.humidifier}.ts`)
  await writeLight(`${path}/${HAEntityTypes.light}.ts`)
  await writeLock(`${path}/${HAEntityTypes.lock}.ts`)
  await writeMediaPlayer(`${path}/${HAEntityTypes.media_player}.ts`)
  await writePerson(`${path}/${HAEntityTypes.person}.ts`)
  await writeRemote(`${path}/${HAEntityTypes.remote}.ts`)
  await writeSelect(`${path}/${HAEntityTypes.select}.ts`)
  await writeSensor(`${path}/${HAEntityTypes.sensor}.ts`)
  await writeSiren(`${path}/${HAEntityTypes.siren}.ts`)
  await writeSun(`${path}/${HAEntityTypes.sun}.ts`)
  await writeSwitch(`${path}/${HAEntityTypes.switch}.ts`)
  await writeUpdate(`${path}/${HAEntityTypes.update}.ts`)
  await writeVacuum(`${path}/${HAEntityTypes.vacuum}.ts`)
  await writeWaterHeater(`${path}/${HAEntityTypes.water_heater}.ts`)
  await writeWeather(`${path}/${HAEntityTypes.weather}.ts`)
};

export default generateEntities;
