interface Car {
    id: number;
    marca: string;
    modelo: string;
    año: number;
};

class CarInfo {
    static getCarDetail(car: Car): string {
        return `Detalles del carro: \nid:\t ${car.id}\nMarca:\t ${car.marca}\nModelo:\t ${car.modelo}\nAño:\t ${car.año}`
    }
}

const micarro: Car = {
    id: 1,
    marca: "Renault",
    modelo: "Clio",
    año: 2007
}

const carDetail: string = CarInfo.getCarDetail(micarro);
console.log(`Detalle de carros: \n ${carDetail}`);