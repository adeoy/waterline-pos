import React from "react";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonItemDivider,
  IonInput,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonFooter,
} from "@ionic/react";

import useGlobal from "../global/store";
import {
  cashOutline,
  mapOutline,
  medalOutline,
  personOutline,
  peopleOutline
} from "ionicons/icons";
import { employeeTypes, employeeRoutes, offers } from "../data";
import { formatMoney } from "../utils/index";
import { getOfferText } from "../utils/local";
import { businessPrices } from "../data/index";

const Settings: React.FC = () => {
  const [state, actions] = useGlobal();

  const { employee, currentOffer, currentBusinessPrice, version } = state;
  const { setEmployee, setOffer, setBusinessPrice } = actions;

  const handleEmployeeType = (e: any) => {
    const type = e.detail.value!;
    const comision = employeeTypes.find((item) => item.type === type)!.comision;
    const routeName = type === "truck" ? "Ejido González" : "Local";

    setEmployee({
      ...employee,
      type,
      comision,
      route: { name: routeName, gas_charge: 0.0 },
    });
  };

  const handleEmployeeRoute = (e: any) => {
    const routeName = e.detail.value!;
    const route = employeeRoutes.find((item) => item.name === routeName)!;
    setEmployee({ ...employee, route });
  };

  const employeeRoutesNoLocal = employeeRoutes.slice(1);

  const availableOffers = offers.map((offer) => (
    <IonSelectOption key={offer.name} value={offer.name}>
      {getOfferText(offer)}
    </IonSelectOption>
  ));
  const handleCurrentOffer = (e: any) => {
    const offerName = e.detail.value!;
    const offer = offers.find((item) => item.name === offerName)!;
    setOffer(offer);
  };
  const currentOfferName = currentOffer?.name || "";

  const availableBusinessPrices = businessPrices.map((item) => (
    <IonSelectOption key={item.name} value={item.name}>
      -{formatMoney(item.discount)}
    </IonSelectOption>
  ));
  const handleBusinessPrice = (e: any) => {
    const businessPriceName = e.detail.value!;
    const businessPrice = businessPrices.find(
      (item) => item.name === businessPriceName
    )!;
    setBusinessPrice(businessPrice);
  };
  const currentBusinessPriceName = currentBusinessPrice?.name || "";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Configuración</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItemDivider>Básicos</IonItemDivider>
          <IonItem>
            <IonIcon icon={personOutline} slot="start" />
            <IonLabel position="fixed">Nombre:</IonLabel>
            <IonInput
              className="ion-text-right"
              placeholder="Usuario"
              value={employee.name}
              onIonChange={(e) =>
                setEmployee({ ...employee, name: e.detail.value! })
              }
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon icon={medalOutline} slot="start" />
            <IonLabel>Colaborador:</IonLabel>
            <IonSelect value={employee.type} onIonChange={handleEmployeeType}>
              <IonSelectOption value="local">En el local</IonSelectOption>
              <IonSelectOption value="truck">Repartidor</IonSelectOption>
            </IonSelect>
          </IonItem>
          {employee.type === "truck" && (
            <IonItem>
              <IonIcon icon={mapOutline} slot="start" />
              <IonLabel>Ruta:</IonLabel>
              <IonSelect
                value={employee.route.name}
                onIonChange={handleEmployeeRoute}
              >
                {employeeRoutesNoLocal.map((item) => (
                  <IonSelectOption key={item.name} value={item.name}>
                    {item.name} + {formatMoney(item.gas_charge)}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          )}
          {availableOffers && (
            <IonItem>
              <IonIcon icon={cashOutline} slot="start" />
              <IonLabel>Promociones:</IonLabel>
              <IonSelect
                value={currentOfferName}
                onIonChange={handleCurrentOffer}
              >
                <IonSelectOption value="">Ninguna</IonSelectOption>
                {availableOffers.map((offer) => offer)}
              </IonSelect>
            </IonItem>
          )}
          {availableBusinessPrices && (
            <IonItem>
              <IonIcon icon={peopleOutline} slot="start" />
              <IonLabel>Descuento negocios:</IonLabel>
              <IonSelect
                value={currentBusinessPriceName}
                onIonChange={handleBusinessPrice}
              >
                <IonSelectOption value="">Ninguno</IonSelectOption>
                {availableBusinessPrices.map((item) => item)}
              </IonSelect>
            </IonItem>
          )}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonLabel>
          <p
            className="ion-text-center"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          >
            Versión: {version}
          </p>
        </IonLabel>
      </IonFooter>
    </IonPage>
  );
};

export default Settings;
