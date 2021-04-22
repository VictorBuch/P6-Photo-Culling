import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

import styled from "styled-components";

// import tensorflow
const tf = require("@tensorflow/tfjs");

export default function Cluster(props) {
  const [numberOfSelectedImages, setNumberOfSelectedImages] = useState(0);
  // const [clusterModel, setClusterModel] = useState();

  // useEffect(() => {
  //   const fetchModel = async () => {
  //     const model = await tf.loadLayersModel(
  //       "http://localhost:8000/model.json"
  //     );
  //     setClusterModel(model);
  //     console.log("Model: " + clusterModel);
  //   };
  //   fetchModel();
  // }, []);
  
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
