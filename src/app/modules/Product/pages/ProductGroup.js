import React from "react";
import ProductGroupManagement from "../components/ProductGroupManagement";

function ProductGroup(props) {
  return (
    <ProductGroupManagement history={props.history}></ProductGroupManagement>
  );
}

export default ProductGroup;
