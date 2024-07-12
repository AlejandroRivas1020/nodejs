const path = require("path");

const filePath = "/Users/johndoe/Documents/example.txt";

console.log(path.dirname(filePath)); // dirname se utiliza para obtener el directorio de la ruta
console.log(path.basename(filePath)); // basename se utiliza para obtener el nombre del archivo de la ruta
console.log(path.extname(filePath)); // extname se utiliza para obtener la extensión del archivo de la ruta