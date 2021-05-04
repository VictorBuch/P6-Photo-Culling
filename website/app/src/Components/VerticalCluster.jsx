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
    <StyledVertClusterSection>
      <section className="d-flex flex-column scrollMenuVertical">
        {/* Replace index with the index of the cluster */}

        <div className="card">
          <img
            className="smallCluster"
            src={storedClusters[prevClusterIndex][0]}
            alt=""
            onClick={() => setOffset(-1)}
          />
          <div className="overlay">
            {storedClusters[prevClusterIndex].length}
          </div>
        </div>
        <div className="middle-img">
          <img className="bigCluster" src={storedClusters[index][0]} alt="" />
          <div className="overlay-big">
            {storedClusters[currentClusterIndex].length}
          </div>
        </div>
        <div className="card">
          <img
            className="smallCluster"
            src={storedClusters[nextClusterIndex][0]}
            alt=""
            onClick={() => setOffset(+1)}
          />
          <div className="overlay">
            {storedClusters[nextClusterIndex].length}
          </div>
        </div>
        {/* Use the classNames for styling the image previews */}
      </section>
    </StyledVertClusterSection>
  );
}

const StyledVertClusterSection = styled.section`
  .scrollMenuVertical {
    grid-area: 1 / 1 / 1 / 1;
    align-items: center;
    overflow-y: hidden;
    overflow-x: hidden;
    white-space: nowrap;
  }
  .card {
    width: 12em;
    height: 100%;
    background-color: transparent;
  }
  .middle-img {
    height: 100%;
    width: 15rem;
  }
  .smallCluster {
    height: 100%;
    width: 12rem;
    margin: 1em 0em 1em 0em;
    background-color: transparent;
  }
  .bigCluster {
    height: 100%;
    width: 15rem;
    outline-width: 0.13em;
    outline-color: white;
    outline-style: solid;
  }
  .overlay {
    position: absolute;
    bottom: 10%;
    background: rgba(0, 0, 0, 0.6); /* Black see-through */
    width: 15%;
    height: 15%;
    color: white;
    font-size: 20px;
    padding: 0em 1em 1.5em 0.4em;
    text-align: left;
  }
  .overlay-big {
    position: absolute;
    bottom: 58%;
    background: rgba(0, 0, 0, 0.6); /* Black see-through */
    width: 1%;
    height: 1%;
    color: white;
    font-size: 20px;
    padding: 0em 1em 1.5em 0.4em;
    text-align: left;
  }
`;
