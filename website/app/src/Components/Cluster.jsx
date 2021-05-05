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

  if (isFullScreen) {
    return (
      <StyledRowContainer>
        <StyledClusterContainer>{imageCards}</StyledClusterContainer>
      </StyledRowContainer>
    );
  } else {
    return (
      <StyledRowContainer isOpen={isOpen}>
        <StyledColumnContainer>
          <StyledSelectedText>
            {numberOfSelectedImages} / {imageBlobArr.length}
          </StyledSelectedText>
          <StyledOpenButton
            onClick={() => setIsOpen((prev) => !prev)}
          >              
          {isOpen ? arrowOpen : arrowClosed}
          </StyledOpenButton>
        </StyledColumnContainer>
        <StyledClusterContainer isOpen={isOpen}>
          {imageCards}
        </StyledClusterContainer>
      </StyledRowContainer>
    );
  }
  return (
    <StyledRowContainer isOpen={isOpen}>
      <StyledColumnContainer>
        <StyledSelectedText>
          {numberOfSelectedImages} / {imageBlobArr.length}
        </StyledSelectedText>
        <StyledOpenButton
          onClick={() => setIsOpen((prev) => !prev)}
        ></StyledOpenButton>
      </StyledColumnContainer>
      <StyledClusterContainer isOpen={isOpen}>
        {imageCards}
      </StyledClusterContainer>
    </StyledRowContainer>
  );
}

const arrowOpen = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22.644" height="13.443" viewBox="0 0 22.644 13.443">
  <path id="Path_45" data-name="Path 45" d="M-4098,3547.375l10.261,10.261,10.261-10.261" transform="translate(4099.061 -3546.315)" fill="none" stroke="#fe8029" stroke-width="3"/>
</svg>

);

const arrowClosed = (
  <svg xmlns="http://www.w3.org/2000/svg" width="13.443" height="22.644" viewBox="0 0 13.443 22.644">
  <path id="Path_49" data-name="Path 49" d="M-4098,3547.375l10.261,10.261,10.261-10.261" transform="translate(-3546.315 -4076.417) rotate(-90)" fill="none" stroke="#fe8029" stroke-width="3"/>
</svg>
)

// styled components

const StyledClusterContainer = styled.div`
  display: flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  flex: 3;
  overflow-x: auto;
  overflow-y: hidden;
  object-fit: contain;
  height: fit-content;
  ::-webkit-scrollbar {
    scrollbar-width: thin;
  }


  ${(props) =>
    props.isOpen &&
    `
flex-wrap: wrap

`}
`;

const StyledColumnContainer = styled.div`
  min-width: 50px;
  display: flex;
  flex-direction: column;
`;

const StyledRowContainer = styled.div`
  background: #282828;
  display: flex;
  flex-direction: row;
  flex:3;
  width: 100%;
  height: fit-content;
  margin-bottom: 5px;
  overflow-y: auto;
  overflow-x: auto;

  ${(props) =>
    props.isOpen &&`

`}
`;

const StyledSelectedText = styled.text`
  color: white;
`;

const StyledOpenButton = styled.button`
  background-color: transparent;
  border: none;
  padding-top: 30px;
`;

const StyledHorizClusterSection = styled.section`
  .scrollMenu {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .clusterNum {
    position: -webkit-sticky;
    position: sticky;
    left: 0px;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
`;
