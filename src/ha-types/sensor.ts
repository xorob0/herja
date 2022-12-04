import { HAEntityTypes } from "./entityTypes";

export type SensorEntityId = `${HAEntityTypes.sensor}.${string}`

export enum SensorDeviceClass {
    APPARENT_POWER = "apparent_power",
    AQI = "aqi",
    BATTERY = "battery",
    CARBON_DIOXIDE = "carbon_dioxide",
    CARBON_MONOXIDE = "carbon_monoxide",
    CURRENT = "current",
    DISTANCE = "distance",
    ENERGY = "energy",
    FREQUENCY = "frequency",
    GAS = "gas",
    HUMIDITY = "humidity",
    ILLUMINANCE = "illuminance",
    MOISTURE = "moisture",
    MONETARY = "monetary",
    NITROGEN_DIOXIDE = "nitrogen_dioxide",
    NITROGEN_MONOXIDE = "nitrogen_monoxide",
    NITROUS_OXIDE = "nitrous_oxide",
    OZONE = 'ozone',
    PM1 = "pm1",
    PM10 = "pm10",
    PM25 = "pm25",
    POWER = "power",
    POWER_FACTOR = "power_factor",
    PRECIPITATION = "precipitation",
    PRECIPITATION_INTENSITY = "precipitation_intensity",
    PRESSURE = "pressure",
    REACTIVE_POWER = "reactive_power",
    SIGNAL_STRENGTH = "signal_strength",
    SPEED = "speed",
    SULPHUR_DIOXIDE = "sulphur_dioxide",
    TEMPERATURE = "temperature",
    VOLATILE_ORGANIC_COMPOUNDS = "volatile_organic_compounds",
    VOLTAGE = "voltage",
    VOLUME = "volume",
    WATER = "water",
    WEIGHT = "weight",
    WIND_SPEED = "wind_speed",
}

export enum SensorStateClass {
    MEASUREMENT = "measurement",
    TOTAL = "total",
    TOTAL_INCREASING = "total_increasing",
}

export type SensorState = "unavailable"| string | number | Date

//TODO abstract this
export type SensorProperties = {
    state: SensorState,
    attributes: {
        device_class?: SensorDeviceClass
        last_reset?: Date,
        native_value: SensorState,
        state_class?: string,
        suggested_unit_of_measurement?: string,
    }
}

export type SensorEntity = {
    entity_id: SensorEntityId,
    entity: SensorProperties,
}

export type Sensor<T extends string = string>  = {
    [entity_id in T]: SensorEntity
}
