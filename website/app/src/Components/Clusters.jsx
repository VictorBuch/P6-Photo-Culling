import React from "react";
import Cluster from "./Cluster";

export default function Clusters(props) {
  const clusterArray = [[]];
  var prevClusterIndex = 0;
  var clusterNum = 0;

  //   return <Cluster imageArr={props.imageArr} />;
  return props.imageArr.map((element, index) => {
    if (index % 10 === 0 && index !== 0) {
      //   console.log("Yep yep");
      clusterArray.push([prevClusterIndex, index]);
      console.log(clusterArray);
      prevClusterIndex = index;
      console.log(prevClusterIndex);
      clusterNum++;
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <hr></hr>
          <h1 style={{ color: "white" }}>New Cluster</h1>
          <Cluster
            className={index}
            imageArr={props.imageArr.slice(
              clusterArray[clusterNum][0],
              clusterArray[clusterNum][1]
            )}
          />
        </div>
      );
    }
  });
}
