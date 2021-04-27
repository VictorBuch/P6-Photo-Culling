import { useEffect, useState, useContext } from "react";
import { NavContext } from "./NavContext";
import Clusters from "./Clusters";
import Cluster from "./Cluster";
import FullscreenCluster from "./FullscreenCluster";
import VerticalCluster from "./VerticalCluster";
import styled from "styled-components";
import ImageCard from "./ImageCard";

export default function CullingView({ imageBlobArr }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;

  function handleKeyDown(e) {
    switch (e.key) {
      case "f":
        setIsFullScreen(true);
        break;
      case "Escape":
        setIsFullScreen(false);
        break;
      case "p":
        console.log(storedClusters);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  const fullscreen = (
    <div>
      <StyledFullscreenSection className="grid-container" id="fullscreenView">
        {/* Replace with an actual view of clusters with the best image being the representative one */}
        <VerticalCluster imageBlobArr={imageBlobArr} isFullScreen={true} />

        {/* Replace image with the currecnt clusters best image */}
        <img class="bigImage" src={imageBlobArr[0][0]} alt="" />

        <h1 class="bigImageInfo">Info and stuff goes here</h1>

        {/* Replace with only the images from the current cluster */}
        <FullscreenCluster imageBlobArr={imageBlobArr} isFullScreen={true} />
      </StyledFullscreenSection>
    </div>
  );

  const netflix = (
    <div>
      <div className="container-fluid m-2">
        <div className="d-flex flex-column">
          <Clusters imageBlobArr={imageBlobArr} />
        </div>
      </div>
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
  grid-template-columns: 0.3fr 1fr;
  grid-template-rows: 1fr 0.5fr 0.3fr;
  gap: 1em;

  .scrollMenuVertical {
    grid-area: 1 / 1 / 1 / 1;
  }
  .bigImage {
    grid-area: 1 / 2 / 3 / 4;
    height: 100%;
    object-fit: contain;
  }
  .scrollMenu {
    grid-area: 3 / 1 / 3 / 4;
  }
  .bigImageInfo {
    grid-area: 2 / 1;
  }
  .card {
    width: 1em;
  }
`;
