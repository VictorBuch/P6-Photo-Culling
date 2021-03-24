import React from "react";
import Cluster from "./Cluster";

export default function Clusters(props) {
  const clusterArray = [[]];
  var prevClusterIndex = 0;
  var clusterNum = 0;

  // imageBlobArr = [[Blob, lastModifiedInMilisecs]]
  return props.imageBlobArr.map((element, index) => {
    if (index % 10 === 0 && index !== 0) {
      //   console.log("Yep yep");
      clusterArray.push([prevClusterIndex, index]);
      // console.log(clusterArray);
      prevClusterIndex = index;
      // console.log(prevClusterIndex);
      clusterNum++;

      // ----------- use element[1] to get the last modified data of the current blob! ------------

      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <hr></hr>
          <h1 style={{ color: "white" }}>New Cluster</h1>
          <Cluster
            imageBlobArr={props.imageBlobArr.slice(
              clusterArray[clusterNum][0],
              clusterArray[clusterNum][1]
            )}
          />
        </div>
      );
    }
  });
}

// task
// sort the photos based on the last modified data
// do this by sorting the image arr that is passed as a prop.

// sort images based on lastmodified data. if milisec < 10 between the two they are in a cluster.
