import React, { useEffect, useState, useContext } from "react";
import { NavContext } from "./NavContext";
import ImageCard from "./ImageCard";
import { all } from "@tensorflow/tfjs";


import styled from "styled-components";

// import tensorflow
const tf = require("@tensorflow/tfjs");

export default function Cluster({ imageBlobArr, isFullScreen }) {
  // Global variables
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;

  // local variables
  const [numberOfSelectedImages, setNumberOfSelectedImages] = useState(0);
  const { globalAcceptedImages } = useContext(NavContext);
  const [acceptedImagesKeys, setAcceptedImagesKeys] = globalAcceptedImages;
  const [isOpen, setIsOpen] = useState(false);

  // const [clusterModel, setClusterModel] = useState();

  const clustersArray = [];

  // checks if any of the images in the cluster are in the global selected images array and modify the counter state based on it
  useEffect(() => {
    imageBlobArr.map((blob) => {
      clustersArray.push(blob[0]);
      if (acceptedImagesKeys.includes(blob[0])) {
        setNumberOfSelectedImages((prev) => (prev += 1));
      }
    });

    if (
      !storedClusters.some((elements) =>
        elements.some((element) => clustersArray.includes(element))
      ) &&
      !isFullScreen
    ) {
      console.log("New Cluster added to the global array");
      // get a copy of the clusters array
      const copy = storedClusters;
      copy.push(clustersArray); // add the cluster array to the copy of the global array
      setStoredClusters(copy); // set the global array to the modified cluster array
    }

    // const fetchModel = async () => {
    //   const model = await tf.loadLayersModel(
    //     "http://localhost:8000/model.json"
    //   );
    //   setClusterModel(model);
    //   console.log("Model: " + clusterModel);
    // };
    // fetchModel();
  }, []);



  const imageCards = imageBlobArr.map((blob) => {
    return (
      <ImageCard
        key={blob}
        blob={isFullScreen ? blob : blob[0]}
        setNumberOfSelectedImages={setNumberOfSelectedImages}
      />
    );
  });

if(isFullScreen){
  return(<StyledRowContainer>
    <StyledClusterContainer>
      {imageCards}
    </StyledClusterContainer>
  </StyledRowContainer>);
} else{
  return(<StyledRowContainer isOpen={isOpen}>
    <StyledColumnContainer>
      <StyledSelectedText>
        {numberOfSelectedImages} / {imageBlobArr.length}
      </StyledSelectedText>
      <StyledOpenButton
        onClick={()=>setIsOpen((prev)=>!prev)}>
      </StyledOpenButton>
    </StyledColumnContainer>
    <StyledClusterContainer isOpen={isOpen}>
      {imageCards}
    </StyledClusterContainer>
  </StyledRowContainer>);
};
return(


  <StyledRowContainer isOpen={isOpen}>
    <StyledColumnContainer>
      <StyledSelectedText>
        {numberOfSelectedImages} / {imageBlobArr.length}
      </StyledSelectedText>
      <StyledOpenButton
        onClick={()=>setIsOpen((prev)=>!prev)}>
      </StyledOpenButton>
    </StyledColumnContainer>
    <StyledClusterContainer isOpen={isOpen}>
      {imageCards}
    </StyledClusterContainer>
  </StyledRowContainer>


  
  );
}



const StyledClusterContainer = styled.div`
display: flex!important;
flex-direction: row;
flex-wrap: nowrap;
overflow-x: auto;
overflow-y: hidden;

${props => props.isOpen && `
flex-wrap: wrap

`}
`

const StyledColumnContainer = styled.div`
min-width: 50px;
display: flex;
flex-direction: column;
`

const StyledRowContainer = styled.div`
background: #282828;
display: flex;
flex-direction: row;
width: 100%;
min-height: 140px;
max-height: 140px;
margin-bottom: 5px;
overflow-y: auto;
overflow-x: hidden;

${props => props.isOpen &&`
max-height: 300px;
min-height: 300px;
`}
`

const StyledSelectedText = styled.text`
color: white;
`

const StyledOpenButton = styled.button`
color: ${props => props.bg === "black" ? "black" : "blue"}

`