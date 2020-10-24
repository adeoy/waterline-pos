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
import { IGeo, IPriceRule, ISale } from "../interfaces";
import { formatMoney } from "../utils";

import "./NewSale.css";

import useGlobal from "../global/store";

import { Plugins } from "@capacitor/core";
import { productTypes } from "../data/";
import {
  applyOffer,
  calculateComisionCost,
  getApplyRule,
  getGasChargeByUnits,
  getOfferText,
} from "../utils/local";

const { Geolocation } = Plugins;

const NewSale: React.FC = () => {
  const [state, actions] = useGlobal();
  const [loading, setLoading] = useState<boolean>(false);

  const { employee, currentOffer } = state;
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
    offer: currentOffer,
    offerDiscount: 0.0,
  };

  const [form, setForm] = useState<ISale>(defaultForm);

  const contentIsCurrentOffer = () => {
    if (currentOffer) {
      return (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "0rem",
          }}
        >
          Promoción:{" "}
          <span style={{ color: "#2dd36f" }}>{getOfferText(currentOffer)}</span>
        </p>
      );
    } else {
      return <></>;
    }
  };

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

    const offerDiscount = applyOffer(units, currentOffer, form.product_price);
    let rule: IPriceRule | null = null;
    let product_price: number = form.product_price;

    if (offerDiscount === 0) {
      const res = getApplyRule(
        form.product_price,
        form.product_name,
        units,
        defaultForm.product_price,
        employee.comision
      );
      rule = res.rule;
      product_price = res.product_price;
    }

    const cost = product_price * units;
    const route = employee.route;

    setForm({
      ...form,
      product_price,
      units,
      cost,
      route,
      rule,
      offer: currentOffer,
      offerDiscount,
    });
  };

  const onChangePayReceived = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      pay_received: Number(e.currentTarget.value || 0.0),
    });
  };

  const grandTotal = () =>
    calculateComisionCost(employee.comision, form) +
    getGasChargeByUnits(form) -
    form.offerDiscount;

  const calculateChange = (): number => {
    const change: number = form.pay_received - grandTotal();
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
      form.pay_received >= grandTotal()
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

          {contentIsCurrentOffer()}

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
                    tabIndex={1}
                  />
                </div>
              </IonCol>
              <IonCol size="6">
                <p className="label-number">{formatMoney(grandTotal())}</p>
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
                    tabIndex={2}
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
          tabIndex={3}
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
