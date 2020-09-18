import React from "react";
import { IonCard, IonLabel } from "@ionic/react";
import { IProductType } from "../interfaces";
import { formatMoney } from "../utils";

interface IProps {
  item: IProductType;
  handleClick: (name: string, title: string, price: number) => void;
  currentName: string;
}

const activeStyle = {
    border: "2px solid #3dc2ff"
};

const ProductType: React.FC<IProps> = ({
  item: { name, title, image, price },
  handleClick,
  currentName,
}) => (
  <IonCard className="scroll-item" onClick={() => handleClick(name, title, price)} style={name === currentName ? activeStyle : {}}>
    <img src={image} alt={title} width={80} />
    <IonLabel style={{ fontWeight: "bold" }} color="primary">{formatMoney(price)}</IonLabel>
  </IonCard>
);

export default ProductType;
