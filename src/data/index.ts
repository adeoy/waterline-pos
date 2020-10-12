import {
  IProductType,
  IEmployeeType,
  IEmployeeRoute,
} from "../interfaces/index";

import imgGarrafon from "../assets/images/garrafon.jpg";
import imgLitro from "../assets/images/litro.jpg";
import imgBotella from "../assets/images/botella.jpg";
import imgGalon from "../assets/images/galon.jpg";
import imgMedioGarrafon from "../assets/images/medio-garrafon.jpg";

export const productTypes: IProductType[] = [
  {
    name: "garrafon",
    title: "Garrafón",
    image: imgGarrafon,
    price: 10,
    comision: 3,
  },
  {
    name: "litro",
    title: "Litro",
    image: imgLitro,
    price: 0.5,
    comision: 0.15,
  },
  {
    name: "botella",
    title: "Botella",
    image: imgBotella,
    price: 6,
    comision: 2,
  },
  {
    name: "galon",
    title: "Galón",
    image: imgGalon,
    price: 8,
    comision: 2.5,
  },
  {
    name: "medio_garrafon",
    title: "Medio garrafón",
    image: imgMedioGarrafon,
    price: 8,
    comision: 2.5,
  },
];

export const employeeTypes: IEmployeeType[] = [
  {
    type: "local",
    comision: false,
    route: {
      name: "local",
      gas_charge: 0.0,
    },
  },
  {
    type: "truck",
    comision: true,
    route: {
      name: "Ejido González",
      gas_charge: 0.0,
    },
  },
];

export const employeeRoutes: IEmployeeRoute[] = [
  {
    name: "Local",
    gas_charge: 0.0,
  },
  {
    name: "Ejido González",
    gas_charge: 0.0,
  },
  {
    name: "González",
    gas_charge: 0.0,
  },
  {
    name: "Santa Fé",
    gas_charge: 1.0,
  },
  {
    name: "Menonitas",
    gas_charge: 1.0,
  },
  {
    name: "Manuel",
    gas_charge: 1.0,
  },
];
