import React, { useState } from "react";

// Styles
import "./Styles/App.scss";

// Components
import ImageUploadBtn from "./Components/ImageUploadBtn";
import Nav from "./Components/Nav";
import { NavProvider } from "./Components/NavContext";
import Loader from "./Components/Loader";
import CullingView from "./Components/CullingView";

export default function App() {
  const [imageBlobArr, setimageBlobArr] = useState([]);

  // Has the user uploaded any images by clicking the upload button
  const [areImagesUploaded, setAreImagesUploaded] = useState(false);

  // has the images been loaded and and fetched the meta data
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  // check if we need to show the loading icon or the upload button
  var uploadBtn;
  if (areImagesUploaded) {
    uploadBtn = <Loader />;
  } else {
    uploadBtn = (
      <ImageUploadBtn
        imageBlobArr={imageBlobArr}
        setimageBlobArr={setimageBlobArr}
        setAreImagesUploaded={setAreImagesUploaded}
        setAreImagesLoaded={setAreImagesLoaded}
      />
    );
  }

  return (
    <>
      {/* While the images have not been processed display either the upload btn or the loading page */}
      {!areImagesLoaded && uploadBtn}

      {/* Images have now been processed and show the culing interface */}
      {areImagesLoaded && (
        <NavProvider>
          <Nav imageBlobArr={imageBlobArr} />

          {/* Component that is resposible for drawing the netflix or fullscreen view */}
          <CullingView imageBlobArr={imageBlobArr} />
        </NavProvider>
      )}
    </>
  );
}
