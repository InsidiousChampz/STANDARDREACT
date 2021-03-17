import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as demo from "../app/modules/_Demo/_redux/demoRedux";
import * as employee from "../app/modules/_EmployeeDemo/_redux/employeeRedux";
import * as productAudit from "../app/modules/Product/_redux/productAuditRedux";
import * as productGroup from "../app/modules/Product/_redux/productGroupRedux";
import * as product from "../app/modules/Product/_redux/productRedux";
import * as orders from "../app/modules/Orders/_redux/ordersRedux";
import * as orderList from "../app/modules/Orders/_redux/orderListRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  demo: demo.reducer,
  employee: employee.reducer,
  productGroup: productGroup.reducer,
  productAudit: productAudit.reducer,
  product: product.reducer,
  orders: orders.reducer,
  orderList: orderList.reducer,
});
