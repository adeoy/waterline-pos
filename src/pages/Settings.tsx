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
} from "@ionic/react";

import useGlobal from "../global/store";
import { mapOutline, medalOutline, personOutline } from "ionicons/icons";
import { employeeTypes, employeeRoutes } from "../data";
import { formatMoney } from "../utils/index";
import Reporter from "../components/Reporter";

const Settings: React.FC = () => {
  const [state, actions] = useGlobal();

  const { employee, version } = state;
  const { setEmployee } = actions;

  const handleEmployeeType = (e: any) => {
    const type = e.detail.value!;
    const comision = employeeTypes.find((item) => item.type === type)!.comision;
    setEmployee({
      ...employee,
      type,
      comision,
      route: { name: "Local", gas_charge: 0.0 },
    });
  };

  const handleEmployeeRoute = (e: any) => {
    const routeName = e.detail.value!;
    const route = employeeRoutes.find((item) => item.name === routeName)!;
    setEmployee({ ...employee, route });
  };

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
              slot="end"
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
                {employeeRoutes.map((item) => (
                  <IonSelectOption key={item.name} value={item.name}>
                    {item.name} + {formatMoney(item.gas_charge)}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          )}

          <Reporter />
        </IonList>

        <IonLabel>
          <p className="ion-text-center">Versión: {version}</p>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
