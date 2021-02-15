// connect api
import axios from "axios";
import * as CONST from "../../../../Constants";
import { encodeURLWithParams } from "../../Common/components/ParamsEncode";

const PRODUCT_URL = `${CONST.API_URL}`;

export const addAuditProduct = (payload) => {
  return axios.post(`${PRODUCT_URL}ProductAudit/addproductaudit`, payload);
};

// export const addAuditProduct = (payload) => {
//   return axios({
//     method: "POST",
//     url: `${PRODUCT_URL}ProductAudit/addproductaudit`,
//     headers: {},
//     data: {
//       //This is the body part
//       name: payload.name,
//       stockCount: payload.stockCount,
//       AuditAmount: payload.AuditAmount,
//       AuditTotalAmount: payload.AuditTotalAmount,
//       Remark: payload.Remark,
//       ProductGroupId: payload.ProductGroupId,
//       ProductId: payload.ProductId,
//       ProductAuditTypeId: payload.ProductAuditTypeId,
//     },
//     params: {
//       //This is the param part
//       name: payload.name,
//       stockCount: payload.stockCount,
//       AuditAmount: payload.AuditAmount,
//       AuditTotalAmount: payload.AuditTotalAmount,
//       Remark: payload.Remark,
//       ProductGroupId: payload.ProductGroupId,
//       ProductId: payload.ProductId,
//       ProductAuditTypeId: payload.ProductAuditTypeId,
//     },
//   });
// };

export const getAllAuditProduct = () => {
  return axios.get(`${PRODUCT_URL}ProductAudit/productaudit`);
};

export const getAuditProduct = (id) => {
  return axios.get(`${PRODUCT_URL}ProductAudit/productAuditId/${id}`);
};

export const getAuditFilter = (
  page,
  recordsPerPage,
  Name,
  remark,
  createBy,
  productGroupId
) => {
  let payload = {
    page,
    recordsPerPage,
    Name,
    remark,
    createBy,
    productGroupId,
  };
  return axios.get(
    encodeURLWithParams(
      `${PRODUCT_URL}ProductAudit/productaudit/filter`,
      payload
    )
  );
};
