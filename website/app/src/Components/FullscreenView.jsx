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
      className="container-fluid m-2"
      id="fullscreenView"
    >
      <img
        className=""
        src={
          storedClusters[clusterIndex].includes(selectedImageKey)
            ? selectedImageKey
            : storedClusters[clusterIndex][0]
        }
        alt=""
      />

      <VerticalCluster index={clusterIndex} setOffset={changeOffset} />

      <Cluster
        imageBlobArr={storedClusters[clusterIndex]}
        isFullScreen={true}
      />
      <h1>Info and shit</h1>
    </StyledFullscreenSection>
  );
}

const StyledFullscreenSection = styled.section`
  height: 90vh;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: 2.5fr 1fr;
  gap: 1em;

  img {
    height: 100%;
    object-fit: cover;
  }
`;
