require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

// action type บอกว่า Redux ตัวนี้ สามารถทำอะไรได้บ้าง
export const actionTypes = {
  ORDERLIST_DETAIL_VALUES: "[ORDERLIST_DETAIL_VALUES] Action",
  ORDERLIST_HEADER_VALUES: "[ORDERLIST_HEADER_VALUES] Action",
  RESET_ORDERLIST_DETAIL: "[RESET_ORDERLIST_DETAIL] Action",
  RESET_ORDERLIST_HEADER: "[RESET_ORDERLIST_HEADER] Action",
};

// state ค่าที่ถูกเก็บไว้
const initialState = {
  Header: {},
  Detail: [
    // {
    //   productId: 0,
    //   name: "",
    //   quantity: "",
    //   price: 0,
    //   totalprice: 0,
    //   orderId: "",
    // },
  ],
};

// reducer แต่ละ Action จะไป update State อย่างไร
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDERLIST_DETAIL_VALUES: {
      return { ...state, Detail: action.payload };
    }

    case actionTypes.ORDERLIST_HEADER_VALUES: {
      return { ...state, Header: action.payload };
    }

    case actionTypes.RESET_ORDERLIST_DETAIL: {
      return { ...state, Detail: initialState.Detail, currentPage: 0 };
    }
    case actionTypes.RESET_ORDERLIST_HEADER: {
      return { ...state, Header: initialState.Header, currentPage: 0 };
    }

    default:
      return state;
  }
};

//action เอาไว้เรียกจากข้างนอก เพื่อเปลี่ยน state
export const actions = {
  KeepDetailValues: (payload) => ({
    type: actionTypes.ORDERLIST_DETAIL_VALUES,
    payload,
  }),

  KeepHeaderValues: (payload) => ({
    type: actionTypes.ORDERLIST_HEADER_VALUES,
    payload,
  }),

  resetOrderListHeader: () => ({ type: actionTypes.RESET_ORDERLIST_HEADER }),
  resetOrderListDetail: () => ({ type: actionTypes.RESET_ORDERLIST_DETAIL }),
};
