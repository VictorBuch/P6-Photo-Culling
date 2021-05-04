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
      <img
        className="bigImage grid-item"
        src={
          storedClusters[clusterIndex].includes(selectedImageKey)
            ? selectedImageKey
            : storedClusters[clusterIndex][0]
        }
        alt=""
      />
      <h1 className="bigImageInfo">Info and shit</h1>

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

  .card {
    width: 12em;
    height: 100%;
    background-color: transparent;
  }
  
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1.9fr 0.8fr 0.8fr;
    gap: 3px 3px;
    grid-template-areas:
    "vertical-cluster bigImage bigImage bigImage"
    "bigImageInfo bigImage bigImage bigImage"
    "horizontal-cluster horizontal-cluster horizontal-cluster horizontal-cluster";
    background-color: #0D0D0D;
  

  .bigImageInfo {
    color: white;
    grid-area: bigImageInfo;
    background-color: #282828;
  }

  .vertical-cluster { 
    grid-area: vertical-cluster;
    align-items: center;
    background-color: #282828;
  }
  

  .bigImage { 
    grid-area: bigImage;
    height: 100%;
    object-fit: contain;
    //align-items: right;
    padding: 30px;
  }

  .horizontal-cluster { 
    grid-area: horizontal-cluster;
    height: 11rem;
    padding-bottom: 10px;}
`;
