import React, { useState } from "react";

export default function App() {
  const imageFileArr = [];
  const imageBlobs = [];
  const [imageArr, setImageArr] = useState([]);

  function loadImages(e) {
    imageFileArr.push(e.target.files); // gets a file object with all files
    console.log(imageFileArr[0]); // this gives an image file
    // console.log("File arr length: " + imageFileArr[0].length);

    // Loop trough all the local images and creat blob elements for later use
    for (let i = 0; i < imageFileArr[0].length; i++) {
      imageBlobs.push(URL.createObjectURL(imageFileArr[0][i]));
    }
    setImageArr(imageBlobs); // set the dynamic state array equal to the blobs we just made
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

          {/* This section will need to be a JSX comonent soon but for now it dynamically loads the images */}
          <div className="uploadedImages row">
            {imageArr.map((index) => {
              return (
                <div className="card" style={{ width: "18rem", margin: "3px" }}>
                  <img
                    key={index}
                    src={index}
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">Ranking: 5/10</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <input
            style={{ display: "block" }}
            className="btn btn-danger"
            onChange={loadImages}
            placeholder="Upload Images"
            type="file"
          /> */}
        </div>
      </div>
    </div>
  );
}

// the tasks
// Make sure the state array isnt reset everytime an image is uploaded
// Find a clever way to save user ranking of images
// Allow for user ranking
