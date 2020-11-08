import moment from "moment";

import {
  IProductType,
  IEmployeeType,
  IEmployeeRoute,
  IPriceRule,
  IOffer,
  IBusinessPrice,
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
  {
    name: "Libramiento",
    gas_charge: 1.0,
  },
  {
    name: "Graciano Sánchez",
    gas_charge: 2.0,
  },
  {
    name: "Ruíz Cortínez",
    gas_charge: 2.0,
  },
];

export const pricesRules: IPriceRule[] = [
  /*{
    name: "Entre 6 y menos de 8",
    price: 1.0,
    valid: (units: number): boolean => units >= 6 && units < 8,
  },
  {
    name: "Entre 8 y menos de 10",
    price: 2.0,
    valid: (units: number): boolean => units >= 8 && units < 10,
  },
  {
    name: "Entre 10 y menos de 26",
    price: 3.0,
    valid: (units: number): boolean => units >= 10 && units < 26,
  },*/
];

export const guides = [
  {
    title: "Cada día",
    isDay: (): boolean => true,
    shores: [
      {
        title: "Prueba de dureza",
        steps: [
          "Ubicar la llave del filtro suavizador (llave gris de en medio).",
          "Sacar 1 litro de agua en algún bote y tirarla.",
          "Tomar la muestra en frasco pequeño.",
          "Colocarle una cucharada de polvo rosa y agitarlo.",
          "Colocar una gota del gotero y agitarlo.",
          "Debe a cambiar a color azul a la primera gota o como máximo a la tercera.",
          "Si esto es así se puede encender la osmosis. Si no es así se debe hacer el mantenimiento del filtro suavizador (se explica más abajo).",
        ],
      },
      {
        title: "Encender lampara UV",
        steps: [
          "Cada mañana se debe conectar la lámpara de luz UV y al salir desconectarla. El foco durará entre 10 y 12 meses. El LED verde significa que está funcionando.",
        ],
      },
      {
        title: "Ozono",
        steps: [
          "Se debe conectar a la corriente cada que se vaya a rellenar un garrafón y desconectar cuando no se utilice.",
        ],
      },
    ],
  },
  {
    title: "Cada miércoles y domingo",
    isDay: (): boolean => moment().day() === 3 || moment().day() === 7,
    shores: [
      {
        title: "Prueba del cloro",
        steps: [
          "Ubicar la llave del agua cruda (primer llave gris).",
          "Sacar 1 litro de agua en algún bote y tirarla.",
          "Tomar una muestra en tubito amarillo.",
          "Colocar 5 gotas del gotero amarillo.",
          "Tapar el tubito y agitarlo.",
          "Debe estar algo amarillo, no debe ser transparente, ni estar excesivamente amarillo.",
          "Si está transparente es porque no hay cloro y deben ponerse 10ml de cloro por cada 1000 litros de agua cruda. Abrir la tapa del tinaco para poner el cloro.",
        ],
      },
    ],
  },
  {
    title: "Cada domingo",
    isDay: (): boolean => moment().day() === 7,
    shores: [
      {
        title: "Filtro de carbón activado",
        steps: [
          'Girar la manija a la posición "Back Wash" por 5 minutos.',
          'Después girarla a "Fast Rinse" por 2 minutos.',
          'Finalmente regresar a "Filter".',
        ],
      },
      {
        title: "Sanitización de filtro pulidor (el de arriba)",
        steps: [
          "Al final del día, apagar la osmosis.",
          "Cerrar llaves izquierda y derecha.",
          "Presionar botón rojo en el filtro pulidor hasta que no tire agua.",
          "Abrir el filtro girandolo a la izquierda.",
          "Sacar la esponja el filtro pulidor (arriba) y colocarlo en un bote con agua.",
          "Colocar 50ml hipoclorito en el filtro.",
          "Colocar el filtro sin la esponja y cerrarlo.",
          "Después abrir las dos llaves.",
          "Abrir todas las llaves de las mesas de lavado y llenado 5 minutos para que fluya el cloro.",
          "Dejarlo reposar en la tubería toda la noche.",
          "A la mañana, colocar nuevamente la esponja en el filtro.",
          "Nuevamente abrir todas las llaves para sacar el cloro.",
          "Hacer la prueba de cloro en el agua de la mesa de llenado y debe ser transparente.",
        ],
      },
      {
        title: "Boquillas de mesa de llenado",
        steps: ["Limpiar las boquillas con alcohol con gasa o algodón."],
      },
    ],
  },
  {
    title: "Cada 3 meses",
    isDay: (): boolean => {
      const date = moment();
      const month = date.month();
      return (
        (month === 1 || month === 4 || month === 7 || month === 10) &&
        date.day() === 7 &&
        date.daysInMonth() < 8
      );
    },
    shores: [
      {
        title: "Lavado del tinaco de agua cruda",
        steps: [
          "Lavar con 50ml de hipoclorito, con escoba especial y no usar detergente, enjuagar y secar.",
        ],
      },
      {
        title: "Cambiar esponja de filtro pulidor (tubos azules)",
        steps: [
          "Apagar la osmosis.",
          "Cerrar llaves izquierda y derecha.",
          "Presionar botón rojo en el filtro pulidor hasta que no tire agua.",
          "Abrir el filtro girandolo a la izquierda.",
          "Poner la nueva esponja.",
          "Abrir la llave azul izquierda.",
          "Presionar el botón rojo hasta que salga agua (se escucha salir el aire).",
          "Abrir la llave roja derecha.",
          "Ya se puede hacer encender la osmosis.",
        ],
      },
    ],
  },
  {
    title: "Cada 6 meses",
    isDay: (): boolean => {
      const date = moment();
      const month = date.month();
      return (
        (month === 4 || month === 10) &&
        date.day() === 7 &&
        date.daysInMonth() < 8
      );
    },
    shores: [
      {
        title: "Lavado de tinaco de agua purificada",
        steps: [
          "Lavar con 50ml de hipoclorito, con escoba especial y no usar detergente, enjuagar y secar.",
        ],
      },
    ],
  },
  {
    title: "Cada año",
    isDay: (): boolean => {
      const date = moment();
      const month = date.month();
      return month === 10 && date.day() === 7 && date.daysInMonth() < 8;
    },
    shores: [
      {
        title: "Filtro de carbón activado",
        steps: [
          "Filtro de carbón activado, arena, grava, debe reemplazarse, contratar empresa que sepa hacerlo.",
        ],
      },
    ],
  },
];

export const offers: IOffer[] = [
  {
    name: 'Inauguración',
    type: 'axb',
    data: {
      get: 3,
      pay: 2,
    },
    date: {
      from: '2020-10-21T14:00:00.000Z', // 9am
      to: '2020-10-23T22:00:00.000Z', // 5pm
    }
  },
  {
    name: '3er compra',
    type: 'xfree',
    data: {
      units: 1,
    },
  }
];

export const businessPrices: IBusinessPrice[] = [
  {
    name: 'menos1',
    discount: 1.0,
  },
  {
    name: 'menos2',
    discount: 2.0,
  },
  {
    name: 'menos3',
    discount: 3.0,
  },
  {
    name: 'menos4',
    discount: 4.0,
  },
  {
    name: 'menos5',
    discount: 5.0,
  }
]