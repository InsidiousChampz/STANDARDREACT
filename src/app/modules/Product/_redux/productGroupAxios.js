// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCTGROUP_URL = `${CONST.API_URL}`;

export const addProductGroup_ = (payload) => {
  return axios.post(`${PRODUCTGROUP_URL}ProductGroup/addproductgroup`, payload);
};

export const addProductGroup = (nameData) => {
  return axios({
    method: "POST",
    url: `${PRODUCTGROUP_URL}ProductGroup/addproductgroup`,
    headers: {},
    data: {
      //heroId: heroId, // This is the body part
      name: nameData,
    },
    params: {
      //name: nameData,
    },
  });
};

export const editProductGroup = (payload, id) => {
  return axios.put(
    `${PRODUCTGROUP_URL}ProductGroup/updateproductgroup/${id}`,
    payload
  );
};

export const deleteProductGroup = (id) => {
  return axios.delete(
    `${PRODUCTGROUP_URL}ProductGroup/deleteproductgroup/${id}`
  );
};

export const getAllProductGroup = () => {
  return axios.get(`${CONST.API_URL}ProductGroup/productgroup`);
};

export const getProductGroup = (id) => {
  return axios.get(`${PRODUCTGROUP_URL}ProductGroup/productgroupId/${id}`);
};

export const getProductGroupFilter = (
  page,
  recordsPerPage,
  Name,
  CreateBy,
  Status
) => {
  let payload = {
    page,
    recordsPerPage,
    Name,
    CreateBy,
    Status,
  };
  return axios.get(
    encodeURLWithParams(
      `${PRODUCTGROUP_URL}ProductGroup/productgroup/filter`,
      payload
    )
  );
};
