import { useContext, useEffect, useState } from "react";

// components
import VerticalCluster from "./VerticalCluster";
import Cluster from "./Cluster";
import { NavContext } from "./NavContext";

// styles
import styled from "styled-components";

export default function FullscreenView() {
  //states

  const { globalyStoredClusters, globalSelectedImageKey } = useContext(
    NavContext
  );
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;
  const [clusterIndex, setClusterIndex] = useState(0);

  function changeOffset(direction) {
    if (clusterIndex + direction >= storedClusters.length - 1) {
      return setClusterIndex(0);
    }
    if (clusterIndex + direction <= 0) {
      return setClusterIndex(storedClusters.length - 1);
    }
    console.log("Got to change offset bottom");
    setClusterIndex((prev) => (prev += direction));
  }

  useEffect(() => {
    setClusterIndex(
      storedClusters.findIndex((element) => element.includes(selectedImageKey))
    );
  }, []);

  return (
    <StyledFullscreenSection
      className="grid-container-fluid m-2"
      id="fullscreenView"
    >
      <span className="h-cluster grid-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
        </svg>
        <span> Clusters</span>
      </span>
      <VerticalCluster index={clusterIndex} setOffset={changeOffset} />
      <img
        className="bigImage grid-item"
        src={
          storedClusters[clusterIndex].includes(selectedImageKey)
            ? selectedImageKey
            : storedClusters[clusterIndex][0]
        }
        alt=""
      />

      <span className="h-autoculling grid-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#FFFFFF"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z" />
        </svg>
        <span> Autoculling</span>
        <p>
          Confidence <br></br> Images accepted <br></br> Clusters completed{" "}
          <br></br>
          Personalization learned <br></br> Accepted suggestions <br></br>{" "}
          Changed suggestions
        </p>
      </span>
      <Cluster
        imageBlobArr={storedClusters[clusterIndex]}
        isFullScreen={true}
      />
    </StyledFullscreenSection>
  );
}

const StyledFullscreenSection = styled.section`
  height: 100vh;
  display: grid;
  grid-template: 1rem 27.5rem 15rem auto / 20rem auto;
  gap: 1em;

  .h-cluster {
    color: white;
    font-size: 20px;
    padding-top: 0.3rem;
  }
  /* Vertical cluster*/
  .vertical-cluster {
    grid-area: 2 / 1 / 2 / 1;
    align-items: center;
  }

  .h-autoculling {
    color: white;
    grid-area: 3 / 1 / 3 / 1;
    font-size: 20px;

    p {
      font-size: 16px;
      padding-left: 0.6rem;
    }
  }

  /* Fullscreen image*/
  .bigImage {
    grid-area: 1 / 2 / 4 / 3;
    height: 100%;
    object-fit: contain;
    position: relative;
    text-align: center;
  }

  .acceptedCluster {
    grid-area: 4 / 1 / 4 / 2;
    height: 11rem;
    width: minMax(0%, 50%);
    overflow: hidden;
  }

  /* Horizontal cluster*/
  .horizontal-cluster {
    grid-area: 4 / 1 / 4 / 3;
    position: absolute;
    align-items: baseline;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6); /* Black see-through */
    width: 100%;
    height: 20%;
    font-size: 15px; /* Changes card size within cluster */
    padding: 1em 1em 1em 1em;
  }

  .card {
    width: 12em;
    height: 100%;
    background-color: transparent;
    margin: 0.4em;
  }
`;
