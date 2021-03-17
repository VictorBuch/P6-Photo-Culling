import React from "react";
import Card from "react-bootstrap/Card";

function RankedImage(props) {
  return (
    <Card
      bg="secondary"
      border={props.isChoosen && "success"}
      style={{ width: "18rem" }}
      className="m-2"
    >
      <Card.Img variant="top" src="https://picsum.photos/200" />
      <Card.Body>
        <Card.Text> &#9733; &#9733; &#9733; &#9733; &#9734;</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RankedImage;
