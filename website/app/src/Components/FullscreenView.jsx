import Cluster from "./Cluster";
import VerticalCluster from "./VerticalCluster";
import styled from "styled-components";

export default function FullscreenView({ imageBlobArr }) {
  return (
    <StyledFullscreenSection
      className="container-fluid m-2"
      id="fullscreenView"
    >
      {/* Replace image with the currecnt clusters best image */}
      <img className="" src={imageBlobArr[0][0]} alt="" />

      {/* Replace with an actual view of clusters with the best image being the representative one */}
      <VerticalCluster imageBlobArr={imageBlobArr} isFullScreen={true} />

      {/* Replace with only the images from the current cluster */}
      <Cluster imageBlobArr={imageBlobArr} isFullScreen={true} />
      <h1>Info and shit</h1>
    </StyledFullscreenSection>
  );
}

const StyledFullscreenSection = styled.section`
  height: 90vh;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: 2.5fr 1fr;
  gap: 1em;

  img {
    height: 100%;
    object-fit: cover;
  }
`;
