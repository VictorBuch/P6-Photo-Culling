import React, { useState } from "react";
import Clusters from "./Components/Clusters";

export default function App() {
  const imageFileArr = [];
  const images2DArray = [];
  const [imageArr, setImageArr] = useState([[null]]);

  function loadImages(e) {
    imageFileArr.push(e.target.files); // gets a file object with all files
    // console.log(imageFileArr[0]); // this gives an image file
    // console.log("File arr length: " + imageFileArr[0].length);

    // Loop trough all the local images and creat blob elements for later use
    for (let i = 0; i < imageFileArr[0].length; i++) {
      images2DArray.push([
        URL.createObjectURL(imageFileArr[0][i]),
        String(imageFileArr[0][i].lastModified),
      ]);
      // use this to cluster, it represents milliseconds since 1 January 1970 UTC for some reason. 🤷
      //console.log(imageLastModified);
    }
    //setImageArr(...imageObj, [imageBlobs, imageLastModified]); //  set the dynamic state array equal to the blobs we just made
    console.log(images2DArray);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col md-12">
          <h1 style={{ color: "white" }}>Test area</h1>

          <label className="btn btn-danger">
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

          {/* This section will need to be a JSX component soon but for now it dynamically loads the images */}
          <div className="uploadedImages row">
            <Clusters imageArr={imageObj} imageLastModified={imageObj} />
          </div>
        </div>
      </div>
    </div>
  );
}

// the tasks
// render imagecards based on the amount of images withing a specific modified date
// Make sure the state array isnt reset everytime an image is uploaded

// sort images based on lastmodified data. if milisec < 10 between the two they are in a cluster.
