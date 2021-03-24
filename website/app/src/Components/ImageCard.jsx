import React, { useState } from "react";

function ImageCard(props) {
  const [isSelected, setIsSelected] = useState(false);

  function selectImage() {
    return setIsSelected((prev) => {
      return !prev;
    });
  }

  return (
    <div
      className={"card " + (isSelected ? "cardSelected" : "")}
      style={{ width: "18rem", margin: "3px" }}
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
