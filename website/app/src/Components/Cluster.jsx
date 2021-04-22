import React, { useEffect, useState, useContext } from "react";
import { NavContext } from "./NavContext";
import ImageCard from "./ImageCard";

// import tensorflow
const tf = require("@tensorflow/tfjs");

export default function Cluster(props) {
  // Global variables
  const { globalyStoredClusters } = useContext(NavContext);
  const [storedClusters, setStoredClusters] = globalyStoredClusters;

  // local variables
  const [numberOfSelectedImages, setNumberOfSelectedImages] = useState(0);
  const { selectedImages } = useContext(NavContext);
  const [selectedImagesKeys, setSelecedImagesKeys] = selectedImages;
  // const [clusterModel, setClusterModel] = useState();

  // checks if any of the images in the cluster are in the global selected images array and modify the counter state based on it
  useEffect(() => {
    props.imageBlobArr.map((blob) => {
      if (selectedImagesKeys.includes(blob[0])) {
        setNumberOfSelectedImages((prev) => prev + 1);
      }
    });

    // const fetchModel = async () => {
    //   const model = await tf.loadLayersModel(
    //     "http://localhost:8000/model.json"
    //   );
    //   setClusterModel(model);
    //   console.log("Model: " + clusterModel);
    // };
    // fetchModel();
  }, []);

  const imageCards = props.imageBlobArr.map((blob) => {
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
      className={
        "d-flex flex-row scrollMenu" + (props.isFullScreen ? "" : " m-2")
      }
    >
      {!props.isFullScreen && (
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
              {numberOfSelectedImages} out of {props.imageBlobArr.length}
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

      {props.isFullScreen && (
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
