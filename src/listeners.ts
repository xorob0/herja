import {shadowState, stateChangeEvent, stateListener} from "./connection";

export const listenForEntity: <T>(entity_id: string , callback: (event: stateChangeEvent<T>) => void) => void = (entity_id, callback) =>{
    stateListener(event => {
        if(event.data.entity_id === entity_id)
        { // @ts-ignore
            callback(event)
        }
    })
}

export const onEntitiesStates: <T>(entitiesState: {entity_id: string, state: number|boolean|string}[], callback: (event: stateChangeEvent<T>) => void) => void = (entitiesState, callback) =>{
    entitiesState.forEach(({entity_id, state}) => {
        listenForEntity(entity_id, event => {
            const isAllEntitiesCorrect = entitiesState.reduce((isCorrect, {entity_id, state})=>{
                if(!isCorrect)
                    return false
                if(entity_id === event.data.entity_id && state === event.data.new_state.state)
                    return true
                return shadowState[entity_id].state === state;
            }, true)

            if(isAllEntitiesCorrect)
            { // @ts-ignore
                callback(event)
            }
        })
    })
}

export const listenForEntites: <T>(entities_id: string[], callback: (event: stateChangeEvent<T>) => void) => void = (entities_id, callback) => {
    entities_id.forEach(entity_id => listenForEntity(entity_id, callback))
}
