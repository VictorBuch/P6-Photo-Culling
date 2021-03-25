import React from "react";
import ImageCard from "./ImageCard";

export default function Cluster(props) {
  return props.imageBlobArr.map((blob) => {
    return <ImageCard blob={blob[0]} />;
  });
}
