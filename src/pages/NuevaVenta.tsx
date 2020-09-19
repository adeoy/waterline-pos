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
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";

import ProductTypeList from "../components/ProductTypeList";
import { ISale } from "../interfaces";
import { formatMoney } from "../utils";

import "./NuevaVenta.css";

import useGlobal from "../global/store";
import Toast from "../components/Toast";

const defaultForm: ISale = {
  product_name: "garrafon",
  product_title: "Garrafón",
  product_price: 10.0,
  units: 0,
  pay_received: 0.0,
  cost: 0.0,
  date: new Date().toISOString(),
};

const NuevaVenta: React.FC = () => {
  const [state, actions] = useGlobal();

  const { toast, productTypes } = state;
  const { addSale, openToast } = actions;

  const [form, setForm] = useState<ISale>(defaultForm);

  const handleClickProductType = (
    name: string,
    title: string,
    price: number
  ) => {
    setForm({
      ...form,
      product_name: name,
      product_title: title,
      product_price: price,
      cost: price * form.units,
    });
  };

  const onChangeUnits = (e: React.FormEvent<HTMLInputElement>) => {
    const units = Number(e.currentTarget.value || 0);
    const cost = form.product_price * units;
    setForm({
      ...form,
      units,
      cost,
    });
  };

  const onChangePayReceived = (e: React.FormEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      pay_received: Number(e.currentTarget.value || 0.0),
    });
  };

  const calculateChange = (): number => {
    const change: number = form.pay_received - form.cost;
    if (change < 0) {
      return 0.0;
    }
    return change;
  };

  const addSell = () => {
    setForm(defaultForm);
    addSale({ ...form, date: new Date().toISOString() });
  };

  const isSellDisabled = () =>
    !(form.units > 0 && form.pay_received > 0 && form.pay_received > form.cost);

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

          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            Producto:{" "}
            <span style={{ color: "#3880ff" }}>{form.product_name}</span>
          </p>

          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <h5 style={{ marginLeft: "1rem" }}>Cantidad</h5>
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
                <h5 style={{ marginLeft: "1rem" }}>Se cobrarán</h5>
                <p className="label-number">{formatMoney(form.cost)}</p>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">
                <h5 style={{ marginLeft: "1rem" }}>Se pagó con</h5>
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
                <h5 style={{ marginLeft: "1rem" }}>Devolver al cliente</h5>
                <p className="label-number">{formatMoney(calculateChange())}</p>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonButton
            expand="block"
            style={{
              marginTop: "1rem",
              marginBottom: "1.5rem",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
            onClick={addSell}
            disabled={isSellDisabled()}
          >
            <IonIcon slot="start" icon={cartOutline} />
            Crear venta
          </IonButton>
        </IonList>

        <Toast {...toast} onDidDismiss={() => openToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default NuevaVenta;
