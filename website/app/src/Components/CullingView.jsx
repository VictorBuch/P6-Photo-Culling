import { useState, useContext } from "react";
import { NavContext } from "./NavContext";

// components
import Clusters from "./Clusters";
import FullscreenView from "./FullscreenView";

// styles
import styled from "styled-components";

export default function CullingView({ imageBlobArr }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { globalSelectedImageKey } = useContext(NavContext);
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;

  document.addEventListener("keydown", handleKeyDown);

  function handleKeyDown(e) {
    switch (e.key) {
      case "f":
        if (selectedImageKey) {
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
          <StyledNetflixSection>
            <Clusters imageBlobArr={imageBlobArr} isFullScreen={false} />
          </StyledNetflixSection>
        </div>
      </div>
    </div>
  );

  return <>{isFullScreen ? <FullscreenView /> : netflix}</>;
}

const StyledNetflixSection = styled.section`
  height: 90vh;
  display: grid;

  .scrollMenu {
    height: 20rem;
  }

  .card {
    width: 19em;
    height: 15.2em;
  }
`;
