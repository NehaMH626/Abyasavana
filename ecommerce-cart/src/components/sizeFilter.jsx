import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { updateFilter } from "../container/Home/action";

function SizeFilter(props) {
  console.log(props.getUpdateFilter, "propsNehuuuuuu");
  const [sizeList, setSizeList] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeCheckList, setSizeCheckList] = useState([]);
  //let sizeCheckList = [];

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

  const handleCheckList = (size, index) => {
    sizeCheckList[index]["checked"] = !sizeCheckList[index]["checked"];
    var selectedSizesVar = selectedSizes;
    if (sizeCheckList[index]["checked"] === true) {
      if (!selectedSizes.includes(size)) {
        selectedSizesVar.push(size);
      }
    } else if (sizeCheckList[index]["checked"] === false) {
      if (selectedSizes.indexOf(size) !== -1) {
        selectedSizesVar.splice(selectedSizes.indexOf(size), 1);
      }
    }
    setSelectedSizes(selectedSizes);
    props.updateFilter(selectedSizesVar);

    console.log("selectedSizes", selectedSizes, selectedSizesVar);

    console.log("checkList", sizeCheckList);
  };

  return (
    <div className="row">
      {selectedSizes}
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
