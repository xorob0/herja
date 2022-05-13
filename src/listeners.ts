import { shadowState, stateChangeEvent, stateListener } from './connexion';
import {EntityId} from "./ha-types/common";

export const listenForEntity: <T>(
  entity: EntityId | EntityId[] | RegExp,
  callback: (event: stateChangeEvent<T>) => void,
) => void = (entity, callback) => {
  if (typeof entity === 'string')
    stateListener((event) => {
      if (event.data.entity_id === entity) callback(event);
    });
  else if("exec" in entity)
      stateListener((event) => {
          if (event.data.entity_id.match(entity)) callback(event);
      });
  else
      entity.forEach((id) =>
          stateListener((event) => {
              if (event.data.entity_id === id) callback(event);
          }),
      );
};

export const onEntitiesStates: <T>(
  entitiesState: ({ entity_id: EntityId; }&Partial<{ state: number | boolean | string, not: number | boolean | string}>)[],
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
      else otherwise?.(event);
    });
  });
};
