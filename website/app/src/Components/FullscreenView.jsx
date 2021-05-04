import { useContext, useEffect, useState } from "react";

// components
import VerticalCluster from "./VerticalCluster";
import Cluster from "./Cluster";
import { NavContext } from "./NavContext";

// styles
import styled from "styled-components";

export default function FullscreenView() {
  //states

  const { globalyStoredClusters, globalSelectedImageKey } = useContext(
    NavContext
  );
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;
  const [clusterIndex, setClusterIndex] = useState(0);

  function changeOffset(direction) {
    if (clusterIndex + direction >= storedClusters.length - 1) {
      return setClusterIndex(0);
    }
    if (clusterIndex + direction <= 0) {
      return setClusterIndex(storedClusters.length - 1);
    }
    console.log("Got to change offset bottom");
    setClusterIndex((prev) => (prev += direction));
  }

  useEffect(() => {
    setClusterIndex(
      storedClusters.findIndex((element) => element.includes(selectedImageKey))
    );
  }, []);

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
        imageBlobArr={storedClusters[clusterIndex]}
        isFullScreen={true}
      />
    </StyledFullscreenSection>
  );
}

const StyledFullscreenSection = styled.section`
  height: 90vh;
  display: grid;
  grid-template: 30rem 8rem auto / 20rem auto;
  gap: 1em;

  /* Vertical cluster*/
  .vertical-cluster {
    grid-area: 1 / 1 / 1 / 1;
    align-items: center;
  }

  /* Fullscreen image*/
  .bigImage {
    grid-area: 1 / 2 / 3 / 3;
    height: 100%;
    object-fit: contain;
    align-items: right;
  }

  /* Meta data for displaye image*/
  .bigImageInfo {
    color: white;
    grid-area: 2 / 1 / 2 / 1;
  }
  /* Horizontal cluster*/
  .horizontal-cluster {
    grid-area: 3 / 1 / 3 / 3;
    height: 11rem;
    padding-bottom: 10px;
  }

  .card {
    width: 12em;
    height: 100%;
    background-color: transparent;
  }
`;
