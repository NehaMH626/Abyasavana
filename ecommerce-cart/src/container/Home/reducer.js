import { GET_ERROR, ALL_COUSTUME, UPDATE_FILTER } from "../../constants/type";
const initialState = {
  getCostumeResponse: [],
  getUpdateFilter: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_COUSTUME:
      console.log("res", action.payload);
      return {
        ...state,
        getCostumeResponse: action.payload,
      };
    case UPDATE_FILTER:
      console.log("getUpdateFilter", action.payload);
      return {
        ...state,
        getUpdateFilter: action.payload,
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
