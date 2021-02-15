import React from "react";
import ProductManagement from "../components/ProductManagement";

function Product(props) {
  return <ProductManagement history={props.history}></ProductManagement>;
}

export default Product;
