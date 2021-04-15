import React, { useContext } from "react";
import { NavContext } from "./NavContext";

export default function Nav(props) {
  const [totalNumSelectedImages, setTotalNumSelectedImages] = useContext(
    NavContext
  );

  return (
    <nav id="appNav">
      <h1>
        Accepted {totalNumSelectedImages} of {props.imageBlobArr.length}
      </h1>
    </nav>
  );
}
