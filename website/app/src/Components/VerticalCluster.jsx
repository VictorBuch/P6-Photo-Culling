import React, { useState, useContext } from "react";
import { NavContext } from "./NavContext";

export default function Cluster(props) {
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;

  const index = 2; // Placeholder
  return (
    <section
      className="d-flex flex-column scrollMenuVertical"
      style={{ alignItems: "center" }}
    >
      {/* Replace index with the index of the cluster */}

      <div className="card" style={{ width: "18rem", margin: "5px" }}>
        <img
          className="smallCluster"
          src={storedClusters[index - 1][0]}
          alt=""
        />
      </div>
      <div className="card" style={{ width: "18rem", margin: "5px" }}>
        <img className="bigCluster" src={storedClusters[index][0]} alt="" />
      </div>
      <div className="card" style={{ width: "18rem", margin: "5px" }}>
        <img
          className="smallCluster"
          src={storedClusters[index + 1][0]}
          alt=""
        />
      </div>
      {/* Use the classNames for styling the image previews */}
    </section>
  );
}
