import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";

export default function ImageCard(props) {
  const [isSelected, setIsSelected] = useState(false);

  const [totalNumSelectedImages, setTotalNumSelectedImages] = useContext(
    NavContext
  );

  function selectImage(e) {
    if (isSelected) {
      props.setNumberOfSelectedImages((prev) => prev - 1);
      setTotalNumSelectedImages((prev) => prev - 1);
    } else {
      props.setNumberOfSelectedImages((prev) => prev + 1);
      setTotalNumSelectedImages((prev) => prev + 1);
    }
    return setIsSelected(!isSelected);
  }

  return (
    <div className="card" style={{ width: "18rem", margin: "5px" }}>
      <img
        key={props.blob}
        src={props.blob}
        alt=""
        className={isSelected ? "cardSelected" : ""}
        onClick={selectImage}
      />
      {/* <div className="card-body">
        <p>10/10</p>
      </div> */}
    </div>
  );
}


