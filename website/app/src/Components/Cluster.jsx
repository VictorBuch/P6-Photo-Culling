import React from "react";
import ImageCard from "./ImageCard";

export default function Cluster(props) {
  return props.imageArr.map((index) => {
    return <ImageCard index={index} />;
  });
}
