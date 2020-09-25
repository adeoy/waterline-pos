import React from "react";
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
  IonList,
} from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";

import useGlobal from "../global/store";

const Reporter: React.FC = () => {
  const [state, actions] = useGlobal();

  const { sales, version } = state;
  const { changeToast, changeAlert, reportData } = actions;

  const report = () => {
    if (sales.length === 0) {
      changeToast({
        isOpen: true,
        message: "Nada que reportar",
        color: "warning",
      });
    } else {
      changeAlert({
        isOpen: true,
        message: `¿Subir ${sales.length} ventas?`,
        onConfirm: () => {
          reportData();
        },
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reportar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Reportar</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem onClick={report}>
            <IonIcon slot="start" icon={cloudUploadOutline} color="primary" />
            <IonLabel>
              <h2>Subir {sales.length} ventas</h2>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonLabel>
          <p className="ion-text-center">Versión: {version}</p>
        </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Reporter;
