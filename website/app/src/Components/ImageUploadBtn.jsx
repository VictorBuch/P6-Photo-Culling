import React from "react";
import exifr from "exifr"; // for getting image metadata
import styled from "styled-components";

export default function ImageUploadBtn({
  setAreImagesUploaded,
  setimageBlobArr,
  imageBlobArr,
  setAreImagesLoaded,
}) {
  const imageFileArr = [];
  const images2DArray = [];

  function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return a[1] < b[1] ? -1 : 1;
    }
  }

  function sortByDateTimeOriginal(img2DArr) {
    img2DArr.sort(compareSecondColumn);
    // console.log("Sorted!");
  }

  async function getMetaData(file) {
    const tags = await exifr.parse(file, ["DateTimeOriginal"]);
    const { DateTimeOriginal } = tags;
    return DateTimeOriginal.valueOf();
  }

  async function loadImages(e) {
    setAreImagesUploaded(true);
    //console.log(e.target.files); // this gives an image file

    imageFileArr.push(e.target.files); // gets a file object with all files
    // Loop trough all the local images and creat blob elements for later use
    for (let i = 0; i < imageFileArr[0].length; i++) {
      // get the created date from the meta data of the images
      const createdTimeInMilisecs = await getMetaData(imageFileArr[0][i]);
      images2DArray.push([
        URL.createObjectURL(imageFileArr[0][i]),
        createdTimeInMilisecs,
      ]);
    }

    sortByDateTimeOriginal(images2DArray);
    // console.log("Set image Array");
    setimageBlobArr(images2DArray); //  set the dynamic state array equal to the blobs we just made

    if (imageBlobArr) {
      // console.log("setImages state to True");
      setAreImagesLoaded(true);
      setAreImagesUploaded(false);
    }
  }

  return (
    <StyledUploadBtnSection>
      <div
        className="container d-flex flex-row justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <label className="btn-lg btn-danger">
          <div>Upload Images</div>
          <input
            id="inputFile"
            className="file-upload"
            type="file"
            accept="image/*"
            onChange={loadImages}
            multiple
          />
        </label>
      </div>
    </StyledUploadBtnSection>
  );
}

const StyledUploadBtnSection = styled.div`
  h1 {
    color: white;
  }

  // For the Upload Button, hides the input
  .file-upload {
    display: none;
  }
`;
