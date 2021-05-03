import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";

import styled from "styled-components";

export default function ImageCard(props) {
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

  return(
    <StyledImageCard>
      <img
        key={props.blob[0]}
        src={props.blob[0]}
        alt=""
        className={isSelected ? "cardSelected" : ""}
        onClick={selectImage}
      />
    </StyledImageCard>
  )

  return (
    <div className="card" style={{ width: "18rem", margin: "5px" }}>
      <img
        key={props.blob[0]}
        src={props.blob[0]}
        alt=""
        className={isSelected ? "cardSelected" : ""}
        onClick={selectImage}     
           
      />
      
    </div>
  );
}
//<div className="card-body">
//<p>{props.blob[1]} </p>
//</div>

const StyledImageCard = styled.div`
width: 300px;
margin: 5px;
object-fit: contain;

`

