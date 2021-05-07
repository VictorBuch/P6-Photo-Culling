import React, { useState } from "react";
import styled from "styled-components";

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
    <StyledAppSection>
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
    </StyledAppSection>
  );
}

const StyledAppSection = styled.section`
  :root {
    --background-color: #282828;
    --card-background-color: #414141;
    --selected-image-color: #3f8a4b;
  }
  * {
    box-sizing: border-box;
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none;
  }

  background-color: #181818;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    //box-shadow: inset 0 0 5px grey;
    border-radius: 2px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 2px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #FE8029;
  }
`;
