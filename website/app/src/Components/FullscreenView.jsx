import { useContext, useEffect, useState } from "react";

// components
import VerticalCluster from "./VerticalCluster";
import Cluster from "./Cluster";
import { NavContext } from "./NavContext";

// styles
import styled from "styled-components";

export default function FullscreenView() {
  //states

  const {
    globalyStoredClusters,
    globalSelectedImageKey,
    globalAcceptedImages,
  } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;
  const [acceptedImageKeys, setAcceptedImageKeys] = globalAcceptedImages;

  // local state
  const [clusterIndex, setClusterIndex] = useState(
    storedClusters.findIndex((element) => element.includes(selectedImageKey))
  );

  const [acceptedClustersImages, setAcceptedClustersImages] = useState(
    storedClusters[clusterIndex].filter((element) => {
      return acceptedImageKeys.find((e) => e === element);
    })
  );
  const [nonAcceptedClustersImages, setNonAcceptedClustersImages] = useState(
    storedClusters[clusterIndex].filter((element) => {
      return !acceptedImageKeys.includes(element);
    })
  );

  function changeOffset(direction) {
    if (clusterIndex + direction >= storedClusters.length - 1) {
      return setClusterIndex(0);
    }
    if (clusterIndex + direction <= 0) {
      return setClusterIndex(storedClusters.length - 1);
    }
    setClusterIndex((prev) => (prev += direction));
  }

  useEffect(() => {
    // Set the accepted blob array bt filtering the current cluster array
    // then find the new instance of blob key that matches the accepted key
    setAcceptedClustersImages(
      storedClusters[clusterIndex].filter((element) => {
        return acceptedImageKeys.find((e) => e === element);
      })
    );

    // set the blob array to only include non accepted images
    // this is done by checking the current cluster array and filtering by excluding the acceptedKey blobs
    setNonAcceptedClustersImages(
      storedClusters[clusterIndex].filter((element) => {
        return !acceptedImageKeys.includes(element);
      })
    );
  }, [acceptedImageKeys, clusterIndex]);

  return (
    <StyledFullscreenSection
      className="grid-container-fluid m-2"
      id="fullscreenView"
    >
      <VerticalCluster index={clusterIndex} setOffset={changeOffset} />
      <div className="bigImageContainer grid-item">
        `<img
          className="bigImage"
          src={
            storedClusters[clusterIndex].includes(selectedImageKey)
              ? selectedImageKey
              : storedClusters[clusterIndex][0]
          }
          alt=""
        />`
        <ul className="bigImageMetadata">
          <li> ISO 1500</li>
          <li> 1/250</li>
          <li> f/5.6</li>
          <li> rejected-3.jpg </li>
        </ul>
      </div>
      <div className="bigImageInfo">
        <h1>
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="26.858" height="26.858" viewBox="0 0 26.858 26.858">
            <g id="Group_21" data-name="Group 21" transform="translate(-74.801 -74.811)">
              <path id="Path_38" data-name="Path 38" d="M168.271,155.12H156.923a1.8,1.8,0,0,0-1.8,1.8v11.349a1.8,1.8,0,0,0,1.8,1.8h11.349a1.8,1.8,0,0,0,1.8-1.8V156.922A1.8,1.8,0,0,0,168.271,155.12Zm.811,13.151a.815.815,0,0,1-.811.811H156.923a.815.815,0,0,1-.811-.811V156.922a.815.815,0,0,1,.811-.811h11.349a.815.815,0,0,1,.811.811Z" transform="translate(-74.366 -74.357)" fill="#b9b9b9"/>
              <path id="Path_41" data-name="Path 41" d="M101.146,86.615a.5.5,0,1,0,0-.992H98.168V82.375h2.977a.5.5,0,1,0,0-.992H98.127a3.472,3.472,0,0,0-3.039-3.039V75.326a.5.5,0,0,0-.992,0V78.3h-3.25V75.326a.5.5,0,1,0-.991-.038c0,.013,0,.026,0,.038V78.3H86.606V75.326a.5.5,0,1,0-.991-.038c0,.013,0,.026,0,.038V78.3H82.366V75.326a.5.5,0,0,0-.992,0v3.017a3.472,3.472,0,0,0-3.039,3.039h-3.02a.5.5,0,1,0,0,.992h2.977v3.25H75.316a.5.5,0,1,0,0,.992h2.977v3.249H75.316a.5.5,0,1,0,0,.992h2.977V94.1H75.316a.5.5,0,1,0-.038.991h3.057a3.471,3.471,0,0,0,3.039,3.039v3.018a.5.5,0,0,0,.992,0V98.178h3.249v2.977a.5.5,0,1,0,.991.038c0-.013,0-.026,0-.038V98.178h3.249v2.977a.5.5,0,1,0,.991.038c0-.013,0-.026,0-.038V98.178h3.249v2.977a.5.5,0,0,0,.992,0V98.136A3.471,3.471,0,0,0,98.125,95.1h3.019a.5.5,0,1,0,.038-.991H98.168V90.856h2.977a.5.5,0,1,0,0-.992H98.168V86.615Zm-3.968,8.073a2.5,2.5,0,0,1-2.5,2.5h-12.9a2.5,2.5,0,0,1-2.5-2.5v-12.9a2.5,2.5,0,0,1,2.5-2.5h12.9a2.5,2.5,0,0,1,2.5,2.5Z" transform="translate(0 0)" fill="#b9b9b9"/>
              <text id="AI" transform="translate(88.281 90.811)" fill="#b9b9b9" font-size="9" font-family="Helvetica" letter-spacing="-0.02em"><tspan x="-4.162" y="0">AI</tspan></text>
            </g>
          </svg>
          Auto Culling
        </h1>
        <ul className="aiList">
          <li> Confidence <span className="nothingness"> nothingnesssss </span> 38%</li>
          <li> Images accepted <span className="nothingness"> nothingns </span> 38%</li>
        </ul>
      </div>

      <p className="empty"></p>

      <Cluster
        className="acceptedCluster"
        imageBlobArr={acceptedClustersImages}
        isAcceptedCluster={true}
        isFullScreen={true}
      />

      <Cluster
        className="cluster"
        imageBlobArr={nonAcceptedClustersImages}
        isFullScreen={true}
        isAcceptedCluster={true}
      />
    </StyledFullscreenSection>
  );
}

