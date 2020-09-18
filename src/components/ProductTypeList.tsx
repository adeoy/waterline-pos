import React from "react";
import { IProductType } from "../interfaces";
import ProductType from "./ProductType";

interface IProps {
  data: IProductType[];
  handleClick: (name: string, title: string, price: number) => void;
  currentName: string;
}

const ProductTypeList: React.FC<IProps> = ({
  data,
  handleClick,
  currentName,
}) => (
  <div className="scroll-menu">
    {data.map((item) => (
      <ProductType
        key={item.name}
        item={item}
        handleClick={handleClick}
        currentName={currentName}
      />
    ))}
  </div>
);

export default ProductTypeList;
