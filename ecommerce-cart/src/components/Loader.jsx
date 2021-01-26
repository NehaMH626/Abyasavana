import React from "react";
import LoadingOverlay from "react-loading-overlay";

//Loader to display till page is loaded with data
const PageLoader = ({ loader, color, children, gridLoader }) => {
  return (
    <LoadingOverlay
      active={loader}
      spinner
      text="Loading..."
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(255, 255, 255, 0.96)",
          borderRadius: "40px",
          // height:'30px'
        }),
        spinner: (base) => ({
          ...base,
          top: "50%",
          transform: "translateY(-50%)",
          left: "-5%",
          height: "35px",
          width: "100%",
          position: "fixed",
          "& svg circle": {
            stroke: color ? color : "#44677b",
          },
        }),
        content: (base) => ({
          ...base,
          color: color ? color : "#44677b",
          top: "50%",
          transform: "translateY(-50%)",
          width: "100%",
          position: gridLoader ? "absolute" : "fixed",
          marginTop: gridLoader ? "auto" : "20px",
          left: 0,
        }),
      }}
    >
      {children}
    </LoadingOverlay>
  );
};

export default PageLoader;
