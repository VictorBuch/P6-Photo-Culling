import React, { useContext } from "react";
import { NavContext } from "./NavContext";
import styled from "styled-components";

export default function Nav({ imageBlobArr }) {
  const { numberOfSelectedImages } = useContext(NavContext);

  const [
    totalNumSelectedImages,
    setTotalNumSelectedImages,
  ] = numberOfSelectedImages;

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
    color: #B9B9B9;
    top: 0px;
    z-index: 100;
  }

  p {
margin: 5px 0 5px 20px

  }
`;
