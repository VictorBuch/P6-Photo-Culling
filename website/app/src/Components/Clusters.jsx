import React from "react";
import Cluster from "./Cluster";

export default function Clusters(props) {
  const clusterArray = [[]];
  var prevClusterIndex = 0;
  var clusterNum = 0;

  var prevLastModified = null;

  // element = [[Blob, lastModifiedInMilisecs]]
  return props.imageBlobArr.map((element, index) => {
    // if our PrevlasMod is not set set it to the first elements lastMod, we can do this cuz the array is sorted
    // we get the last for because that is equal to 10 seconds, if thats the difference we want
    if (prevLastModified === null) {
      prevLastModified = props.imageBlobArr[0][1];
    }

    // if the new image element is bigger that means 10 seconds have passed and it should create a new cluster
    // so if the statement underneath is true, add the image element to the cluster if not go to the else satement and make a new cluster and update prevLastMod
    if (!(element[1] - prevLastModified < 10000)) {
      // the image element is withing 10 seconds so add it to the cluster somehow
      console.log("New Cluster");

      clusterArray.push([prevClusterIndex, index]);
      //console.log("Cluster Array: " + clusterArray);
      prevClusterIndex = index;
      //console.log("Prev Cluster Index: " + prevClusterIndex);
      clusterNum++;
      prevLastModified = element[1];

      // // // ----------- use element[1] to get the last modified data of the current blob! ------------

      return (
        <div className="d-flex flex-row m-2 scrollMenu">
          <Cluster
            imageBlobArr={props.imageBlobArr.slice(
              clusterArray[clusterNum][0],
              clusterArray[clusterNum][1]
            )}
          />
        </div>
      );
    }
    if (index === props.imageBlobArr.length - 1) {
      console.log("New Cluster Last");

      clusterArray.push([prevClusterIndex, index + 1]);
      //console.log("Cluster Array: " + clusterArray);
      prevClusterIndex = index;
      //console.log("Prev Cluster Index: " + prevClusterIndex);
      clusterNum++;
      prevLastModified = element[1];
      return (
        <div className="d-flex flex-row m-2 scrollMenu">
          <Cluster
            test={() => props.test}
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
