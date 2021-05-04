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
      className="container-fluid m-2"
      id="fullscreenView"
    >
      <VerticalCluster index={clusterIndex} setOffset={changeOffset} />
      <img
        className="bigImage"
        src={
          storedClusters[clusterIndex].includes(selectedImageKey)
            ? selectedImageKey
            : storedClusters[clusterIndex][0]
        }
        alt=""
      />

      <h1 className="bigImageInfo">Info and shit</h1>

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
  height: 100vh;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  grid-template-rows: 1.28fr 0.5fr 0.3fr;
  gap: 1em;

  .scrollMenuVertical {
    grid-area: 1 / 1 / 1 / 1;
  }
  .bigImage {
    grid-area: 1 / 2 / 3 / 4;
    height: 100%;
    object-fit: contain;
  }
  .acceptedCluster {
    grid-area: 3 / 1 / 3 / 2;
    height: 11rem;
    width: minMax(0%, 50%);
    overflow: hidden;
  }
  .scrollMenu {
    grid-area: 3 / 3 / 3 / 4;
    height: 11rem;
  }
  .bigImageInfo {
    grid-area: 2 / 1;
  }
  .card {
    width: 12em;
    height: 100%;
    background-color: transparent;
  }
  .card-middle-vert {
    height: 100%;
    width: 15rem;
  }
  .smallCluster {
    height: 100%;
    width: 12rem;
    margin: 1em 0em 1em 0em;
    background-color: transparent;
  }
  .bigCluster {
    height: 100%;
    width: 15rem;
    /* box-shadow: 0px 0px 10px 7px rgb(255, 152, 18); */
    outline-width: 0.13em;
    outline-color: white;
    outline-style: solid;
  }
  .image-overlay {
    color: white;
    padding-bottom: em;
  }
`;
