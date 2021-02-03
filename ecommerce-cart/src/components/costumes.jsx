import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getConstume,
  updateCart,
  updateCartItemsSizes,
} from "../container/Home/action";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import PageLoader from "../components/Loader";

function Costumes(props) {
  const [allCostumes, setAllCostumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [costumeData, setCostumeData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [uniqueCostumesData, setUniqueCostumesData] = useState("");
  const [cartItems, setCartItems] = useState(props.getUpdatedCart);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [cartItemSize, setcartItemSize] = useState(props.getCartItemsSizes);

  useEffect(() => {
    props.getConstume();
  }, []);

  useEffect(() => {
    if (props.getCostumeResponse?.products?.length) {
      setAllCostumes(props.getCostumeResponse.products);
      setCostumeData(props.getCostumeResponse.products);
    }
  }, [props.getCostumeResponse]);

  useEffect(() => {
    setLoading(false);
  }, [costumeData]);

  useEffect(() => {
    var filteredCostume = props.getUpdateFilter.map((selectedSize) => {
      return allCostumes.filter((size) => {
        return size["availableSizes"].find((element, index) => {
          return selectedSize === size["availableSizes"][index];
        });
      });
    });
    let flattenedFilteredCostume = filteredCostume.flat();
    let uniqueCostumes = [
      ...new Map(
        flattenedFilteredCostume.map((item) => [item.id, item])
      ).values(),
    ];
    setUniqueCostumesData(uniqueCostumes);
    uniqueCostumes.length === 0
      ? setCostumeData(allCostumes)
      : setCostumeData(uniqueCostumes);

    setFilteredSizes(props.getUpdateFilter);
  }, [props.getUpdateFilter]);

  // Select Order
  const changeOrder = (event) => {
    event.target.value !== "select"
      ? setSelectedOrder(event.target.value)
      : setSelectedOrder("");
  };

  useEffect(() => {
    let currentCostumeData = [...costumeData];
    var sortedCostumeData;
    if (selectedOrder === "LowToHigh") {
      sortedCostumeData = currentCostumeData.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedOrder === "HighToLow") {
      sortedCostumeData = currentCostumeData.sort((a, b) => {
        return b.price - a.price;
      });
    } else {
      uniqueCostumesData.length === 0
        ? (sortedCostumeData = [...allCostumes])
        : (sortedCostumeData = [...uniqueCostumesData]);
    }
    setCostumeData(sortedCostumeData);
  }, [selectedOrder]);

  //Add to mcart button click
  const handleAddToCart = (product, index) => {
    let cartArray = [...cartItems];
    let cartItemSizeArray = [...cartItemSize];
    let itemIndex = cartArray.findIndex((item, i) => {
      return item.id === product.id;
    });

    let cartItemSizeQtyObj = {};
    cartItemSizeQtyObj["size"] = product.availableSizes[0];
    cartItemSizeQtyObj["id"] = product.id;

    if (itemIndex < 0) {
      cartArray.push(product);
      cartItemSizeQtyObj["quantity"] = 1;
      cartItemSizeArray.push(cartItemSizeQtyObj);
    } else {
      cartItemSizeQtyObj["quantity"] = ++cartItemSizeArray[itemIndex][
        "quantity"
      ];
    }
    setcartItemSize(cartItemSizeArray);
    setCartItems(cartArray);
  };

  useEffect(() => {
    props.updateCartItemsSizes(cartItemSize);
  }, [cartItemSize]);

  useEffect(() => {
    props.updateCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    setCartItems(props.getUpdatedCart);
  }, [props.getUpdatedCart]);

  useEffect(() => {
    setcartItemSize(props.getCartItemsSizes);
  }, [props.getCartItemsSizes]);

  return (
    <div>
      <PageLoader loader={loading}>
        <div className="row">
          <p className="card-title textColor-grey textAlign-left">
            {costumeData?.length} Product(s) found
          </p>
          <div className="card-title textColor-grey row float-right">
            <p>Order by</p>
          </div>

          <select
            className="select"
            name="order"
            onChange={(event) => changeOrder(event)}
          >
            <option value="select">Select</option>
            <option value="HighToLow">Highest to Lowest</option>
            <option value="LowToHigh">Lowest to Highest</option>
          </select>
        </div>

        <div className="row">
          {costumeData?.length
            ? costumeData.map((product, index) => {
                return (
                  <Card
                    style={{ width: "18rem" }}
                    className="col-md-3"
                    key={index}
                  >
                    {product.isFreeShipping === true ? (
                      <div className="shipping-label">Free Shipping</div>
                    ) : (
                      <div className="empty-div"></div>
                    )}

                    <img
                      variant="top"
                      alt="NA"
                      src={
                        require(`../../src/static/products/${product.sku}_2.jpg`)
                          .default
                      }
                      className="costume-img"
                    />
                    <div className="card-container">
                      <Card.Text className="card-title">
                        {product.title}
                      </Card.Text>
                      <div className="borderBottom"></div>
                      <p className="fontSize-p textColor-grey margin-p">
                        {product.currencyFormat + " "}
                        <span className="fontSize-span textColor-Black">
                          {Math.floor(product.price)}
                        </span>
                        .
                        {(product.price + "").split(".")[1] !== undefined
                          ? (product.price + "").split(".")[1].length < 2
                            ? (product.price + "").split(".")[1] + "0"
                            : (product.price + "").split(".")[1]
                          : "00"}
                      </p>
                      <p className="fontSize-p">
                        or {product.installments} * ${" "}
                        {product.price / product.installments !== Infinity
                          ? (product.price / product.installments).toFixed(2)
                          : (product.price + "").split(".")[1].length < 2
                          ? product.price + "0"
                          : product.price}{" "}
                      </p>
                    </div>
                    <button
                      className="btn addBtn"
                      onClick={() => handleAddToCart(product, index)}
                    >
                      Add To Cart
                    </button>
                  </Card>
                );
              })
            : null}
        </div>
      </PageLoader>
    </div>
  );
}
// export default Costumes;

const mapStateToProps = (store) => {
  return {
    stringLiterals: store.stringLiterals,
    getCostumeResponse: store.reducer.getCostumeResponse,
    getUpdateFilter: store.reducer.getUpdateFilter,
    getUpdatedCart: store.reducer.getUpdatedCart,
    getCartItemsSizes: store.reducer.getCartItemsSizes,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getConstume: (payload) => dispatch(getConstume(payload)),
  updateCart: (payload) => dispatch(updateCart(payload)),
  updateCartItemsSizes: (payload) => dispatch(updateCartItemsSizes(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Costumes);
