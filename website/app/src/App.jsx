import React, { useState } from "react";

// Styles
import "./Styles/App.scss";

// Components
import Clusters from "./Components/Clusters";
import ImageUploadBtn from "./Components/ImageUploadBtn";
import Nav from "./Components/Nav";
import { NavProvider } from "./Components/NavContext";
import Loader from "./Components/Loader";

// extra dependecies
import exifr from "exifr"; // for getting image metadata

export default function App() {
  const imageFileArr = [];
  const images2DArray = [];
  const [imageBlobArr, setimageBlobArr] = useState([]);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [areImagesUploaded, setAreImagesUploaded] = useState(false);

  // check if we need to show the loading icon or the upload button
  var uploadBtn;
  if (areImagesUploaded) {
    uploadBtn = <Loader />;
  } else {
    uploadBtn = <ImageUploadBtn loadImages={loadImages} />;
  }

  function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return a[1] < b[1] ? -1 : 1;
    }
  }

  function sortByDateTimeOriginal(img2DArr) {
    img2DArr.sort(compareSecondColumn);
    console.log("Sorted!");
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
    console.log("Set image Array");
    setimageBlobArr(images2DArray); //  set the dynamic state array equal to the blobs we just made

    if (imageBlobArr) {
      console.log("setImages state to True");
      setAreImagesLoaded(true);
      setAreImagesUploaded(false);
    }
  }

  return (
    <>
      {!areImagesLoaded && uploadBtn}

      {areImagesLoaded && (
        <div className="container-fluid m-2">
          <NavProvider>
            <Nav imageBlobArr={imageBlobArr} />
            <div className="d-flex flex-column">
              <Clusters imageBlobArr={imageBlobArr} />
            </div>
          </NavProvider>
        </div>
      )}
    </>
  );
}
