import NetflixView from "./NetflixView";
import FullscreenView from "./FullscreenView";
import { useEffect, useState } from "react";

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
    <>
      {isFullScreen ? (
        <FullscreenView />
      ) : (
        <NetflixView imageBlobArr={imageBlobArr} />
      )}
    </>
  );
}
