import axios from "axios";
import React, { useEffect, useState } from "react";
import apiConstants from "../constants/api";
import "../css/displayLaunches.css";

function DisplayLaunches(props) {
  const [launchData, setLaunchData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(apiConstants.successfulLaunchAndLandingYear + 2014)
      .then((res) => {
        setLaunchData(res.data);
      });
  }, []);

  useEffect(() => {
    setLaunchData(props.userSelectedVal);

    if (!props.userSelectedVal?.length) {
      setLoading(false);
    }
  }, [props.userSelectedVal]);

  return (
    <div className="row">
      {launchData.length ? (
        launchData.map((flight, index) => {
          return (
            <div className="col-md-3 col-sm-12" key={index}>
              <div className="card card-marginLeftRight">
                <img
                  className="card-img-top card-image "
                  src={flight["links"]["flickr_images"][0]}
                />
                <div className="card-body">
                  <p className="p-textHeading p-headingColor ">
                    {flight["mission_name"]} #{flight["flight_number"]}
                  </p>
                  <p className="p-textHeading">Mission IDs:</p>
                  <ul>
                    {flight["mission_id"].map((id, index) => {
                      return <li>{id}</li>;
                    })}
                  </ul>
                  <p className="p-textHeading">
                    Launch Year:{" "}
                    <span className="span-text">{flight["launch_year"]}</span>
                  </p>
                  <p className="p-textHeading">
                    Successful Launch:{" "}
                    <span className="span-text">
                      {flight.launch_success.toString()}
                    </span>
                  </p>
                  <p className="p-textHeading">
                    Successful Landing: <span className="span-text">N/A</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="marginAuto">
          <h5>{loading === true ? "Loading" : "No Data To Display"}</h5>
        </div>
      )}
    </div>
  );
}
export default DisplayLaunches;
