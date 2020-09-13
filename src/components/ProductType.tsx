import React from "react";
import { IonCard, IonLabel } from "@ionic/react";
import { IProductType } from "../interfaces";
import { formatMoney } from "../utils";

interface IProps {
  item: IProductType;
  handleClick: (id: string, name: string, price: number) => void;
  currentId: string;
}

const activeStyle = {
    border: "2px solid #3dc2ff"
};

const ProductType: React.FC<IProps> = ({
  item: { id, name, image, price },
  handleClick,
  currentId,
}) => (
  <IonCard className="scroll-item" onClick={() => handleClick(id, name, price)} style={id === currentId ? activeStyle : {}}>
    <img src={image} alt={name} width={80} />
    <IonLabel style={{ fontWeight: "bold" }} color="primary">{formatMoney(price)}</IonLabel>
  </IonCard>
);

export default ProductType;
