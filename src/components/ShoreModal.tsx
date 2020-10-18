import { IonContent, IonModal, IonButton } from "@ionic/react";
import React from "react";

interface IProps {
  title: string;
  steps: string[];
  show: boolean;
  setShow: (show: boolean) => void;
}

const ShoreModal: React.FC<IProps> = ({ title, steps, show, setShow }) => {
  return (
    <IonModal isOpen={show}>
      <IonContent fullscreen>
        <h3
          style={{ marginTop: "2rem", marginBottom: "2rem", color: "#3880ff" }}
          className="ion-text-center"
        >
          {title}
        </h3>

        {steps.map((step, i) => (
          <p style={{ marginLeft: "1rem", marginRight: "1rem" }} key={i}>
            {i + 1}. {step}
          </p>
        ))}
        <IonButton
          onClick={() => setShow(false)}
          expand="block"
          style={{
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          Cerrar
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ShoreModal;
