import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";

export default function Cluster({ index }) {
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;
  let prevClusterIndex = index - 1;
  let currentClusterIndex = index;
  let nextClusterIndex = index + 1;

  if (currentClusterIndex === 0) {
    prevClusterIndex = storedClusters.length - 1;
  }
  if (currentClusterIndex + 1 === storedClusters.length) {
    nextClusterIndex = 0;
  }

  return (
    <section
      className="d-flex flex-column scrollMenuVertical"
      style={{ alignItems: "center" }}
    >
      {/* Replace index with the index of the cluster */}

      <div className="card" style={{ width: "18rem", margin: "5px" }}>
        <img
          className="smallCluster"
          src={storedClusters[prevClusterIndex][0]}
          alt=""
        />
      </div>
      <div className="card" style={{ width: "18rem", margin: "5px" }}>
        <img
          className="bigCluster"
          src={storedClusters[currentClusterIndex][0]}
          alt=""
        />
      </div>
      <div className="card" style={{ width: "18rem", margin: "5px" }}>
        <img
          className="smallCluster"
          src={storedClusters[nextClusterIndex][0]}
          alt=""
        />
      </div>
      {/* Use the classNames for styling the image previews */}
    </section>
  );
}
