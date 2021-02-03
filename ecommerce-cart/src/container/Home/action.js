import {
  GET_ERROR,
  ALL_COUSTUME,
  UPDATE_FILTER,
  UPDATE_CART,
  UPDATE_CART_ITEMS_SIZES,
} from "../../constants/type";
import axios from "axios";
import { constumeAPI } from "../../constants/util";

export const getConstume = () => (dispatch) => {
  axios
    .get(constumeAPI)
    .then((res) => {
      if (res.status) {
        dispatch({
          type: ALL_COUSTUME,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
        payload: err.data,
      });
    });
};

export const updateFilter = (selectedSizes) => ({
  type: UPDATE_FILTER,
  payload: selectedSizes,
});

export const updateCart = (cartItems) => ({
  type: UPDATE_CART,
  payload: cartItems,
});

export const updateCartItemsSizes = (cartItemsSizes) => ({
  type: UPDATE_CART_ITEMS_SIZES,
  payload: cartItemsSizes,
});
