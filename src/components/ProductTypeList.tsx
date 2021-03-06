import React from "react";
import { IProductType } from "../interfaces";
import ProductType from "./ProductType";

interface IProps {
  data: IProductType[];
  handleClick: (name: string, title: string, price: number, comision: number) => void;
  currentName: string;
  units: number;
}

const ProductTypeList: React.FC<IProps> = ({
  data,
  handleClick,
  currentName,
  units,
}) => (
  <div className="scroll-menu">
    {data.map((item) => (
      <ProductType
        key={item.name}
        item={item}
        handleClick={handleClick}
        currentName={currentName}
        units={units}
      />
    ))}
  </div>
);

export default ProductTypeList;
