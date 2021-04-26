import React, { useState, useContext, useEffect } from "react";
import { NavContext } from "./NavContext";

export default function ImageCard(props) {
  const rejected = (
    <svg
      id="Component_4_33"
      data-name="Component 4 – 33"
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="17"
      viewBox="0 0 19 17"
      onClick={selectImage}
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
          stroke-width="2"
        />
        <path
          id="Path_37"
          data-name="Path 37"
          d="M-5811.638,4404.347l10.93,11.083"
          transform="translate(5811.638 -4404.347)"
          fill="none"
          stroke="#181818"
          stroke-width="2"
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
      onClick={selectImage}
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
        stroke-linejoin="round"
        strokeWidth="2"
      />
    </svg>
  );

  const [isSelected, setIsSelected] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const { numberOfSelectedImages, selectedImages, globalOrange } = useContext(
    NavContext
  ); // getting multiple states from the Nav Context
  const [orange, setOrange] = globalOrange;

  const [
    totalNumSelectedImages,
    setTotalNumSelectedImages,
  ] = numberOfSelectedImages;

  const [selectedImagesKeys, setSelecedImagesKeys] = selectedImages;

  // This checks on rerenders if the key of the image is in the global selected key array
  useEffect(() => {
    if (selectedImagesKeys.includes(props.blob)) {
      // console.log('Key is in selected array, set selected state to true');
      setIsAccepted(true);
    } else {
      // console.log('Key is not in selected array, set selected state to false');
      setIsAccepted(false);
    }
    if (orange === props.blob) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [orange]);

  function selectImage(e) {
    if (isAccepted) {
      props.setNumberOfSelectedImages((prev) => prev - 1);
      setTotalNumSelectedImages((prev) => prev - 1);

      // If an image is selected we want it to be deleted from the global selected image key array
      // React likes states to not be directly changed so copy the global state array
      const selectedImagesKeysCopy = [...selectedImagesKeys];
      selectedImagesKeysCopy.splice(
        selectedImagesKeysCopy.indexOf(props.blob),
        1
      ); // find the index of the key and delete it
      setSelecedImagesKeys([...selectedImagesKeysCopy]); // set the state array to the new modified array
    } else {
      props.setNumberOfSelectedImages((prev) => prev + 1);
      setTotalNumSelectedImages((prev) => prev + 1);

      // the image key doesnt exist in the global image selected key array
      // make a copy of the global array
      const selectedImagesKeysCopy = [...selectedImagesKeys];
      selectedImagesKeysCopy.push(props.blob); // add the key of the selected image
      setSelecedImagesKeys([...selectedImagesKeysCopy]); // set the state to the modified array
    }
    return setIsAccepted(!isAccepted);
  }

  function handleSelected(e) {
    setOrange(e.target.src);
  }

  return (
    <div
      className={"card" + (isSelected ? " cardSelected" : "")}
      style={{ width: "18rem", margin: "5px" }}
    >
      <img key={props.blob} src={props.blob} alt="" onClick={handleSelected} />
      <div
        className="card-body"
        style={{ textAlign: "center", backgroundColor: "grey" }}
      >
        {/* Rejected */}
        {isAccepted ? accepted : rejected}

        {/* Accepted */}
      </div>
    </div>
  );
}
