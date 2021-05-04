import React, { useState, useContext, useEffect } from "react";
import { NavContext } from "./NavContext";

import styled from "styled-components";

export default function ImageCard(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const {
    numberOfSelectedImages,
    globalAcceptedImages,
    globalSelectedImageKey,
  } = useContext(NavContext); // getting multiple states from the Nav Context
  const [selectedImageKey, setSelectedImageKey] = globalSelectedImageKey;

  const [
    totalNumSelectedImages,
    setTotalNumSelectedImages,
  ] = numberOfSelectedImages;

  const [acceptedImagesKeys, setAcceptedImagesKeys] = globalAcceptedImages;

  // This checks on rerenders if the key of the image is in the global selected key array
  useEffect(() => {
    if (acceptedImagesKeys.includes(props.blob)) {
      // console.log('Key is in selected array, set selected state to true');
      setIsAccepted(true);
    } else {
      // console.log('Key is not in selected array, set selected state to false');
      setIsAccepted(false);
    }
    if (selectedImageKey === props.blob) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedImageKey]);

  function acceptImage() {
    if (isAccepted) {
      console.log("accepted");
      props.setNumberOfSelectedImages((prev) => prev - 1);
      setTotalNumSelectedImages((prev) => prev - 1);

      // If an image is selected we want it to be deleted from the global selected image key array
      // React likes states to not be directly changed so copy the global state array
      const acceptedImagesKeysCopy = [...acceptedImagesKeys];
      acceptedImagesKeysCopy.splice(
        acceptedImagesKeysCopy.indexOf(props.blob),
        1
      ); // find the index of the key and delete it
      setAcceptedImagesKeys([...acceptedImagesKeysCopy]); // set the state array to the new modified array
    } else {
      console.log("Not accepted");
      props.setNumberOfSelectedImages((prev) => prev + 1);
      setTotalNumSelectedImages((prev) => prev + 1);

      // the image key doesnt exist in the global image selected key array
      // make a copy of the global array
      const acceptedImagesKeysCopy = [...acceptedImagesKeys];
      acceptedImagesKeysCopy.push(props.blob); // add the key of the selected image
      setAcceptedImagesKeys([...acceptedImagesKeysCopy]); // set the state to the modified array
    }
    return setIsAccepted(!isAccepted);
  }

  function handleSelected(e) {
    setSelectedImageKey(e.target.src);
  }

  const rejected = (
    <svg
      id="Component_4_33"
      data-name="Component 4 – 33"
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="17"
      viewBox="0 0 19 17"
      onClick={acceptImage}
    >
      <rect
        id="Rectangle_97"
        data-name="Rectangle 97"
        width="19"
        height="17"
        fill="#be171c"
      />
      <g id="Group_20" data-name="Group 20" transform="translate(3.915 2.959)">
        <path
          id="Path_36"
          data-name="Path 36"
          d="M-5800.456,4404.347l-11.182,11.01"
          transform="translate(5811.638 -4404.347)"
          fill="none"
          stroke="#181818"
          strokeWidth="2"
        />
        <path
          id="Path_37"
          data-name="Path 37"
          d="M-5811.638,4404.347l10.93,11.083"
          transform="translate(5811.638 -4404.347)"
          fill="none"
          stroke="#181818"
          strokeWidth="2"
        />
      </g>
    </svg>
  );

  const accepted = (
    <svg
      id="Component_3_9"
      data-name="Component 3 – 9"
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="17"
      viewBox="0 0 19 17"
      onClick={acceptImage}
    >
      <g
        id="Rectangle_95"
        data-name="Rectangle 95"
        fill="#fe8029"
        stroke="#fe8029"
        strokeWidth="1"
      >
        <rect width="19" height="17" stroke="none" />
        <rect x="0.5" y="0.5" width="18" height="16" fill="none" />
      </g>
      <path
        id="Path_30"
        data-name="Path 30"
        d="M105.618,1053.058l4.275,4.1,7.391-9.832"
        transform="translate(-101.724 -1044.227)"
        fill="none"
        stroke="#181818"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div
      className={"card" + (isSelected ? " cardSelected" : "")}
      style={{ margin: "5px" }}
    >
      <img key={props.blob} src={props.blob} alt="" onClick={handleSelected} />
      <div
        className="card-body"
        style={{
          width: "100%",
          height: "20%",
          textAlign: "center",
          backgroundColor: "#282828",
          padding: "0px 0px 0px 0px",
        }}
      >
        {isAccepted ? accepted : rejected}
      </div>
    </div>
  );
}
