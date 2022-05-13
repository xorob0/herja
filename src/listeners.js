"use strict";
exports.__esModule = true;
exports.onEntitiesStates = exports.listenForEntity = void 0;
var connexion_1 = require("./connexion");
var listenForEntity = function (entity_id, callback) {
    if (typeof entity_id === 'string')
        (0, connexion_1.stateListener)(function (event) {
            if (event.data.entity_id === entity_id)
                callback(event);
        });
    else
        entity_id.forEach(function (id) {
            return (0, connexion_1.stateListener)(function (event) {
                if (event.data.entity_id === id)
                    callback(event);
            });
        });
};
exports.listenForEntity = listenForEntity;
var onEntitiesStates = function (entitiesState, callback, otherwise) {
    entitiesState.forEach(function (_a) {
        var entity_id = _a.entity_id, currentEntityState = _a.state;
        (0, exports.listenForEntity)(entity_id, function (event) {
            var isAllEntitiesCorrect = entitiesState.reduce(function (isCorrect, _a) {
                var entity_id = _a.entity_id, state = _a.state;
                if (!isCorrect)
                    return false;
                if (entity_id === event.data.entity_id &&
                    currentEntityState === event.data.new_state.state)
                    return true;
                return connexion_1.shadowState[entity_id].state === state;
            }, true);
            if (isAllEntitiesCorrect)
                callback(event);
            else
                otherwise(event);
        });
    });
};
exports.onEntitiesStates = onEntitiesStates;
