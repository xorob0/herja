import { AlarmControlPanelEntity, AlarmControlPanelProperties } from "./alarm_control_panel";
import { BinarySensorEntity, BinarySensorProperties } from "./binary_sensor";
import { AirQualityEntity, AirQualityProperties } from "./air_quality";
import { LightEntity, LightProperties } from "./light";
import { SwitchEntity, SwitchProperties } from "./switch";
import { SunEntity } from "./sun";
import { PersonEntity } from "./person";
import { SensorEntity, SensorProperties } from "./sensor";
import { CoverEntity, CoverProperties } from "./cover";
import { DeviceTrackerEntity, DeviceTrackerProperties } from "./device_tracker";
import { MediaPlayerEntity, MediaPlayerProperties } from "./media_player";
import { SirenEntity } from "./siren";
import { WeatherEntity, WeatherProperties } from "./weather";
import { ClimateEntity, ClimateProperties } from "./climate";
import { UpdateEntity, UpdateProperties } from "./update";
import { FanEntity } from "./fan";
import { LockEntity, LockProperties } from "./lock";
import { HumidifierEntity, HumidifierProperties } from "./humidifier";
import { RemoteEntity, RemoteProperties } from "./remote";
import { SelectEntity, SelectProperties } from "./select";
import { WaterHeaterEntity, WaterHeaterProperties } from "./water_heater";
import { VacuumEntity, VacuumProperties } from "./vacuum";
import { CameraEntity, CameraProperties } from "./camera";
import { CalendarEntity, CalendarProperties } from "./calendar";
import { ButtonEntity, ButtonProperties } from "./button";

export * from './light'
export * from './switch'
export * from './binary_sensor'
export * from './sun'
export * from './person'
export * from './sensor'
export * from './cover'
export * from './alarm_control_panel'
export * from './device_tracker'
export * from './entityTypes'
export * from './media_player'
export * from './siren'
export * from './update'
export * from './weather'
export * from './air_quality'
export * from './climate'
export * from './fan'
export * from './humidifier'
export * from './lock'
export * from './remote'
export * from './select'
export * from './vacuum'
export * from './water_heater'
export * from './camera'
export * from './calendar'
export * from './button'


export type BetterHassEntity = AirQualityEntity | AlarmControlPanelEntity | BinarySensorEntity | LightEntity | SwitchEntity | SunEntity | PersonEntity | SensorEntity | CoverEntity | DeviceTrackerEntity | MediaPlayerEntity | SirenEntity | UpdateEntity | WeatherEntity | ClimateEntity | FanEntity | HumidifierEntity | LockEntity | RemoteEntity | SelectEntity | VacuumEntity | WaterHeaterEntity | CameraEntity | CalendarEntity | ButtonEntity
export type BetterHassStateProperties =  (AirQualityProperties | AlarmControlPanelProperties | BinarySensorProperties | LightProperties | SwitchProperties | SensorProperties | CoverProperties | DeviceTrackerProperties | MediaPlayerProperties | UpdateProperties | WeatherProperties | ClimateProperties | HumidifierProperties | LockProperties | RemoteProperties | SelectProperties | VacuumProperties | WaterHeaterProperties | CameraProperties | CalendarProperties | ButtonProperties) & {entity_id: string, state: string}
