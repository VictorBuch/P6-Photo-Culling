import React from "react";
import Cluster from "./Cluster";

export default function Clusters(props) {
  const clusterArray = [[]];
  var prevClusterIndex = 0;
  var clusterNum = 0;

  var prevDateTimeOriginal = null;

  // imageblobarr = [[Blob, lastModifiedInMilisecs]]
  // element = [Blob, lastModifiedInMilisecs]
  return props.imageBlobArr.map((element, index) => {
    // if our PrevlasMod is not set set it to the first elements lastMod, we can do this cuz the array is sorted
    if (prevDateTimeOriginal === null) {
      prevDateTimeOriginal = element[1];
    }
    if (Math.abs(element[1] - prevDateTimeOriginal) < 10000) {
      prevDateTimeOriginal = element[1];
    }

    // if the new image element is bigger that means 10 seconds have passed and it should create a new cluster
    if (
      Math.abs(element[1] - prevDateTimeOriginal) > 30000 ||
      index === props.imageBlobArr.length - 1
    ) {
      // the image element is not withing the threshold so make a new cluster

      if (index === props.imageBlobArr.length - 1) {
        clusterArray.push([prevClusterIndex, index + 1]);
      } else {
        clusterArray.push([prevClusterIndex, index]);
      }
      prevClusterIndex = index;
      clusterNum++;
      prevDateTimeOriginal = element[1];

      return (
        <Cluster
          imageBlobArr={props.imageBlobArr.slice(
            clusterArray[clusterNum][0],
            clusterArray[clusterNum][1]
          )}
        />
      );
    }
  });
}

// get the images into a prop for the individual clusters
