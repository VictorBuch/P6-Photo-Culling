import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

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

  return (
    <div className="d-flex flex-row m-2 scrollMenu">
      <div className="d-flex flex-column">
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

        <div
          className="d-flex flex-row"
          style={{
            backgroundColor: "grey",
            borderRadius: "0px 3px 3px 3px",
          }}
        >
          {props.imageBlobArr.map((blob) => {
            return (
              <ImageCard
                blob={blob[0]}
                setNumberOfSelectedImages={setNumberOfSelectedImages}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
