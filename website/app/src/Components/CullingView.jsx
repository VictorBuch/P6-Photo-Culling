import { useState, useContext, useEffect } from "react";
import { NavContext } from "./NavContext";

// components
import Clusters from "./Clusters";
import FullscreenView from "./FullscreenView";

// styles
import styled from "styled-components";

var i = 0;
var ii = 0;
var fullscreen = false;

function applyFullscreenSettings() {
  document.getElementById("appNav").style.display = "none";
  document.body.style.overflow = "hidden";
}

function applyNetflixSettings() {
  document.getElementById("appNav").style.display = "block";
  document.body.style.overflow = "scroll";
}

export default function CullingView({ imageBlobArr }) {
  const {
    globalSelectedImageKey,
    globalAcceptedImages,
    globalyStoredClusters,
  } = useContext(NavContext);
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;
  const [acceptedImageKeys, setAcceptedImageKeys] = globalAcceptedImages;
  const [storedClusters, setStoredClusters] = globalyStoredClusters;

  const [clusterIndex, setClusterIndex] = useState(0);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    if (!firstRender) {
      setSelectedImageKey(storedClusters[ii][0]);
      document.addEventListener("keydown", handleKeyDown);
      setFirstRender(true);
      console.log("making eventlistener");
    }
  }, []);

  // some minor bug here but not too bad
  function changeOffset(direction) {
    if (ii + direction > storedClusters.length - 1) {
      // ii = 0;
      // return setSelectedImageKey(storedClusters[ii][0]);
      return;
    }
    if (ii + direction < 0) {
      // ii = storedClusters.length - 1;
      // return setSelectedImageKey(storedClusters[ii][0]);
      return;
    }
    ii += direction;
    setSelectedImageKey(storedClusters[ii][0]);
    let selectedCard = document.querySelector(".cardSelected");
    selectedCard.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.key) {
      case "f":
        fullscreen = true;
        setIsFullScreen(true);
        applyFullscreenSettings();

        break;
      case "Escape":
        fullscreen = false;
        setIsFullScreen(false);
        applyNetflixSettings();
        break;

      // Cluster controlls withe keyboard
      case "ArrowDown":
        if (fullscreen) {
          return;
        }
        changeOffset(1);

        break;
      case "ArrowUp":
        if (fullscreen) {
          return;
        }
        changeOffset(-1);
        break;
      case "ArrowLeft":
        if (i - 1 < 0) return;
        i -= 1;
        try {
          setSelectedImageKey(storedClusters[ii][i]);
        } catch (error) {
          console.log(error);
        }
        break;
      case "ArrowRight":
        if (i + 1 > storedClusters[ii].length - 1) return;
        i += 1;
        try {
          setSelectedImageKey(storedClusters[ii][i]);
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  }

  // function zipImages() {
  //   var zip = new JSZip();
  //   var img = zip.folder("images");
  //   let index = 0;
  //   for (let image of acceptedImageKeys) {
  //     img.file(`Image${index++}.png`, image, { base64: true });
  //   }
  //   zip.generateAsync({ type: "blob" }).then(function (content) {
  //     // see FileSaver.js

  //   });
  // }

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
  height: 100vh;
  display: grid;
  .scrollMenu {
    height: 20rem;
  }
  .card {
    min-width: 200px;
    min-height: 100px;
    max-width: 200px;
    max-height: 100px;
  }
`;
