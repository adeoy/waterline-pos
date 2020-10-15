import {
  IProductType,
  IEmployeeType,
  IEmployeeRoute,
  IPriceRule,
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

export const pricesRules: IPriceRule[] = [
  {
    name: "Entre 6 y menos de 8",
    price: 9.0,
    valid: (units: number): boolean =>
      units >= 6 && units < 8,
  },
  {
    name: "Entre 8 y menos de 10",
    price: 8.0,
    valid: (units: number): boolean =>
      units >= 8 && units < 10,
  },
  {
    name: "Entre 10 y menos de 26",
    price: 7.0,
    valid: (units: number): boolean =>
      units >= 10 && units < 26,
  }
];