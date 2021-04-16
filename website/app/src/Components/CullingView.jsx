import NetflixView from "./NetflixView";
import FullscreenView from "./FullscreenView";
import { useEffect, useState } from "react";
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
        <FullscreenView imageBlobArr={imageBlobArr} />
      </div>
      <div className={isFullScreen ? "hidden" : ""}>
        <NetflixView imageBlobArr={imageBlobArr} />
      </div>
    </StyledCullingView>
  );
}

const StyledCullingView = styled.div`
  .hidden {
    display: none;
  }
`;
