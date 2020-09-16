import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";

import ProductTypeList from "../components/ProductTypeList";
import { IProductType, IVenta, IState, IActions } from "../interfaces";
import { formatMoney } from "../utils";
import useGlobal from "../globals/store";

import "./Tab1.css";

import imgGarrafon from "../assets/images/product-types/garrafon.jpg";
import imgLitro from "../assets/images/product-types/litro.jpg";
import imgBotella from "../assets/images/product-types/botella.jpg";
import imgGalon from "../assets/images/product-types/galon.jpg";

const products: IProductType[] = [
  {
    id: "garrafon",
    name: "Garrafón",
    image: imgGarrafon,
    price: 10.0,
  },
  {
    id: "litro",
    name: "Litro",
    image: imgLitro,
    price: 0.5,
  },
  {
    id: "botella",
    name: "Botella",
    image: imgBotella,
    price: 6.0,
  },
  {
    id: "medio_garrafon",
    name: "Medio garrafón",
    image: imgGarrafon,
    price: 8.0,
  },
  {
    id: "galon",
    name: "Galón",
    image: imgGalon,
    price: 8.0,
  },
];

const defaultForm: IVenta = {
  product_id: "garrafon",
  product_name: "Garrafón",
  product_price: 10.0,
  units: 0,
  pay_recieved: 0.0,
};

const Tab1: React.FC = () => {
  const [form, setForm] = useState<IVenta>(defaultForm);
  const globalActions = useGlobal()[1];

  const { addVenta } = globalActions;

  const handleClickProductType = (id: string, name: string, price: number) => {
    console.log(id);
    setForm({
      ...form,
      product_id: id,
      product_name: name,
      product_price: price,
    });
  };

  const updateForm = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.name]: Number(e.currentTarget.value || 0),
    });
  };

  const calculateCost = (): number => {
    return form.product_price * form.units;
  };

  const calculateChange = (): number => {
    const change: number = form.pay_recieved - calculateCost();
    if (change < 0) {
      return 0.0;
    }
    return change;
  };

  const addSell = () => {
    const cost = calculateCost();
    if (form.units > 0 && cost > 0 && form.pay_recieved >= cost) {
      setForm(defaultForm);
      addVenta(form);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nueva venta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nueva venta</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <h5 style={{ marginLeft: "1rem" }}>Tipo de producto</h5>
          <IonItem>
            <ProductTypeList
              data={products}
              handleClick={handleClickProductType}
              currentId={form.product_id}
            />
          </IonItem>

          <h5 style={{ textAlign: "center", fontWeight: "bold" }}>
            Producto:{" "}
            <span style={{ color: "#3880ff" }}>{form.product_name}</span>
          </h5>

          <h5 style={{ marginLeft: "1rem" }}>Cantidad</h5>
          <div className="ion-text-center">
            <input
              type="number"
              className="input-number"
              name="units"
              value={form.units === 0 ? "" : form.units}
              onChange={updateForm}
            />
          </div>

          <h5 style={{ marginLeft: "1rem" }}>Se cobrarán</h5>
          <p className="label-number">{formatMoney(calculateCost())}</p>

          <h5 style={{ marginLeft: "1rem" }}>¿Con cuánto se pago?</h5>
          <div className="ion-text-center">
            <input
              type="number"
              className="input-number"
              name="pay_recieved"
              value={form.pay_recieved === 0 ? "" : form.pay_recieved}
              onChange={updateForm}
            />
          </div>

          <h5 style={{ marginLeft: "1rem" }}>Devolver al cliente</h5>
          <p className="label-number">{formatMoney(calculateChange())}</p>

          <IonButton
            expand="block"
            style={{
              marginTop: "1rem",
              marginBottom: "1.5rem",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={addSell}
          >
            <IonIcon slot="start" icon={cartOutline} />
            Registrar venta
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
