let os = require('os');

console.log(os.userInfo());
console.log(os.homedir());
console.log(os.type());
console.log(os.networkInterfaces());
console.log(os.uptime() + " Seconds!");
console.log(os.release());