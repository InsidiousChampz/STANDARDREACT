require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  UPDATE_CURRENT_PRODUCT: "[UPDATE_CURRENT_PRODUCT] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  ProductUpdateValues: {
    id: 0,
    name: "",
    price: "",
    stockCount: "",
    productGroup: "",
    productGroupId: "",
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_PRODUCT: {
      return { ...state, ProductUpdateValues: action.payload };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  updateProduct: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCT,
    payload,
  }),
};
