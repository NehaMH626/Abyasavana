import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getConstume } from "../container/Home/action";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import PageLoader from "../components/Loader";

function Costumes(props) {
  const [allCostumes, setAllCostumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [costumeData, setCostumeData] = useState([]);

  useEffect(() => {
    console.log("Here...");
    props.getConstume();
  }, []);

  useEffect(() => {
    if (props.getCostumeResponse?.products?.length) {
      setAllCostumes(props.getCostumeResponse.products);
      setCostumeData(props.getCostumeResponse.products);
      console.log("response on mount >>>>", props.getCostumeResponse);
    }
  }, [props.getCostumeResponse]);

  useEffect(() => {
    setLoading(false);
    console.log("......allCostumes", costumeData);
  }, [costumeData]);

  useEffect(() => {
    console.log("updated filter111111111111111111111", props.getUpdateFilter);
    // var filteredCostume = props.getUpdateFilter.filter(function (selectedSize) {
    //   return allCostumes.find(function (size) {
    //     size["availableSizes"].forEach((element) => {
    //       return selectedSize === element;
    //     });
    //   });
    // });
    // console.log("filteredCostume", filteredCostume);
  }, [props]);

  console.log("response on mount", props.getUpdateFilter);

  return (
    <div>
      <PageLoader loader={loading}>
        <div className="row">
          {costumeData?.length
            ? costumeData.map((product, index) => {
                return (
                  <Card
                    style={{ width: "18rem" }}
                    className="col-md-3"
                    key={index}
                  >
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>{product.title}</Card.Text>
                      <div className="borderBottom"></div>
                      <p className="fontSize-p textColor-Black">
                        {product.currencyFormat}
                        <span className="fontSize-span textColor-Black">
                          {product.price}
                        </span>
                      </p>
                      <p className="fontSize-p">
                        or {product.installments} *{" "}
                        {product.price / product.installments}{" "}
                      </p>
                      <Button variant="primary">Add To Cart</Button>
                    </Card.Body>
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
  };
};
const mapDispatchToProps = (dispatch) => ({
  getConstume: (payload) => dispatch(getConstume(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Costumes);
