import React from "react";
import { IonLabel, IonIcon, IonItem, IonItemDivider } from "@ionic/react";
import { cloudUploadOutline } from "ionicons/icons";

import useGlobal from "../global/store";

const Reporter: React.FC = () => {
  const [state, actions] = useGlobal();

  const { sales } = state;
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

  if (sales.length > 0) {
    return (
      <>
        <IonItemDivider>
          <IonLabel>Reportar al final de día</IonLabel>
        </IonItemDivider>
        <IonItem onClick={report}>
          <IonIcon slot="start" icon={cloudUploadOutline} color="primary" />
          <IonLabel>
            <h2>Subir {sales.length} ventas</h2>
          </IonLabel>
        </IonItem>
      </>
    );
  } else {
    return <></>;
  }
};

export default Reporter;
