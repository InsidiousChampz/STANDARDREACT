require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  UPDATE_CURRENT_PRODUCTGROUPS: "[UPDATE_CURRENT_PRODUCTGROUPS] Action",
  CHANGE_PRODUCT_VALUE: "[CHANGE ATTRIBUTE VALUE] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  ProductGroupsUpdateValue: {
    id: 0,
    name: "",
    status: true,
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_PRODUCTGROUPS: {
      return { ...state, ProductGroupsUpdateValue: action.payload };
    }

    case actionTypes.CHANGE_PRODUCT_VALUE:
      return { ...state, ProductGroupsUpdateValue: action.payload };

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  updateProductGroups: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCTGROUPS,
    payload,
  }),
  changeAttrValue: (payload) => ({
    type: actionTypes.CHANGE_PRODUCT_VALUE,
    payload,
  }),
};
