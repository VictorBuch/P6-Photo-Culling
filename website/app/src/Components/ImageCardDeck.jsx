import React from "react";
import { CardGroup } from "react-bootstrap";
import RankedImage from "./RankedImage";

function ImageCardDeck() {
  return (
    <CardGroup
      style={{ justifyContent: "center", alignItems: "center", margin: "50px" }}
    >
      <RankedImage isChoosen="true" />
      <RankedImage />
      <RankedImage />
    </CardGroup>
  );
}

export default ImageCardDeck;
