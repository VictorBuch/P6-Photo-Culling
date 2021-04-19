import { useEffect, useState } from "react";
import Clusters from "./Clusters";
import Cluster from "./Cluster";
import VerticalCluster from "./VerticalCluster";
import styled from "styled-components";

export default function CullingView({ imageBlobArr }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  function handleKeyDown(e) {
    switch (e.key) {
      case "f":
        setIsFullScreen(true);
        break;
      case "Escape":
        setIsFullScreen(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  });
  return (
    <StyledCullingView>
      <div className={isFullScreen ? "" : "hidden"}>
        <StyledFullscreenSection
          className="container-fluid m-2"
          id="fullscreenView"
        >
          {/* Replace image with the currecnt clusters best image */}
          <img className="" src={imageBlobArr[0][0]} alt="" />

          {/* Replace with an actual view of clusters with the best image being the representative one */}
          <VerticalCluster imageBlobArr={imageBlobArr} isFullScreen={true} />

          {/* Replace with only the images from the current cluster */}
          <Cluster imageBlobArr={imageBlobArr} isFullScreen={true} />
          <h1>Info and shit</h1>
        </StyledFullscreenSection>
      </div>

      <div className={isFullScreen ? "hidden" : ""}>
        <div className="container-fluid m-2">
          <div className="d-flex flex-column">
            <Clusters imageBlobArr={imageBlobArr} />
          </div>
        </div>
      </div>
    </StyledCullingView>
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
