import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cart, water, settingsOutline, cash, book } from "ionicons/icons";
import NewSale from "./pages/NewSale";
import DailySales from "./pages/DailySales";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import Guides from "./pages/Guides";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Toast from "./components/Toast";

import useGlobal from "./global/store";
import Alert from './components/Alert';

const App: React.FC = () => {
  const [state, actions] = useGlobal();

  const { toast, alert } = state;
  const { openToast, openAlert } = actions;

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/new-sale" component={NewSale} exact={true} />
            <Route path="/daily-sales" component={DailySales} exact={true} />
            <Route path="/stats" component={Stats} exact={true} />
            <Route path="/guides" component={Guides} exact={true} />
            <Route path="/settings" component={Settings} exact={true} />
            <Route
              path="/"
              render={() => <Redirect to="/new-sale" />}
              exact={true}
            />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/new-sale">
              <IonIcon icon={cart} />
              <IonLabel>Nueva venta</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/daily-sales">
              <IonIcon icon={water} />
              <IonLabel>Ventas</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/stats">
              <IonIcon icon={cash} />
              <IonLabel>Dineros</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/guides">
              <IonIcon icon={book} />
              <IonLabel>Guías</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" href="/settings">
              <IonIcon icon={settingsOutline} />
              <IonLabel>Ajustes</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>

        <Toast {...toast} onDidDismiss={() => openToast(false)} />
        <Alert {...alert} onDidDismiss={() => openAlert(false)} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
