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
  IonCol,
  IonGrid,
  IonRow,
  IonLabel,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";

import ProductTypeList from "../components/ProductTypeList";
import { IGeo, ISale } from "../interfaces";
import { formatMoney } from "../utils";

import "./NewSale.css";

import useGlobal from "../global/store";

import { Plugins } from "@capacitor/core";
import {productTypes} from "../data/";

const { Geolocation } = Plugins;

const NewSale: React.FC = () => {
  const [state, actions] = useGlobal();

  const { version, employee } = state;
  const { addSale } = actions;

  const defaultForm: ISale = {
    product_name: "garrafon",
    product_title: "Garrafón",
    product_price: 10.0,
    product_comision: 3.0,
    units: 0,
    pay_received: 0.0,
    cost: 0.0,
    date: new Date().toISOString(),
    geo: {
      lat: 0.0,
      long: 0.0,
    },
    gas_charge: 0.0,
  };

  const [form, setForm] = useState<ISale>(defaultForm);

  const handleClickProductType = (
    name: string,
    title: string,
    price: number,
    comision: number
  ) => {
    setForm({
      ...form,
      product_name: name,
      product_title: title,
      product_price: price,
      product_comision: comision,
      cost: price * form.units,
    });
  };

  const calculateComisionCost = () =>{
    if (employee.comision) {
      return (form.product_price + form.product_comision) * form.units;
    } else {
      return form.product_price * form.units;
    }
  }

  const onChangeUnits = (e: React.FormEvent<HTMLInputElement>) => {
    const units = Number(e.currentTarget.value || 0);
    const cost = form.product_price * units;
    const gas_charge = units * employee.route.gas_charge;
    setForm({
      ...form,
      units,
      cost,
      gas_charge,
    });
  };

  const onChangePayReceived = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      pay_received: Number(e.currentTarget.value || 0.0),
    });
  };

  const calculateChange = (): number => {
    const change: number = form.pay_received - (calculateComisionCost() + form.gas_charge);
    if (change < 0) {
      return 0.0;
    }
    return change;
  };

  const addSell = async () => {
    setForm(defaultForm);
    const coordinates = await Geolocation.getCurrentPosition();
    let geo: IGeo = { lat: 0.0, long: 0.0 };
    if (coordinates) {
      geo = {
        lat: coordinates.coords.latitude,
        long: coordinates.coords.longitude,
      };
    }
    addSale({ ...form, geo, date: new Date().toISOString() });
  };

  const isSellDisabled = () =>
    !(
      form.units > 0 &&
      form.pay_received > 0 &&
      form.pay_received >= calculateComisionCost() + form.gas_charge
    );

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
              data={productTypes}
              handleClick={handleClickProductType}
              currentName={form.product_name}
            />
          </IonItem>

          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "0rem",
            }}
          >
            Producto:{" "}
            <span style={{ color: "#3880ff" }}>{form.product_title}</span>
          </p>

          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <h5 style={{ marginLeft: "1rem" }}>Cantidad</h5>
              </IonCol>
              <IonCol size="6">
                <h5 style={{ marginLeft: "1rem" }}>Se cobrarán</h5>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="6">
                <div className="ion-text-center">
                  <input
                    type="number"
                    className="input-number"
                    value={form.units === 0 ? "" : form.units}
                    onChange={onChangeUnits}
                  />
                </div>
              </IonCol>
              <IonCol size="6">
                <p className="label-number">
                  {formatMoney(calculateComisionCost() + form.gas_charge)}
                </p>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="6">
                <h5 style={{ marginLeft: "1rem" }}>Se pagó con</h5>
              </IonCol>
              <IonCol size="6">
                <h5 style={{ marginLeft: "1rem" }}>Devolver al cliente</h5>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="6">
                <div className="ion-text-center">
                  <input
                    type="number"
                    className="input-number"
                    value={form.pay_received === 0 ? "" : form.pay_received}
                    onChange={onChangePayReceived}
                  />
                </div>
              </IonCol>
              <IonCol size="6">
                <p className="label-number">{formatMoney(calculateChange())}</p>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonButton
            expand="block"
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={addSell}
            disabled={isSellDisabled()}
          >
            <IonIcon slot="start" icon={cartOutline} />
            Crear venta
          </IonButton>

          <IonLabel>
            <p className="ion-text-center">Versión: {version}</p>
          </IonLabel>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NewSale;
