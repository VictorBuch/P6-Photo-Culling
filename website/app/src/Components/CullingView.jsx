import { useState, useContext, useEffect } from "react";
import { NavContext } from "./NavContext";

// components
import Clusters from "./Clusters";
import FullscreenView from "./FullscreenView";

// styles
import styled from "styled-components";

var JSZip = require("jszip");

var i = 0;
var ii = 0;
var fullscreen = false;
document.body.style.overflow = "hidden";

function applyFullscreenSettings() {
  document.getElementById("appNav").style.display = "none";
}

function applyNetflixSettings() {
  document.getElementById("appNav").style.display = "block";
}

export default function CullingView({ imageBlobArr }) {
  const {
    globalyStoredClusters,
    globalSelectedImageKey,
    globalAcceptedImages,
  } = useContext(NavContext); // getting multiple states from the Nav Context
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  const [acceptedImageKeys, setAcceptedImageKeys] = globalAcceptedImages;

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    console.log("CullingView UseEffect");
    window.addEventListener("keydown", handleKeyDown);
    setSelectedImageKey(storedClusters[ii][0]);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function applyFullscreenSettings() {
    document.getElementById("appNav").style.display = "none";
    document.body.style.overflow = "hidden";
  }

  function applyNetflixSettings() {
    document.getElementById("appNav").style.display = "block";
    document.body.style.overflow = "scroll";
  }

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

  const netflix = (
    <div style={{ margin: 0 + "!important" }}>
      <div className="container-fluid" style={{ padding: 0 }}>
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
  display: grid;

  .scrollMenu {
    height: 20rem;
  }
  .card {
    min-width: 84%;
    min-height: 84%;
    max-width: 100%;
    max-height: 84%;
    text-align: center;
  }

  .eWeylI {
    color: #b9b9b9;
  }

  //this is weird, everything works except the width of the scrollbar, i don't have time to look into it.
  * {
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      //box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: grey;
      border-radius: 10px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #fe8029;
    }
  }
`;