const StyledFullscreenSection = styled.section`
  
    display: grid;
    background-color: #0D0D0D;
    margin: 0!important;
    grid-template-columns: 0.75fr 1.25fr 1fr 1fr;
    grid-template-rows: 1.9fr 0.8fr 0.8fr;
    gap: 3px 3px;
    grid-template-areas:
    "vertical-cluster bigImageContainer bigImageContainer bigImageContainer"
    "bigImageInfo bigImageContainer bigImageContainer bigImageContainer"
    "horizontal-cluster horizontal-cluster horizontal-cluster horizontal-cluster";


  .card {
    width: 12em;
    height: 100%;
    background-color: transparent;
  }

  .bigImageInfo {
    color: white;
    grid-area: bigImageInfo;
    background-color: #282828;
    margin-bottom: 2px;
  }
  


  .vertical-cluster { 
    grid-area: vertical-cluster;
    align-items: center;
    background-color: #282828;
  }
  
  .bigImageContainer{
    grid-area: bigImageContainer;
    //background-color: red;
    margin: 30px 30px 30px 200px;
  }

  .bigImage {
    height: 100%;
    object-fit: contain;
    //padding-left: 10px;
  }
  
  .bigImageMetadata{
    //background-color: green;
    top: 80%;
    padding-left: 15px;
    list-style-type: none;
    text-align: center;
    margin: 0;
  }
  
  .bigImageMetadata li{
    display: inline-block;
    font-size: 10px;
    color: #A8A8A8;
    padding: 0 20% 0 0;
    margin-top: 0;
  }

  .horizontal-cluster { 
    grid-area: horizontal-cluster;
    height: 11rem;
    padding-bottom: 10px;
    background-color: #282828;
    border-top: 2px solid #B9B9B9;
  }
  
  
  //other elements
  
  h1{
    font-size: 20px;
    font-weight: normal;
    padding-left: 10px;
    color: #B9B9B9
  }

  .icon{
    padding-right: 10px;
  }
  
  .aiList{
    list-style-type: none;
    color: #B9B9B9;
  }
  
  .nothingness{
    color: transparent;
  }

  //height: 100vh;
  //display: grid;
  //grid-template: 30rem 8rem auto / 20rem auto;
  //gap: 3px;
  //background-color: #0D0D0D;


  /* Vertical cluster*/
  //.vertical-cluster {
  //  grid-area: 2 / 1 / 2 / 1;
  //  align-items: center;
  //  background-color: #282828;
  //}

  /* Fullscreen image*/
  //.bigImage {
  //  grid-area: 1 / 2 / 3 / 3;
  //  height: 100%;
  //  object-fit: contain;
  //  align-items: right;
  //  padding: 30px;
  //}

  //.acceptedCluster {
  //  grid-area: 3 / 1 / 3 / 2;
  //  height: 11rem;
  //  width: minMax(0%, 50%);
  //  overflow: hidden;
  //}

  /* Meta data for displaye image*/
  //.bigImageInfo {
  //  color: white;
  //  grid-area: 2 / 1 / 2 / 1;
  //  background-color: #282828;
  //}
  /* Horizontal cluster*/
  //.horizontal-cluster {
  //  grid-area: 3 / 1 / 3 / 3;
  //  height: 11rem;
  //  padding-bottom: 10px;
  //}
`;
