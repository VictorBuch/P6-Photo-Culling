import React, { useContext } from "react";
import { NavContext } from "./NavContext";

export default function Nav({imageBlobArr}) {
  const {numberOfSelectedImages} = useContext(NavContext)

  const [totalNumSelectedImages, setTotalNumSelectedImages] = numberOfSelectedImages;

  return (
    <nav id="appNav">
      <h1>
        Accepted {totalNumSelectedImages} of {imageBlobArr.length}
      </h1>
    </nav>
  );
}
