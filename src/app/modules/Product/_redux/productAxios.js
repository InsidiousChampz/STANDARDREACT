// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.API_URL}`;

// export const addProduct = (payload) => {
//   return axios.post(`${PRODUCT_URL}Product/addproduct`, payload);
// };

export const addProduct = (payload) => {
  return axios({
    method: "POST",
    url: `${PRODUCT_URL}Product/addproduct`,
    headers: {},
    data: {
      //This is the body part
      name: payload.name,
      price: payload.price,
      stockCount: payload.stockCount,
      productGroupId: payload.productGroupId,
    },
    params: {
      // name: payload.name,
      // price: payload.price,
      // stockCount: payload.stockCount,
      // productGroupId: payload.productGroupId,
    },
  });
};

export const editProduct = (payload, id) => {
  return axios.put(`${PRODUCT_URL}Product/updateproduct/${id}`, payload);
};

export const deleteProduct = (id) => {
  return axios.delete(`${PRODUCT_URL}Product/deleteproduct/${id}`);
};

export const getAllProduct = () => {
  return axios.get(`${CONST.API_URL}Product/product`);
};

export const getProduct = (id) => {
  return axios.get(`${PRODUCT_URL}Product/productId/${id}`);
};

export const getProductByGroup = (id) => {
  return axios.get(`${PRODUCT_URL}Product/ProductGroupId/${id}`);
};

export const getProductFilter = (
  page,
  recordsPerPage,
  Name,
  Price,
  stockCount,
  productGroupId
) => {
  let payload = {
    page,
    recordsPerPage,
    Name,
    Price,
    stockCount,
    productGroupId,
  };
  return axios.get(
    encodeURLWithParams(`${PRODUCT_URL}Product/product/filter`, payload)
  );
};
