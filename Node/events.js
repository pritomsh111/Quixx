const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('my_event', () => {
    console.log('data received successfully.');
});

eventEmitter.emit('my_event');