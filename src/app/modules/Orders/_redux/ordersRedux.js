require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  ORDER_SEARCH: "[ORDER_SEARCH] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  search: {
    dateFrom: dayjs(new Date()),
    dateTo: dayjs(new Date()),
  },
  order: {
    dateorder: "",
    itemcount: 0,
    total: 0,
    discount: 0,
    net: 0,
    ordernumber: "",
    status: "",
  },
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_SEARCH: {
      return { ...state, search: action.payload };
    }
    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  SeacrhOrder: (payload) => ({
    type: actionTypes.ORDER_SEARCH,
    payload,
  }),
};
