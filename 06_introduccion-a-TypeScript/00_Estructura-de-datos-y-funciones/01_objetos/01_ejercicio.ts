interface Car {
    id: number;
    marca: string;
    modelo: string;
    año: number;
};

const carro1: Car = {
    id: 1,
    marca: "Renault",
    modelo: "Clio",
    año: 2007
}

console.log(`Carro 1: \nid:\t ${carro1.id}\nMarca:\t ${carro1.marca}\nModelo:\t ${carro1.modelo}\nAño:\t ${carro1.año}`);