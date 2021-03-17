/* eslint-disable no-unused-vars */
// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.API_URL}`;

export const addOrder = (payload) => {
  return axios.post(`${PRODUCT_URL}Orders/addorder`, payload);
};

export const getAllOrder = () => {
  return axios.get(`${CONST.API_URL}Orders/orders`);
};

export const getOrderbyId = (id) => {
  return axios.get(`${CONST.API_URL}Orders/orders/${id}`);
};

export const updateStatusOrderById = (payload, id) => {
  return axios.put(
    `${CONST.API_URL}Orders/updateorderstatusbyid/${id}`,
    payload
  );
};

export const getOrderFilter = (
  page,
  recordsPerPage,
  dateorder,
  itemcount,
  total,
  discount,
  net,
  ordernumber,
  status
) => {
  let payload = {
    page,
    recordsPerPage,
    dateorder,
    itemcount,
    total,
    discount,
    net,
    ordernumber,
    status,
  };
  return axios.get(
    encodeURLWithParams(`${PRODUCT_URL}Orders/orders/filter`, payload)
  );
};

export const GetOrderWithFilterByDate = (
  dateFrom,
  dateTo,
  page,
  recordsPerPage
) => {
  let payload = {
    dateFrom,
    dateTo,
    page,
    recordsPerPage,
  };
  return axios.get(
    encodeURLWithParams(`${PRODUCT_URL}Orders/orders/filterbydate`, payload)
  );
};
