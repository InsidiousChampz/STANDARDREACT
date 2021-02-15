// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";

const PRODUCT_URL = `${CONST.API_URL}`;

export const getAllAuditTypes = () => {
  return axios.get(`${PRODUCT_URL}ProductAuditType/productaudittypes`);
};
