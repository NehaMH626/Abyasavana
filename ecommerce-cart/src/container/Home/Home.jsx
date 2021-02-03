import Costumes from "../../components/costumes";
import SizeFilter from "../../components/sizeFilter";
import Cart from "../../components/cart";
import "../Home/home.css";
import { connect } from "react-redux";

function Home(props) {
  return (
    <div>
      <div className="container container-marginTop">
        <div className="row">
          <div className="col-md-2 col-sm-2">
            <h6>Sizes</h6>
            <SizeFilter />
          </div>
          <div className="col-md-9 col-sm-9">
            <Costumes />
          </div>
          <div className="col-md-1 col-sm-1">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    // stringLiterals: store.stringLiterals,
    // getCostumeResponse: store.reducer.getCostumeResponse,
    getUpdateFilter: store.reducer.getUpdateFilter,
  };
};
const mapDispatchToProps = (dispatch) => ({
  //getConstume: (payload) => dispatch(getConstume(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

//export default Home;
