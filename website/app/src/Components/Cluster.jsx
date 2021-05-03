import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Button from "./Button";


import styled from "styled-components";

// import tensorflow
const tf = require("@tensorflow/tfjs");

export default function Cluster(props) {
  const [numberOfSelectedImages, setNumberOfSelectedImages] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // const [clusterModel, setClusterModel] = useState();

  // useEffect(() => {
  //   const fetchModel = async () => {
  //     const model = await tf.loadLayersModel(
  //       "http://localhost:8000/model.json"
  //     );
  //     setClusterModel(model);
  //     console.log("Model: " + clusterModel);
  //   };
  //   fetchModel();
  // }, []);
  const imageCards = props.imageBlobArr.map((blob) => {
    return (
      <ImageCard
        key={blob}
        blob={blob}
        setNumberOfSelectedImages={setNumberOfSelectedImages}
      />
    );
  });

return(


  <StyledClusterContainer open={isOpen ? "true" : "false"}> 
  <StyledOpenButton 
            bg="blue" 
            onClick={()=>setIsOpen((prev)=>!prev)}>
            Blue button
      </StyledOpenButton>
    <StyledSelectedText>
    
      {numberOfSelectedImages} out of {props.imageBlobArr.lenght}
    </StyledSelectedText>
    {imageCards}
  </StyledClusterContainer>
) 

  return (
    <div
      className={
        "d-flex flex-row scrollMenu" + (props.isFullScreen ? "" : " m-2")
      }
    >
      {!props.isFullScreen && (
        <div className="d-flex flex-column">
          {/* Selected Text above images */}
          <div
            className="d-inline-flex flex-row clusterNum "
            style={{
              backgroundColor: "grey",
              borderRadius: "3px 3px 0px 0px",
              padding: "3px",
              width: "min-content",
            }}
          >
            <p className="" style={{ color: "white", display: "inline-block" }}>
              {numberOfSelectedImages} out of {props.imageBlobArr.length}
            </p>
          </div>
          {/* Horizontal Image Div */}
          <div
            className="d-flex flex-row"
            style={{
              backgroundColor: "white",
              borderRadius: "0px 3px 3px 3px",
            }}
          >
            {/* Creates all the image cards */}
            {imageCards}
          </div>
        </div>
      )}

      {props.isFullScreen && (
        <div
          className="d-flex flex-row"
          style={{
            backgroundColor: "grey",
            borderRadius: "0px 3px 3px 3px",
          }}
        >
          {/* Creates all the image cards */}
          {imageCards}
        </div>
      )}
    </div>
  );
}



const StyledClusterContainer = styled.div`
background: gray;
display: flex;
flex-wrap: ${props => props.open === "true" ? "wrap" : "nowrap"};
flex-direction: row;
overflow-x: auto;
overflow-y: auto;
margin-bottom: 10px;
img{
  width:300px;
  height:200px;
  object-fit: cover;
}

`
const StyledSelectedText = styled.text`
color: black;
`

const StyledOpenButton = styled.button`
color: ${props => props.bg === "black" ? "black" : "blue"}

`