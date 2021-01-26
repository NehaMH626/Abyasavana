import { GET_ERROR, ALL_COUSTUME, UPDATE_FILTER } from "../../constants/type";
import axios from "axios";
import { constumeAPI } from "../../constants/util";

export const getConstume = () => (dispatch) => {
  axios
    .get(constumeAPI)
    .then((res) => {
      if (res.status) {
        console.log("res", res);
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
