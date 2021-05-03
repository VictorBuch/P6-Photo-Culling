import { useState, useContext } from "react";
import { NavContext } from "./NavContext";

// components
import Clusters from "./Clusters";
import FullscreenView from "./FullscreenView";

// styles
import styled from "styled-components";

export default function CullingView({ imageBlobArr }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { globalSelectedImageKey, globalAcceptedImages } = useContext(
    NavContext
  );
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;
  const [acceptedImageKeys, setAcceptedImageKeys] = globalAcceptedImages;

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
      case "s":
        console.log("Firing S");
        download(acceptedImageKeys);
        break;
      default:
        break;
    }
  }

  function download(blobArray) {
    const a = document.createElement("a");
    a.href = blobArray[0];
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadBlob(blobArray, name = "file.png") {
    console.log(blobArray);
    const blobUrl = blobArray[1];

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    // link.dispatchEvent(
    //   new MouseEvent("click", {
    //     bubbles: true,
    //     cancelable: true,
    //     view: window,
    //   })
    // );
    link.click();
    // Remove link from body
    document.body.removeChild(link);
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
