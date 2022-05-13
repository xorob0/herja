export type BinarySensorEntityId = string//`binary_sensor.${string}`

//TODO abstract this
export type BinarySensorState = {
    entity_id: BinarySensorEntityId,
    state: string//"on" | "off" | "unavailable",
    last_changed: string,
    last_updated: string,
    context: {
        id: string,
        parent_id?: string| null,
        user_id: string
    }
}


export type BinarySensor = {
    [entity_id: string]: {
        entity_id: BinarySensorEntityId,
        state: BinarySensorState,
    }
}