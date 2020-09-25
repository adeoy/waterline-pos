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
import { medalOutline, personOutline } from "ionicons/icons";
import { employeeTypes } from "../data";

const Settings: React.FC = () => {
  const [state, actions] = useGlobal();


  const { employee, version } = state;
  const { setEmployee } = actions;

  const handleEmployeeType = (e: any) => {
    const type = e.detail.value!;
    const comision = employeeTypes.find(item => item.type === type)!.comision;
    setEmployee({ ...employee, type, comision });
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
        </IonList>

        <IonLabel>
          <p className="ion-text-center">Versión: {version}</p>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
