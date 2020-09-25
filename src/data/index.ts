import { IProductType, IEmployeeType } from "../interfaces/index";

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


export const employeeTypes:IEmployeeType[]  = [
  {
    type: "local",
    comision: false,
  },
  {
    type: "truck",
    comision: true,
  },
];
