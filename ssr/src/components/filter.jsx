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
  const [userSelectedVal, setUserSelectedVal] = useState([]);
  const [successfulLaunchType, setSuccessfulLaunchType] = useState(true);
  const [successfulLandingType, setSuccessfulLandingType] = useState(true);
  const [activeYear, setActiveYear] = useState(null);
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
  const onSelectSuccessfulLaunchType = (type) => {
    setSuccessfulLaunchType(type);
    setLaunchActive(type);
    axios.get(apiConstants.successfulLaunches + type).then((res) => {
      setUserSelectedVal(res.data);
    });
  };

  // onClick of successful landing type
  const onSelectSuccessfulLandingType = (type) => {
    setSuccessfulLandingType(type);
    setLandingActive(type);
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

              <h6>Successful Launch</h6>
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <button
                    type="button"
                    className={`btn filterBtn ${
                      launchActive === true && "active"
                    }`}
                    onClick={() => onSelectSuccessfulLaunchType(true)}
                  >
                    True
                  </button>
                </div>
                <div className="col-sm-6 col-md-6">
                  <button
                    type="button"
                    className={`btn filterBtn ${
                      launchActive === false && "active"
                    }`}
                    onClick={() => onSelectSuccessfulLaunchType(false)}
                  >
                    False
                  </button>
                </div>
              </div>
              <h6>Successful Landing</h6>
              <div className="row">
                <div className="col-sm-6 col-md-6">
                  <button
                    type="button"
                    className={`btn filterBtn ${
                      landingActive === true && "active"
                    }`}
                    onClick={() => onSelectSuccessfulLandingType(true)}
                  >
                    True
                  </button>
                </div>
                <div className="col-sm-6 col-md-6">
                  <button
                    type="button"
                    className={`btn filterBtn ${
                      landingActive === false && "active"
                    }`}
                    onClick={() => onSelectSuccessfulLandingType(false)}
                  >
                    False
                  </button>
                </div>
              </div>
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
