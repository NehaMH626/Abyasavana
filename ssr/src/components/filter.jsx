import React, { useState, useEffect } from "react";
import "../css/filter.css";
import axios from "axios";
import apiConstants from "../constants/api";
import DisplayLaunches from "../components/displayLaunches";

function Filter() {
  // constants
  const [btnValue, setBtnValue] = useState([
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ]);
  const [boolBtnValue, setBoolBtnValue] = useState(["True", "False"]);
  const [successLaunchStatusHeading, setSuccessLaunchStatusHeading] = useState([
    "Successful Launch",
    "Successful Landing",
  ]);
  const [userSelectedVal, setUserSelectedVal] = useState({});
  const [successfulLaunchType, setSuccessfulLaunchType] = useState(true);
  const [successfulLandingType, setSuccessfulLandingType] = useState(true);
  const [activeYear, setActiveYear] = useState(8);
  const [launchActive, setLaunchActive] = useState(null);
  const [landingActive, setLandingActive] = useState(null);

  // onClick of launch year
  const yearSelected = (year, index) => {
    setActiveYear(index);
    axios
      .get(
        `${
          apiConstants.successfulLaunches + successfulLaunchType
        }&land_success=${successfulLandingType}&launch_year=${year}`
      )
      .then((res) => {
        setUserSelectedVal(res.data);
      });
  };

  // onClick of successful launch type
  const onSelectSuccessfulLaunchType = (type, index) => {
    setSuccessfulLaunchType(type);
    setLaunchActive(index);
    axios.get(apiConstants.successfulLaunches + type).then((res) => {
      setUserSelectedVal(res.data);
    });
  };

  // onClick of successful landing type
  const onSelectSuccessfulLandingType = (type, index) => {
    setSuccessfulLandingType(type);
    setLaunchActive(index);
    axios
      .get(
        `${
          apiConstants.successfulLaunches + successfulLaunchType
        }&land_success=${type}`
      )
      .then((res) => {
        setUserSelectedVal(res.data);
      });
  };
  const onSuccessStatusClick = (heading, type, index) => {
    console.log("heading", heading, type, index);
    heading === "Successful Launch"
      ? onSelectSuccessfulLaunchType(type, heading + index)
      : onSelectSuccessfulLandingType(type, heading + index);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <div className="card ">
            <div className="card-body">
              <h5>Filters</h5>
              <h6>Launch Year</h6>
              <div className="row">
                {btnValue.map((year, index) => {
                  return (
                    <div className="col-sm-6 col-md-6" key={index}>
                      <button
                        type="button"
                        className={`btn filterBtn ${
                          activeYear === index && "active"
                        }`}
                        onClick={() => yearSelected(year, index)}
                      >
                        {year}
                      </button>
                    </div>
                  );
                })}
              </div>

              {successLaunchStatusHeading.map((heading, headingIndex) => {
                return (
                  <div key={headingIndex}>
                    <h6>{heading}</h6>
                    <div className="row">
                      {boolBtnValue.map((boolVal, index) => {
                        return (
                          <div className="col-sm-6 col-md-6" key={index}>
                            <button
                              type="button"
                              className={`btn filterBtn ${
                                launchActive === heading + index && "active"
                              }`}
                              onClick={() =>
                                onSuccessStatusClick(
                                  heading,
                                  boolVal.toLowerCase(),
                                  index
                                )
                              }
                            >
                              {boolVal}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-9 col-sm-12">
          <DisplayLaunches userSelectedVal={userSelectedVal} />
        </div>
      </div>
    </div>
  );
}
export default Filter;
