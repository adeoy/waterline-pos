import React from "react";
import { IProductType } from "../interfaces";
import ProductType from "./ProductType";

interface IProps {
    data: IProductType[];
    handleClick: (id: string, name: string, price:number) => void;
    currentId: string;
}

const ProductTypeList: React.FC<IProps> = ({ data, handleClick, currentId }) => (
  <div className="scroll-menu">
    {data.map(item => (
      <ProductType key={item.id} item={item} handleClick={handleClick} currentId={currentId} />
    ))}
  </div>
);

export default ProductTypeList;
