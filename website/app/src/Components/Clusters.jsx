import { useContext } from "react";
import Cluster from "./Cluster";
import { NavContext } from "./NavContext";

export default function Clusters(props) {
  // local values
  const clusterArray = [[]];
  var prevClusterIndex = 0;
  var clusterNum = 0;
  var interval = 2800; //change this number to tweak the clustering

  var prevDateTimeOriginal = null;

  // imageblobarr = [[Blob, lastModifiedInMilisecs]]
  // element = [Blob, lastModifiedInMilisecs]
  return props.imageBlobArr.map((element, index) => {
    // if our PrevlasMod is not set set it to the first elements lastMod, we can do this cuz the array is sorted
    if (prevDateTimeOriginal === null) {
      prevDateTimeOriginal = element[1];
    }

    //check if the image creation date is within the interval compared to the previous image
    if (
      Math.abs(element[1] - prevDateTimeOriginal) > interval ||
      index === props.imageBlobArr.length - 1
    ) {
      // the image element is not within the threshold so make a new cluster
      if (index === props.imageBlobArr.length - 1) {
        clusterArray.push([prevClusterIndex, index + 1]);
      } else {
        clusterArray.push([prevClusterIndex, index]);
      }
      prevClusterIndex = index;
      clusterNum++;
      prevDateTimeOriginal = element[1];
      console.log(element[1]);

      const newCluster = props.imageBlobArr.slice(
        clusterArray[clusterNum][0],
        clusterArray[clusterNum][1]
      );

      return (
        <Cluster
          id="cluster"
          key={clusterNum}
          imageBlobArr={newCluster}
          isFullScreen={props.isFullScreen}
        />
      );
    } else {
      prevDateTimeOriginal = element[1];
    }
  });
}

// get the images into a prop for the individual clusters
