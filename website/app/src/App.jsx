import React, { useState } from "react";
import Clusters from "./Components/Clusters";
import ImageUploadBtn from "./Components/ImageUploadBtn";
import Nav from "./Components/Nav";
import { NavProvider } from "./Components/NavContext";

export default function App() {
  const imageFileArr = [];
  const images2DArray = [];
  const [imageBlobArr, setimageBlobArr] = useState([]);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return a[1] < b[1] ? -1 : 1;
    }
  }

  function sortByLastModified(img2DArr) {
    img2DArr.sort(compareSecondColumn);
  }

  function loadImages(e) {
    imageFileArr.push(e.target.files); // gets a file object with all files
    // console.log(imageFileArr[0]); // this gives an image file
    // console.log("File arr length: " + imageFileArr[0].length);

    // Loop trough all the local images and creat blob elements for later use
    for (let i = 0; i < imageFileArr[0].length; i++) {
      images2DArray.push([
        URL.createObjectURL(imageFileArr[0][i]),
        imageFileArr[0][i].lastModified,
      ]);
      // use this to cluster, it represents milliseconds since 1 January 1970 UTC for some reason. 🤷
    }

    sortByLastModified(images2DArray);
    setimageBlobArr(images2DArray); //  set the dynamic state array equal to the blobs we just made
    if (imageBlobArr) {
      console.log("setImages to True");
      setAreImagesLoaded(true);
    }
  }

  return (
    <>
      {/* Make the code below into a Component, will be difficult :) */}
      {!areImagesLoaded && <ImageUploadBtn loadImages={loadImages} />}

      {/* This section will need to be a JSX component soon but for now it dynamically loads the images */}
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

// the tasks
// render imagecards based on the amount of images withing a specific modified date
//
