import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "./NavContext";
import styled from "styled-components";

export default function Nav({ imageBlobArr }) {
  const { numberOfSelectedImages, globalAcceptedImages } = useContext(
    NavContext
  );

  const [
    totalNumSelectedImages,
    setTotalNumSelectedImages,
  ] = numberOfSelectedImages;

  const [acceptedImageKeys, setAcceptedImageKeys] = globalAcceptedImages;

  const [selectedImages, setSelectedImages] = useState(0);

  useEffect(() => {
    setSelectedImages(totalNumSelectedImages);
  }, [globalAcceptedImages]);

  return (
    <StyledNavSection>
      <nav id="appNav">
        <p>
          Accepted pictures: {totalNumSelectedImages} of {imageBlobArr.length}
        </p>
      </nav>
    </StyledNavSection>
  );
}

const StyledNavSection = styled.nav`
  nav {
    color: #b9b9b9;
    top: 0px;
    z-index: 100;
  }

  p {
    margin: 5px 0 5px 20px;
  }
`;
