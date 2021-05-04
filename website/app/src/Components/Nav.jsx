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
        <h1>
          Accepted {totalNumSelectedImages} of {imageBlobArr.length}
        </h1>
      </nav>
    </StyledNavSection>
  );
}

const StyledNavSection = styled.section`
  nav {
    color: white;
    padding: 5px;
    position: sticky;
    top: 0px;
    z-index: 100;
    background-color: var(--background-color);
    opacity: 0.9;
  }

  h1 {
    margin-left: 30px;
  }
`;
