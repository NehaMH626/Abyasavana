import {
  GET_ERROR,
  ALL_COUSTUME,
  UPDATE_FILTER,
  UPDATE_CART,
  UPDATE_CART_ITEMS_SIZES,
} from "../../constants/type";
const initialState = {
  getCostumeResponse: [],
  getUpdateFilter: [],
  getUpdatedCart: [],
  getCartItemsSizes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_COUSTUME:
      //console.log("res", action.payload);
      return {
        ...state,
        getCostumeResponse: action.payload,
      };
    case UPDATE_FILTER:
      //console.log("getUpdateFilter", action.payload);
      return {
        ...state,
        getUpdateFilter: action.payload,
      };
    case UPDATE_CART:
      //console.log("update cart", action.payload);
      return {
        ...state,
        getUpdatedCart: action.payload,
      };
    case UPDATE_CART_ITEMS_SIZES:
      //console.log("update cart sizes", action.payload);
      return {
        ...state,
        getCartItemsSizes: action.payload,
      };
    case GET_ERROR:
      return {
        ...state,
        getError: action.payload,
      };
    default:
      return state;
  }
}
