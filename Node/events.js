const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('kiremama', (a, b) => {
    console.log({ a, b });
})

eventEmitter.once('lolo', () => {
    console.log("HHHHHHHHHHH");
});

// eventEmitter.emit('kiremama', 1, 2);
// eventEmitter.emit('kiremama', 1, 2);

eventEmitter.emit('lolo', 1, 2);
eventEmitter.emit('lolo', 1, 2);
console.log("dsudus");
eventEmitter.emit('lolo', 1, 2);