# Homeassistant-node
A library to create automation for Home Assistant in nodeJS using the WebSocket API.
## Example
```typescript
import {
  callService,
  configure,
} from '@homeassistant-node/main';
require('dotenv').config();

const base = async () => {
  const connection = await configure({
    url: process.env.API_URL,
    access_token: process.env.API_TOKEN,
  });
  connection.subscribeEvents(
    (event: { data?: { entity_id?: string; new_state: any } }) => {
      if(event.data.entity_id === "binary_sensor.garden_door_contact" && event.data.new_state === 'on'){
        console.log('Garden door was opened, turning on garden light')
        callService('light', 'turn_on', undefined, {entity_id: 'light.garden'})
      }
  })
};

base();
```

## Thanks
- [Anymaniax's beer temple](https://github.com/anymaniax/beer-temple)
- [Home Assistant official WebSocket library](https://github.com/home-assistant/home-assistant-js-websocket)
