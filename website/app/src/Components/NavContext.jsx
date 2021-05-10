import React, { createContext, useEffect, useState } from "react";

export const NavContext = createContext();

export function NavProvider(props) {
  const [
    numberOfSelectedImagesTotal,
    setNumberOfSelectedImagesTotal,
  ] = useState(0); // used for displaying the total number of selected images

  // The images that have an orange check mark, saved in an array.
  const [acceptedImageKeys, setAcceptedImageKeys] = useState([]);

  // The clusters that we create, stored in a 2d array where each array is a new cluster [[new cluster], [new cluster]]
  const [storedClusters, setStoredClusters] = useState([]);

  // This is a string pointing to the image blob key which has been clicked, gives the image an orange outline
  const [selectedImageKey, setSelectedImageKey] = useState(
    "blob:http://localhost:3000/47f9f2c9-254d-44d8-88f3-e72ce4d56db3"
  );

  // used for debugging
  useEffect(() => {
    // console.log("acceptedImageKeys");
    // console.log(acceptedImageKeys);
    // console.log("storedClusters");
    // console.log(storedClusters);
    // console.log("selectedImageKey: ");
    // console.log(selectedImageKey);
  }, [acceptedImageKeys, selectedImageKey]);

  return (
    <NavContext.Provider
      value={{
        numberOfSelectedImages: [
          numberOfSelectedImagesTotal,
          setNumberOfSelectedImagesTotal,
        ],
        globalAcceptedImages: [acceptedImageKeys, setAcceptedImageKeys],
        globalyStoredClusters: [storedClusters, setStoredClusters],
        globalSelectedImageKey: [selectedImageKey, setSelectedImageKey],
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
}
