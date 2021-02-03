import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { updateFilter } from "../container/Home/action";

function SizeFilter(props) {
  const [sizeList, setSizeList] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeCheckList, setSizeCheckList] = useState([]);

  useEffect(() => {
    let newSizeList = [];
    props.getCostumeResponse?.products?.forEach((sizeVal, index) => {
      return sizeVal["availableSizes"].forEach((element) => {
        newSizeList.push(element);
        newSizeList = [...new Set(newSizeList)];
        return newSizeList;
      });
    });
    setSizeList(newSizeList);
  }, [props.getCostumeResponse]);

  useEffect(() => {
    let sizeArr = [];
    sizeList.map((size, index) => {
      let sizeObj = {};
      sizeObj["size"] = size;
      sizeObj["checked"] = false;
      sizeArr.push(sizeObj);
    });
    setSizeCheckList(sizeArr);
  }, [sizeList]);

  //Select Sizes
  const handleCheckList = (size, index) => {
    var copy_sizeCheckList = [...sizeCheckList];
    copy_sizeCheckList[index]["checked"] = !copy_sizeCheckList[index][
      "checked"
    ];
    var copy_selectedSizes = [...selectedSizes];
    if (copy_sizeCheckList[index]["checked"] === true) {
      if (!copy_selectedSizes.includes(size)) {
        copy_selectedSizes.push(size);
      }
    } else if (copy_sizeCheckList[index]["checked"] === false) {
      if (copy_selectedSizes.indexOf(size) !== -1) {
        copy_selectedSizes.splice(copy_selectedSizes.indexOf(size), 1);
      }
    }
    setSelectedSizes(copy_selectedSizes);
    setSizeCheckList(copy_sizeCheckList);
    props.updateFilter(copy_selectedSizes);
  };

  return (
    <div className="row">
      {sizeList.map((size, index) => (
        <button
          key={index}
          type="checkbox"
          className={`btn sizeBtn ${
            sizeCheckList.length && sizeCheckList[index]["checked"] === true
              ? "active"
              : "hideActive"
          }`}
          onClick={() => handleCheckList(size, index)}
        >
          <label className="marginBottom-0" value={size}>
            {size}
          </label>
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    stringLiterals: store.stringLiterals,
    getCostumeResponse: store.reducer.getCostumeResponse,
    getUpdateFilter: store.reducer.getUpdateFilter,
  };
};

const mapsDispatchToProps = (dispatch) => ({
  updateFilter: (payload) => dispatch(updateFilter(payload)),
});
export default connect(mapStateToProps, mapsDispatchToProps)(SizeFilter);
