import Costumes from "../../components/costumes";
import SizeFilter from "../../components/sizeFilter";
import "../Home/home.css";
import { connect } from "react-redux";

function Home(props) {
  console.log(props.getUpdateFilter, "propsNehuuuuuu");
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-3">
            <h6>Sizes</h6>
            <SizeFilter />
          </div>
          <div className="col-md-9 col-sm-9">
            <h1>Costumes</h1>
            <Costumes />
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
