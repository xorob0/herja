import {
    callService,
    configure,
} from '@homeassistant-node/main';

const base = async () => {
    const connection = await configure({
        url: 'https://localhost:8123',
        access_token: 'abc',
    });
    connection.subscribeEvents(
        (event) => {
            if(event.data.entity_id === "binary_sensor.garden_door_contact" && event.data.new_state === 'on'){
                console.log('Garden door was opened, turning on garden light')
                callService('light', 'turn_on', undefined, {entity_id: 'light.garden'})
            }
        })
};

base();
