import React from "react";
import { IonLabel, IonIcon, IonItem, IonItemDivider } from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";

import useGlobal from "../global/store";

const RestartComision: React.FC = () => {
  const [state, actions] = useGlobal();

  const { employee } = state;
  const { changeAlert, restartComision } = actions;

  const restart = () => {
    changeAlert({
      isOpen: true,
      message: `¿Reiniciar comisión?`,
      onConfirm: () => {
        restartComision();
      },
    });
  };

  if (employee.comision) {
    return (
      <>
        <IonItemDivider>
          <IonLabel>Ajustes</IonLabel>
        </IonItemDivider>
        <IonItem onClick={restart}>
          <IonIcon slot="start" icon={trashBinOutline} color="primary" />
          <IonLabel>
            <h2>Reiniciar pago semanal</h2>
          </IonLabel>
        </IonItem>
      </>
    );
  } else {
    return <></>;
  }
};

export default RestartComision;
