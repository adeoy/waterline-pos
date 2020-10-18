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
  IonFooter,
  IonSpinner,
  IonLabel,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";

import ProductTypeList from "../components/ProductTypeList";
import { IGeo, ISale } from "../interfaces";
import { formatMoney } from "../utils";

import "./NewSale.css";

import useGlobal from "../global/store";

import { Plugins } from "@capacitor/core";
import { productTypes } from "../data/";
import {
  calculateComisionCost,
  getApplyRule,
  getGasChargeByUnits,
} from "../utils/local";

const { Geolocation } = Plugins;

const NewSale: React.FC = () => {
  const [state, actions] = useGlobal();
  const [loading, setLoading] = useState<boolean>(false);

  const { employee } = state;
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
    route: {
      name: "Local",
      gas_charge: 0.0,
    },
    rule: null,
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

  const onChangeUnits = (e: React.FormEvent<HTMLInputElement>) => {
    let units = Number(e.currentTarget.value || 0);
    if (units > 25) units = 25;

    const { rule, product_price } = getApplyRule(
      form.product_price,
      form.product_name,
      units,
      defaultForm.product_price,
      employee.comision
    );

    const cost = product_price * units;
    const route = employee.route;

    setForm({
      ...form,
      product_price,
      units,
      cost,
      route,
      rule,
    });
  };

  const onChangePayReceived = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      pay_received: Number(e.currentTarget.value || 0.0),
    });
  };

  const calculateChange = (): number => {
    const change: number =
      form.pay_received -
      (calculateComisionCost(employee.comision, form) +
        getGasChargeByUnits(form));
    if (change < 0) {
      return 0.0;
    }
    return change;
  };

  const addSell = async () => {
    setLoading(true);
    setForm(defaultForm);
    let coordinates = {
      coords: {
        latitude: 0.0,
        longitude: 0.0,
      },
    };

    try {
      coordinates = await Geolocation.getCurrentPosition();
    } catch (err) {
      console.log(err);
    }

    let geo: IGeo = { lat: 0.0, long: 0.0 };
    if (coordinates) {
      geo = {
        lat: coordinates.coords.latitude,
        long: coordinates.coords.longitude,
      };
    }
    addSale({ ...form, geo, date: new Date().toISOString() });
    setLoading(false);
  };

  const isSellDisabled = () =>
    !(
      form.units > 0 &&
      form.pay_received > 0 &&
      form.pay_received >=
        calculateComisionCost(employee.comision, form) +
          getGasChargeByUnits(form)
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
              units={form.units}
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
                  {formatMoney(
                    calculateComisionCost(employee.comision, form) +
                      getGasChargeByUnits(form)
                  )}
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
        </IonList>
      </IonContent>

      <IonFooter>
        <IonButton
          expand="block"
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
          onClick={addSell}
          disabled={isSellDisabled()}
        >
          {loading ? (
            <IonLabel>
              <IonSpinner />
            </IonLabel>
          ) : (
            <span>
              <IonIcon slot="start" icon={cartOutline} /> Vender
            </span>
          )}
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default NewSale;
