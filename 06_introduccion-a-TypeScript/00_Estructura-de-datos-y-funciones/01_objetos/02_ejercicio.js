"use strict";
;
class CarInfo {
    static getCarDetail(car) {
        return `Detalles del carro: \nid:\t ${car.id}\nMarca:\t ${car.marca}\nModelo:\t ${car.modelo}\nAño:\t ${car.año}`;
    }
}
const micarro = {
    id: 1,
    marca: "Renault",
    modelo: "Clio",
    año: 2007
};
const carDetail = CarInfo.getCarDetail(micarro);
console.log(`Detalle de carros: \n ${carDetail}`);
