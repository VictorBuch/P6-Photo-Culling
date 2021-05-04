import { useState, useContext, useEffect } from "react";
import { NavContext } from "./NavContext";

// components
import Clusters from "./Clusters";
import FullscreenView from "./FullscreenView";

// styles
import styled from "styled-components";

var i = 0;

function applyFullscreenSettings() {
  document.getElementById("appNav").style.display = "none";
  document.body.style.overflow = "hidden";
}

function applyNetflixSettings() {
  document.getElementById("appNav").style.display = "block";
  document.body.style.overflow = "scroll";
}

export default function CullingView({ imageBlobArr }) {
  var JSZip = require("jszip");
  var FileSaver = require("file-saver");

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

  useEffect(() => {
    setSelectedImageKey(storedClusters[clusterIndex][0]);
    document.addEventListener("keydown", handleKeyDown);
    console.log("making eventlistener");
  }, []);

  function changeOffset(direction) {
    console.log("Direction");
    console.log(direction);
    if (clusterIndex + direction >= storedClusters.length - 1) {
      return setClusterIndex(0);
    }
    if (clusterIndex + direction <= 0) {
      return setClusterIndex(storedClusters.length - 1);
    }
    console.log("set it");
    setClusterIndex((prev) => (prev += direction));
  }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.key) {
      case "f":
        if (selectedImageKey) {
          setIsFullScreen(true);
          applyFullscreenSettings();
        }

        break;
      case "Escape":
        setIsFullScreen(false);
        applyNetflixSettings();

        break;

      // Cluster controlls withe keyboard
      // case "ArrowDown":
      //   changeOffset(1);
      //   break;
      // case "ArrowUp":
      //   changeOffset(-1);
      //   break;
      case "ArrowLeft":
        if (i - 1 < 0) return;
        i -= 1;
        try {
          setSelectedImageKey(storedClusters[clusterIndex][i]);
        } catch (error) {
          console.log(error);
        }
        break;
      case "ArrowRight":
        if (i + 1 > storedClusters[clusterIndex].length - 1) return;
        i += 1;
        try {
          setSelectedImageKey(storedClusters[clusterIndex][i]);
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        break;
    }
  }

  function zipImages() {
    var zip = new JSZip();
    var img = zip.folder("images");
    let index = 0;
    for (let image of acceptedImageKeys) {
      img.file(`Image${index++}.png`, image, { base64: true });
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      FileSaver.saveAs(content, "CulledImages.zip");
    });
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
