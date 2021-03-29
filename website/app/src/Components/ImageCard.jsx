import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";

function ImageCard(props) {
  const [isSelected, setIsSelected] = useState(false);

  const [totalNumSelectedImages, setTotalNumSelectedImages] = useContext(
    NavContext
  );

  function selectImage() {
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
    <div
      className={"card " + (isSelected ? "cardSelected" : "")}
      style={{ width: "18rem", margin: "5px" }}
    >
      <img
        key={props.blob}
        src={props.blob}
        alt=""
        className="card-img-top"
        onClick={selectImage}
      />
      {/* <div className="card-body">
        <button className="btn btn-danger">Select</button>
      </div> */}
    </div>
  );
}

export default ImageCard;
