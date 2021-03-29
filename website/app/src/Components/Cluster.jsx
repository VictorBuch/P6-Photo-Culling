import React, { useState } from "react";
import ImageCard from "./ImageCard";

export default function Cluster(props) {
  const [numberOfSelectedImages, setNumberOfSelectedImages] = useState(0);

  return (
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
  );
}
