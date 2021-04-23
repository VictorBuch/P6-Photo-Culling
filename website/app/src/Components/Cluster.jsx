import React, { useEffect, useState, useContext } from "react";
import { NavContext } from "./NavContext";
import ImageCard from "./ImageCard";

// import tensorflow
const tf = require("@tensorflow/tfjs");

export default function Cluster({ imageBlobArr, isFullScreen }) {
  // Global variables
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;

  // local variables
  const [numberOfSelectedImages, setNumberOfSelectedImages] = useState(0);
  const { selectedImages } = useContext(NavContext);
  const [selectedImagesKeys, setSelecedImagesKeys] = selectedImages;
  // const [clusterModel, setClusterModel] = useState();

  const clustersArray = [];

  // checks if any of the images in the cluster are in the global selected images array and modify the counter state based on it
  useEffect(() => {
    imageBlobArr.map((blob) => {
      clustersArray.push(blob[0]);
      if (selectedImagesKeys.includes(blob[0])) {
        setNumberOfSelectedImages((prev) => prev + 1);
      }
    });

    // get a copy of the clusters array
    const copy = storedClusters;
    copy.push(clustersArray); // add the cluster array to the copy of the global array
    setStoredClusters(copy); // set the global array to the modified cluster array

    // const fetchModel = async () => {
    //   const model = await tf.loadLayersModel(
    //     "http://localhost:8000/model.json"
    //   );
    //   setClusterModel(model);
    //   console.log("Model: " + clusterModel);
    // };
    // fetchModel();
  }, []);

  const imageCards = imageBlobArr.map((blob) => {
    return (
      <ImageCard
        key={blob}
        blob={blob[0]}
        setNumberOfSelectedImages={setNumberOfSelectedImages}
      />
    );
  });

  return (
    <div
      className={"d-flex flex-row scrollMenu" + (isFullScreen ? "" : " m-2")}
    >
      {!isFullScreen && (
        <div className="d-flex flex-column">
          {/* Selected Text above images */}
          <div
            className="d-inline-flex flex-row clusterNum "
            style={{
              backgroundColor: "grey",
              borderRadius: "3px 3px 0px 0px",
              padding: "3px",
              width: "min-content",
            }}
          >
            <p className="" style={{ color: "white", display: "inline-block" }}>
              {numberOfSelectedImages} out of {imageBlobArr.length}
            </p>
          </div>
          {/* Horizontal Image Div */}
          <div
            className="d-flex flex-row"
            style={{
              backgroundColor: "grey",
              borderRadius: "0px 3px 3px 3px",
            }}
          >
            {/* Creates all the image cards */}
            {imageCards}
          </div>
        </div>
      )}

      {isFullScreen && (
        <div
          className="d-flex flex-row"
          style={{
            backgroundColor: "grey",
            borderRadius: "0px 3px 3px 3px",
          }}
        >
          {/* Creates all the image cards */}
          {imageCards}
        </div>
      )}
    </div>
  );
}
