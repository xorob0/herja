import { shadowState, stateChangeEvent, stateListener } from './connexion';

export const listenForEntity: <T>(
  entity_id: string | string[],
  callback: (event: stateChangeEvent<T>) => void,
) => void = (entity_id, callback) => {
  if (typeof entity_id === 'string')
    stateListener((event) => {
      if (event.data.entity_id === entity_id) callback(event);
    });
  else
    entity_id.forEach((id) =>
      stateListener((event) => {
        if (event.data.entity_id === id) callback(event);
      }),
    );
};

export const onEntitiesStates: <T>(
  entitiesState: ({ entity_id: string; }&Partial<{ state: number | boolean | string, not: number | boolean | string}>)[],
  callback: (event: stateChangeEvent<T>) => void,
  otherwise?: (event: stateChangeEvent<T>) => void,
) => void = (entitiesState, callback, otherwise) => {
  entitiesState.forEach(({ entity_id, state : currentEntityState}) => {
    listenForEntity(entity_id, (event) => {
      const isAllEntitiesCorrect = entitiesState.reduce(
        (isCorrect, { entity_id, state }) => {
          if (!isCorrect) return false;
          if (
            entity_id === event.data.entity_id &&
            currentEntityState === event.data.new_state.state
          )
            return true;
          return shadowState[entity_id].state === state;
        },
        true,
      );

      if (isAllEntitiesCorrect) callback(event);
      else otherwise(event);
    });
  });
};
