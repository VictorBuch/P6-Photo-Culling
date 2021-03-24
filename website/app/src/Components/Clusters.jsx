import React from "react";
import Cluster from "./Cluster";

export default function Clusters(props) {
  const clusterArray = [[]];
  var prevClusterIndex = 0;
  var clusterNum = 0;

  var prevLastModifiedLast4Str = null;

  // element = [[Blob, lastModifiedInMilisecs]]
  return props.imageBlobArr.map((element, index) => {
    // if our PrevlasMod is not set set it to the first elements lastMod, we can do this cuz the array is sorted
    // we get the last for because that is equal to 10 seconds, if thats the difference we want
    if (prevLastModifiedLast4Str === null) {
      prevLastModifiedLast4Str = String(props.imageBlobArr[0][1]).substr(
        element[1].length - 4
      );
    }

    // ----------------For Testing -----------------
    // console.log(
    //   "PropLast4: " +
    //     String(props.imageBlobArr[0][1]).substr(element[1].length - 4)
    // );
    // console.log(
    //   "ElementLast4: " + String(element[1]).substr(element[1].length - 4)
    // );
    // console.log("PrevLastModifiedStr4: " + prevLastModifiedLast4Str);
    // ------------------------------------------------------------------

    // if the new image element is bigger that means 10 seconds have passed and it should create a new cluster
    // so if the statement underneath is true, add the image element to the cluster if not go to the else satement and make a new cluster and update prevLastMod
    if (
      String(element[1]).substr(element[1].length - 4) <=
      prevLastModifiedLast4Str
    ) {
      // the image element is withing 10 seconds so add it to the cluster somehow
      console.log("Yep yep");

      // clusterArray.push([prevClusterIndex, index]);
      // // console.log(clusterArray);
      // prevClusterIndex = index;
      // // console.log(prevClusterIndex);
      // clusterNum++;

      // // ----------- use element[1] to get the last modified data of the current blob! ------------

      // return (
      //   <div style={{ display: "flex", flexDirection: "row" }}>
      //     <hr></hr>
      //     <h1 style={{ color: "white" }}>New Cluster</h1>
      //     <Cluster
      //       imageBlobArr={props.imageBlobArr.slice(
      //         clusterArray[clusterNum][0],
      //         clusterArray[clusterNum][1]
      //       )}
      //     />
      //   </div>
      // );
    } else {
      // change prevLastMod and create a new cluster :)
      console.log("Nope");
    }
  });
}

// task
// sort the photos based on the last modified data
// do this by sorting the image arr that is passed as a prop.

// sort images based on lastmodified data. if milisec < 10 between the two they are in a cluster.
