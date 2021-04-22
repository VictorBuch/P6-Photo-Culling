import React, { useState, useContext, useEffect } from "react";
import { NavContext } from "./NavContext";

export default function ImageCard(props) {
  const [isSelected, setIsSelected] = useState(false);
  const { numberOfSelectedImages, selectedImages } = useContext(NavContext); // getting multiple states from the Nav Context

  const [
    totalNumSelectedImages,
    setTotalNumSelectedImages,
  ] = numberOfSelectedImages;

  const [selectedImagesKeys, setSelecedImagesKeys] = selectedImages;

  // This checks on rerenders if the key of the image is in the global selected key array
  useEffect(() => {
    if (selectedImagesKeys.includes(props.blob)) {
      // console.log('Key is in selected array, set selected state to true');
      setIsSelected(true);
    } else {
      // console.log('Key is not in selected array, set selected state to false');
      setIsSelected(false);
    }
  }, []);

  function selectImage(e) {
    if (isSelected) {
      props.setNumberOfSelectedImages((prev) => prev - 1);
      setTotalNumSelectedImages((prev) => prev - 1);

      // If an image is selected we want it to be deleted from the global selected image key array
      // React likes states to not be directly changed so copy the global state array
      const selectedImagesKeysCopy = [...selectedImagesKeys];
      selectedImagesKeysCopy.splice(
        selectedImagesKeysCopy.indexOf(e.target.src),
        1
      ); // find the index of the key and delete it
      setSelecedImagesKeys([...selectedImagesKeysCopy]); // set the state array to the new modified array
    } else {
      props.setNumberOfSelectedImages((prev) => prev + 1);
      setTotalNumSelectedImages((prev) => prev + 1);

      // the image key doesnt exist in the global image selected key array
      // make a copy of the global array
      const selectedImagesKeysCopy = [...selectedImagesKeys];
      selectedImagesKeysCopy.push(e.target.src); // add the key of the selected image
      setSelecedImagesKeys([...selectedImagesKeysCopy]); // set the state to the modified array
    }
    return setIsSelected(!isSelected);
  }

  return (
    <div className="card" style={{ width: "18rem", margin: "5px" }}>
      <img
        key={props.blob}
        src={props.blob}
        alt=""
        className={isSelected ? "cardSelected" : ""}
        onClick={selectImage}
      />
      {/* <div className="card-body">
        <p>10/10</p>
      </div> */}
    </div>
  );
}
