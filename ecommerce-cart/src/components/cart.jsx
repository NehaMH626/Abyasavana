import { useState, useEffect } from "react";
import "../css/sidenavbar.css";
import { connect } from "react-redux";
import { updateCart, updateCartItemsSizes } from "../container/Home/action";

function Cart(props) {
  const [sidebarOpen, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [activeRow, setActiveRow] = useState("");
  const [cartItemsSize, setCartItemsSize] = useState([]);
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    if (props.getUpdatedCart?.length) {
      setCartItems(props.getUpdatedCart);
    }
  }, [props.getUpdatedCart]);

  useEffect(() => {
    if (props.getCartItemsSizes?.length) {
      setCartItemsSize(props.getCartItemsSizes);
    }
  }, [props.getCartItemsSizes]);

  useEffect(() => {
    let allCartItems = [...cartItems];
    let cartItemQty = [...cartItemsSize];
    let cartTotalValue = allCartItems.reduce((a, b, index) => {
      return a + b.price * cartItemQty[index]["quantity"];
    }, 0);
    setCartTotal(cartTotalValue);
  }, [cartItems, cartItemsSize]);

  // Open sideNavBar
  const openNavBar = () => {
    setOpen(true);
  };

  // Close SideNavBar
  const closeNavBar = () => {
    setOpen(false);
  };

  //Mouse events handling
  const handleDeleteHover = (index) => {
    setActiveRow(index);
    setIsHovered(!isHovered);
  };

  //Delete Cart Item
  const handleDeleteCartItem = (productID, index) => {
    let allCartItems = [...cartItems];
    let allCartItemsSize = [...cartItemsSize];
    if (index > -1) {
      allCartItems.splice(index, 1);
      allCartItemsSize.splice(index, 1);
    }
    setCartItems(allCartItems);
    setCartItemsSize(allCartItemsSize);
    setActiveRow("");
    setIsHovered(false);
  };

  //Add Cart Item Quantity
  const addQuantity = (index) => {
    let cartItemsQuantity = [...cartItemsSize];
    cartItemsQuantity[index]["quantity"] = ++cartItemsQuantity[index][
      "quantity"
    ];
    setCartItemsSize(cartItemsQuantity);
  };

  //Delete Cart Item Quantity
  const deleteQuantity = (index) => {
    let cartItemsQuantity = [...cartItemsSize];
    if (cartItemsQuantity[index]["quantity"] > 1) {
      cartItemsQuantity[index]["quantity"] = --cartItemsQuantity[index][
        "quantity"
      ];
    }
    setCartItemsSize(cartItemsQuantity);
  };

  useEffect(() => {
    props.updateCart(cartItems);
    setActiveRow("");
    setIsHovered(false);
  }, [cartItems]);

  useEffect(() => {
    props.updateCartItemsSizes(cartItemsSize);
    let totalCartQtyArray = [...cartItemsSize];
    let totalCartQty = totalCartQtyArray.reduce((a, b) => {
      return a + b.quantity;
    }, 0);
    setTotalQty(totalCartQty);
  }, [cartItemsSize]);

  useEffect(() => {
    if (isHovered === false) {
      setActiveRow("");
    }
  }, [isHovered]);
  // console.log("cart items", props.getUpdatedCart, props.getCartItemsSizes);
  // console.log("................", isHovered, activeRow);
  return (
    <div>
      <button className="btn cartBtn btn-lg" onClick={() => openNavBar()}>
        <i
          data-count={totalQty}
          className="fa fa-shopping-cart i i-font notificationBadge"
          aria-hidden="true"
        ></i>
      </button>
      <div
        id="mySidenav"
        className={`sidenav ${
          sidebarOpen === true ? "sidenavOpen" : "sidenavClose"
        }`}
        style={sidebarOpen ? { width: "350px" } : { width: "0px" }}
      >
        <button className="closebtn" onClick={() => closeNavBar()}>
          <i className="fa fa-times "></i>
        </button>
        <div className=" cartIcon">
          <i
            data-count={totalQty}
            className="fa fa-shopping-cart i i-size notificationBadge"
            aria-hidden="true"
          ></i>
        </div>
        <div className="costumeContainer style-scroll">
          {cartItems.length ? (
            cartItems.map((product, index) => {
              return (
                <div key={index}>
                  <div
                    className={`row cartFontSize cartRowContainer ${
                      activeRow === index && isHovered
                        ? "cartRowHover"
                        : "cartRowHoverFalse"
                    }`}
                  >
                    <div className="col-md-2">
                      <img
                        variant="top"
                        alt="NA"
                        className="cartImg"
                        src={
                          require(`../../src/static/products/${product.sku}_2.jpg`)
                            .default
                        }
                      />
                    </div>
                    <div className="col-md-10 cartContainer">
                      <button
                        className="deleteCartItem-btn"
                        onMouseEnter={() => handleDeleteHover(index)}
                        onMouseLeave={() => handleDeleteHover(index)}
                        onClick={() => handleDeleteCartItem(product.id, index)}
                      >
                        <i className="fa fa-times cartItemDeleteIcon"></i>
                      </button>

                      <div className="row">
                        <div className="col-md-9 cartContainer">
                          <div className="verticalAlign">
                            <p
                              className={`cartTitleColor textAlign-Left marginBottom-0 ${
                                activeRow === index && isHovered === true
                                  ? "lineThrough"
                                  : ""
                              }`}
                            >
                              {product.title}
                            </p>
                            <p
                              className={`marginBottom-0 textColor-grey textAlign-Left ${
                                activeRow === index && isHovered === true
                                  ? "lineThrough"
                                  : ""
                              }`}
                            >
                              {cartItemsSize[index]["size"]} | {product.style}
                            </p>
                            <p
                              className={`textColor-grey textAlign-Left ${
                                activeRow === index && isHovered === true
                                  ? "lineThrough"
                                  : ""
                              }`}
                            >
                              Quantity :{cartItemsSize[index]["quantity"]}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-3 cartPrizeColor cartContainer">
                          <div className="verticalAlign">
                            <p
                              className={`productPrice-p ${
                                activeRow === index && isHovered === true
                                  ? "lineThrough"
                                  : ""
                              }`}
                            >
                              {product.currencyFormat +
                                " " +
                                Math.floor(product.price) +
                                "."}
                              {(product.price + "").split(".")[1] !== undefined
                                ? (product.price + "").split(".")[1].length < 2
                                  ? (product.price + "").split(".")[1] + "0"
                                  : (product.price + "").split(".")[1]
                                : "00"}
                            </p>
                            <div className="row ">
                              <button
                                className={`quantityBtn ${
                                  cartItemsSize[index]["quantity"] < 2
                                    ? "disabled"
                                    : "active"
                                }`}
                                disabled={cartItemsSize[index]["quantity"] < 2}
                                onClick={() => deleteQuantity(index)}
                              >
                                <i
                                  className="fa fa-minus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <button
                                className="quantityBtn"
                                onClick={() => addQuantity(index)}
                              >
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p className="textColor-lightGrey">
                Add some products to the cart <br></br>:)
              </p>
            </div>
          )}
        </div>
        <div className="row cartTotalContainer">
          <div className="col-md-6 cartContainer">
            <div className="verticalAlign top-35">
              <p className="textColor-grey font-1rem">SUBTOTAL</p>
            </div>
          </div>
          <div className="col-md-6">
            <p className="textAlign-Right cartPrizeColor marginBottom-0 ">
              ${Math.floor(cartTotal) + "."}
              {(cartTotal + "").split(".")[1] !== undefined
                ? (cartTotal + "").split(".")[1].length < 2
                  ? (cartTotal + "").split(".")[1] + "0"
                  : (cartTotal + "").split(".")[1]
                : "00"}
            </p>
            {cartItems.length > 0 ? (
              <p className="textColor-grey fontEMI">
                OR UP TO {cartItems[cartItems.length - 1]["installments"]} *{" "}
                {(
                  cartTotal / cartItems[cartItems.length - 1]["installments"]
                ).toFixed(2)}
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div className="marginAuto marginBottomCheckoutBtn">
            <button className="btn checkoutBtn">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    stringLiterals: store.stringLiterals,
    // getCostumeResponse: store.reducer.getCostumeResponse,
    // getUpdateFilter: store.reducer.getUpdateFilter,
    getUpdatedCart: store.reducer.getUpdatedCart,
    getCartItemsSizes: store.reducer.getCartItemsSizes,
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateCart: (payload) => dispatch(updateCart(payload)),
  updateCartItemsSizes: (payload) => dispatch(updateCartItemsSizes(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
