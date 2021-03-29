import React from "react";

export default function ImageUploadBtn(props) {
  return (
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
          onChange={props.loadImages}
          multiple
        />
      </label>
    </div>
  );
}
