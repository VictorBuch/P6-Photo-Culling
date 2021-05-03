import { useContext, useEffect, useState } from "react";

// components
import VerticalCluster from "./VerticalCluster";
import Cluster from "./Cluster";
import { NavContext } from "./NavContext";

// styles
import styled from "styled-components";

export default function FullscreenView() {
  //states

  const { globalyStoredClusters, globalOrange } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  const [orange, setOrange] = globalOrange;
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
      storedClusters.findIndex((element) => element.includes(orange))
    );
  }, []);

  return (
    <StyledFullscreenSection
      className="container-fluid m-2"
      id="fullscreenView"
    >
      <VerticalCluster index={clusterIndex} setOffset={changeOffset} />
      <img
        className="bigImage"
        src={
          storedClusters[clusterIndex].includes(orange)
            ? orange
            : storedClusters[clusterIndex][0]
        }
        alt=""
      />

      <h1 className="bigImageInfo">Info and shit</h1>

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
  grid-template-columns: 0.3fr 1fr;
  grid-template-rows: 1fr 0.5fr 0.3fr;
  gap: 1em;
  .scrollMenuVertical {
    grid-area: 1 / 1 / 1 / 1;
    width: 100;
    height: 100%;
  }
  .bigImage {
    grid-area: 1 / 2 / 3 / 4;
    height: 100%;
    object-fit: contain;
  }
  .scrollMenu {
    grid-area: 3 / 1 / 3 / 4;
    height: 11rem;
  }
  .bigImageInfo {
    grid-area: 2 / 1;
  }
  .card {
    width: 12em;
    height: 9.6em;
  }
  .smallCluster {
    height: 100%;
    width: 12 rem;
  }
`;
