# Homeassistant-node
A library to create automation for Home Assistant in nodeJS using the WebSocket API.

## How to use
### Initialize the connexion
```typescript
const connection = await configure({
  url: process.env.API_URL,
  access_token: process.env.API_TOKEN,
});
```
Where `API_URL` is `ws://${host:port}/api/websocket` and your `access_token` can be generated from your account.

### Listen for changes on an entity
```typescript
listenForEntity("sun.sun", (entity) => {
    if(entity.new_state.state === 'below_horizon')
        callService('light', 'turn_on', undefined, 'light.living_room')
})
```


### Describe a set of state and give it a callback
```typescript
onEntitiesState([{entity_id: 'binary_sensor.garden_door_contact', state: 'on'}, {entity_id: 'light.living_room_light', state: 'on'}],
    () => callService('light', 'turn_on', undefined, {entity_id: 'light.garden'})
)
```

### Manually subscribe to an event
```typescript
connection.subscribeEvents( (event) => {
  if(event.data.entity_id === "binary_sensor.garden_door_contact" && event.data.new_state === 'on'){
    callService('light', 'turn_on', undefined, {entity_id: 'light.garden'})
  }
})
```

## Thanks
- [Anymaniax's beer temple](https://github.com/anymaniax/beer-temple)
- [Home Assistant official WebSocket library](https://github.com/home-assistant/home-assistant-js-websocket)
