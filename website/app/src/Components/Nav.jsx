import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";

export default function Nav(props) {
  const [totalNumSelectedImages, setTotalNumSelectedImages] = useContext(
    NavContext
  );

  return (
    <h1>
      Accepted {totalNumSelectedImages} of {props.imageBlobArr.length}
    </h1>
  );
}
