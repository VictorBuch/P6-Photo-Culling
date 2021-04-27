import { useEffect, useState, useContext } from "react";
import { NavContext } from "./NavContext";
import Clusters from "./Clusters";
import Cluster from "./Cluster";
import VerticalCluster from "./VerticalCluster";
import styled from "styled-components";

export default function CullingView({ imageBlobArr }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  const { globalOrange, selectedImages } = useContext(NavContext);
  const [orange, setOrange] = globalOrange;

  let clusterIndex = storedClusters.findIndex((element) =>
    element.includes(orange)
  );

  const [offset, setOffset] = useState(0);

  document.addEventListener("keydown", handleKeyDown);

  function changeOffset(direction) {
    setOffset((prev) => (prev += direction));
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case "f":
        if (orange) {
          setIsFullScreen(true);
        }
        document.removeEventListener("keydown", handleKeyDown);
        break;
      case "Escape":
        setIsFullScreen(false);
        document.removeEventListener("keydown", handleKeyDown);
        break;
      case "p":
        console.log();
        break;
      default:
        break;
    }
  }

  const netflix = (
    <div>
      <div className="container-fluid m-2">
        <div className="d-flex flex-column">
          <Clusters imageBlobArr={imageBlobArr} isFullScreen={false} />
        </div>
      </div>
    </div>
  );
  const fullscreen = (
    <div>
      <StyledFullscreenSection
        className="container-fluid m-2"
        id="fullscreenView"
      >
        {/* Replace image with the currecnt clusters best image */}
        <img className="" src={orange} alt="" />
        {/* Replace with an actual view of clusters with the best image being the representative one */}
        <VerticalCluster
          index={clusterIndex + offset}
          setOffset={changeOffset}
        />

        <Cluster
          imageBlobArr={storedClusters[clusterIndex + offset]}
          isFullScreen={true}
        />
        <h1>Info and shit</h1>
      </StyledFullscreenSection>
    </div>
  );

  return (
    <StyledCullingView>{isFullScreen ? fullscreen : netflix}</StyledCullingView>
  );
}

const StyledCullingView = styled.div`
  .hidden {
    display: none;
  }
`;

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
