import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";

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
    <section
      className="d-flex flex-column scrollMenuVertical"
      style={{ alignItems: "center" }}
    >
      {/* Replace index with the index of the cluster */}

      <div className="card" style={{ width: "12rem", margin: "5px" }}>
        <img
          className="smallCluster"
          src={storedClusters[prevClusterIndex][0]}
          alt=""
          onClick={() => setOffset(-1)}
        />
      </div>
      <div className="card" style={{ width: "12rem", margin: "5px" }}>
        <img className="bigCluster" src={storedClusters[index][0]} alt="" />
      </div>
      <div className="card" style={{ width: "12rem", margin: "5px" }}>
        <img
          className="smallCluster"
          src={storedClusters[nextClusterIndex][0]}
          alt=""
          onClick={() => setOffset(+1)}
        />
      </div>
      {/* Use the classNames for styling the image previews */}
    </section>
  );
}
