const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
eventEmitter.emit('my_event');
eventEmitter.on('my_event', () => {
    console.log('data received successfully.');
});