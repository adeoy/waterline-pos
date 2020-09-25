import React from "react";
import { IonCard, IonLabel } from "@ionic/react";
import { IProductType } from "../interfaces";
import { formatMoney } from "../utils";

import useGlobal from "../global/store";

interface IProps {
  item: IProductType;
  handleClick: (
    name: string,
    title: string,
    price: number,
    comision: number
  ) => void;
  currentName: string;
}

const activeStyle = {
  border: "2px solid #3dc2ff",
};

const ProductType: React.FC<IProps> = ({
  item: { name, title, image, price, comision },
  handleClick,
  currentName,
}) => {
  const state = useGlobal()[0];

  const { employee } = state;

  const calculateComision = (): number => {
    return employee.comision ? comision : 0;
  };

  return (
    <IonCard
      className="scroll-item"
      onClick={() => handleClick(name, title, price, comision)}
      style={name === currentName ? activeStyle : {}}
    >
      <img src={image} alt={title} width={80} />
      <IonLabel style={{ fontWeight: "bold" }} color="primary">
        {formatMoney(price + calculateComision())}
      </IonLabel>
    </IonCard>
  );
};

export default ProductType;
