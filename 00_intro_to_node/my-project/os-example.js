const os = require("os");

console.log(os.arch()); // arch se utiliza para obtener la arquitectura de la CPU
console.log(os.cpus()); // cpus se utiliza para obtener información sobre las CPUs
console.log(os.freemem()); // freemem se utiliza para obtener la cantidad de memoria libre
console.log(os.hostname()); // hostname se utiliza para obtener el nombre del host