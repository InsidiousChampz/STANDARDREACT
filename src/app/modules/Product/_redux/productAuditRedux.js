require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  AUDIT_STORE_PRODUCT: "[AUDIT_STORE_PRODUCT] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  AuditStoreValues: {
    // id: 0,
    // name: "",
    // remark: "",
    // createBy: "",
    // productGroup: "",
    // productGroupId: "",
    //id: 0,
    createBy: "",
    productGroupId: 0,
    productId: 0,
    productAuditType: 0,
    auditAmount: 0,
    stockCount: 0,
    auditTotalAmount: 0,
    remark: "",
    name: "",
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUDIT_STORE_PRODUCT: {
      return { ...state, AuditStoreValues: action.payload };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  StoreValues: (payload) => ({
    type: actionTypes.AUDIT_STORE_PRODUCT,
    payload,
  }),
};
