import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonIcon,
} from "@ionic/react";
import { readerOutline } from "ionicons/icons";
import React, { useState } from "react";
import ShoreModal from "../components/ShoreModal";
import { guides } from "../data/index";

const Guides: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [shoreTitle, setShoreTitle] = useState<string>("");
  const [shoreSteps, setShoreSteps] = useState<string[]>([]);

  const showShore = (title: string, steps: string[]) => {
    setShoreTitle(title);
    setShoreSteps(steps);
    setShowModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Guías</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {guides.map((guide, i) => (
            <div key={i}>
              <IonItemDivider>
                <IonLabel>{guide.title}</IonLabel>
              </IonItemDivider>
              {guide.shores.map((shore, j) => (
                <IonItem
                  key={j}
                  lines="none"
                  button
                  onClick={() => showShore(shore.title, shore.steps)}
                >
                  <IonIcon icon={readerOutline} slot="start" />
                  <IonLabel>{shore.title}</IonLabel>
                </IonItem>
              ))}
            </div>
          ))}
        </IonList>
        <ShoreModal
          show={showModal}
          setShow={setShowModal}
          title={shoreTitle}
          steps={shoreSteps}
        />
      </IonContent>
    </IonPage>
  );
};

export default Guides;
