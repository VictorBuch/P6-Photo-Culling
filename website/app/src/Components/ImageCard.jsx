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

  const [acceptedImageKeys, setAcceptedImageKeys] = globalAcceptedImages;

  // This checks on rerenders if the key of the image is in the global selected key array
  useEffect(() => {
    if (acceptedImageKeys.includes(props.blob)) {
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
      props.setLlocalNumberOfSelectedImages((prev) => prev - 1);
      setTotalNumSelectedImages((prev) => prev - 1);

      // If an image is selected we want it to be deleted from the global selected image key array
      // React likes states to not be directly changed so copy the global state array
      const acceptedImageKeysCopy = [...acceptedImageKeys];
      acceptedImageKeysCopy.splice(
        acceptedImageKeysCopy.indexOf(props.blob),
        1
      ); // find the index of the key and delete it
      setAcceptedImageKeys([...acceptedImageKeysCopy]); // set the state array to the new modified array
    } else {
      props.setLlocalNumberOfSelectedImages((prev) => prev + 1);
      setTotalNumSelectedImages((prev) => prev + 1);

      // the image key doesnt exist in the global image selected key array
      // make a copy of the global array
      const acceptedImageKeysCopy = [...acceptedImageKeys];
      acceptedImageKeysCopy.push(props.blob); // add the key of the selected image
      setAcceptedImageKeys([...acceptedImageKeysCopy]); // set the state to the modified array
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
    <StyledImageCardSection>
      <StyledImageContainer
        className={"card" + (isSelected ? " cardSelected" : "")}
        isSelected={isSelected}
      >
        <StyledImage
          key={props.blob}
          src={props.blob}
          alt=""
          onClick={handleSelected}
          //isSelected={isSelected}
        ></StyledImage>
      </StyledImageContainer>
      <span style={{ textAlign: "center" }}>
        {isAccepted ? accepted : rejected}
      </span>
    </StyledImageCardSection>
  );
}

const StyledImageContainer = styled.div`
  width: 97%;
  height: 80%;
  margin-top: 5px;
  background-color: #181818;
`;

const StyledImageCardSection = styled.section`
  min-width: 199px;
  min-height: 140px;
  max-width: 199px;
  max-height: 140px;
  margin-left: 10px;
  border: none;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;

  .card-img-top {
    width: auto;
    height: 15vh;
    object-fit: contain;
  }

  .card {
    border: none;
  }

  .card-body {
    width: 100%;
    height: 20%;
    text-align: center;
    background-color: #282828;
    padding: 0px 0px 0px 0px;
  }

  .cardAccepted {
    box-shadow: 0px 0px 10px 7px var(--selected-image-color);
  }

  .cardSelected {
    box-shadow: 0px 0px 8px 5px rgb(180, 180, 180);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${(props) =>
    props.isSelected &&
    `
  //box-shadow: 0px 0px 5px 3px rgb(110, 110, 110);
  border: 5px;
  border-color: #A8A8A8;
  border-radius: 4px;
`}
`;
