export type BinarySensorEntityId = string//`binary_sensor.${string}`

//TODO abstract this
export type BinarySensorState = {
    entity_id: BinarySensorEntityId,
    state: "on" | "off" | "unavailable",
    last_changed: string,
    last_updated: string,
    context: {
        id: string,
        parent_id?: string| null,
        user_id: string
    }
}


export type BinarySensor<T extends string = string>  = {
    [entity_id in T]: {
        entity_id: BinarySensorEntityId,
        state: BinarySensorState,
    }
}