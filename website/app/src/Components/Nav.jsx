import React, { useContext } from "react";
import { NavContext } from "./NavContext";

export default function Nav(props) {
  const [totalNumSelectedImages, setTotalNumSelectedImages] = useContext(
    NavContext
  );

  return (
    <nav
      style={{
        position: "sticky",
        top: "0px",
        zIndex: "100",
        backgroundColor: "#2d2d2d",
      }}
    >
      <h1>
        Accepted {totalNumSelectedImages} of {props.imageBlobArr.length}
      </h1>
    </nav>
  );
}
