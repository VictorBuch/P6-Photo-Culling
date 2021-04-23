import React, { createContext, useEffect, useState } from "react";

export const NavContext = createContext();

export function NavProvider(props) {
  const [
    numberOfSelectedImagesTotal,
    setNumberOfSelectedImagesTotal,
  ] = useState(0); // used for displaying the total number of selected images

  const [selectedImageKeys, setSelectedImageKeys] = useState([]); // use for storing the selected images key

  const [storedClusters, setStoredClusters] = useState([]);

  // used for debugging
  useEffect(() => {
    console.log("selectedImageKeys");
    console.log(selectedImageKeys);
    console.log("storedClusters");
    console.log(storedClusters);
  }, [selectedImageKeys, storedClusters]);

  return (
    <NavContext.Provider
      value={{
        numberOfSelectedImages: [
          numberOfSelectedImagesTotal,
          setNumberOfSelectedImagesTotal,
        ],
        selectedImages: [selectedImageKeys, setSelectedImageKeys],
        globalyStoredClusters: [storedClusters, setStoredClusters],
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
}
