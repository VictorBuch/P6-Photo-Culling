import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";
import styled from "styled-components";

export default function Cluster({ index, setOffset }) {
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  let prevClusterIndex = index - 1;
  let currentClusterIndex = index;
  let nextClusterIndex = index + 1;

  if (currentClusterIndex === 0) {
    prevClusterIndex = storedClusters.length - 1;
  }

  if (currentClusterIndex === storedClusters.length - 1) {
    nextClusterIndex = 0;
  }

  return (
    <StyledVertClusterSection className="grid-item d-flex flex-column vertical-cluster">
      {/* Replace index with the index of the cluster */}

      <div className="card top-bottom-imgs">
        <img
          className="smallCluster"
          src={storedClusters[prevClusterIndex][0]}
          alt=""
          onClick={() => setOffset(-1)}
        />
        <div className="overlay">{storedClusters[prevClusterIndex].length}</div>
      </div>
      <div className="middle-img">
        <img className="bigCluster" src={storedClusters[index][0]} alt="" />
        <div className="overlay-big">
          {storedClusters[currentClusterIndex].length}
        </div>
      </div>
      <div className="card top-bottom-imgs">
        <img
          className="smallCluster"
          src={storedClusters[nextClusterIndex][0]}
          alt=""
          onClick={() => setOffset(+1)}
        />
        <div className="overlay">{storedClusters[nextClusterIndex].length}</div>
      </div>
      {/* Use the classNames for styling the image previews */}
    </StyledVertClusterSection>
  );
}

const StyledVertClusterSection = styled.section`
  .top-bottom-imgs {
    background-color: transparent;
  }
  .middle-img {
    height: 100%;
    width: 15rem;
  }
  .smallCluster {
    object-fit: contain;
    height: 100%;
    width: 12rem;
  }
  .bigCluster {
    object-fit: contain;
    height: 100%;
    width: 15rem;
    outline-width: 0.13em;
    outline-color: white;
    outline-style: solid;
  }
  .overlay {
    position: absolute;
    bottom: 0%;
    background: rgba(0, 0, 0, 0.6); /* Black see-through */
    width: 1%;
    height: 1%;
    color: white;
    font-size: 20px;
    padding: 0em 1em 1.5em 0.4em;
    text-align: left;
  }
  .overlay-big {
    position: absolute;
    bottom: 62%;
    background: rgba(0, 0, 0, 0.6); /* Black see-through */
    width: 1%;
    height: 1%;
    color: white;
    font-size: 20px;
    padding: 0em 1em 1.5em 0.4em;
    text-align: left;
  }
`;
