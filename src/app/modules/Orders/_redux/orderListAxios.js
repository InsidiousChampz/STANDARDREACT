/* eslint-disable no-unused-vars */
// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.API_URL}`;

export const AddBothOrder = (payload) => {
  return axios.post(`${PRODUCT_URL}Orders/addbothorders`, payload);
};
