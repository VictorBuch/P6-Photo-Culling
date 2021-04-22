import React, { createContext, useState } from "react";

export const NavContext = createContext();

export function NavProvider(props) {
  const [
    numberOfSelectedImagesTotal,
    setNumberOfSelectedImagesTotal,
  ] = useState(0);
  const [selectedImageKeys, setSelectedImageKeys] = useState([])
  return (
    <NavContext.Provider
      value={{numberOfSelectedImages:[numberOfSelectedImagesTotal, setNumberOfSelectedImagesTotal], selectedImages:[selectedImageKeys, setSelectedImageKeys]}}
    >
      {props.children}
    </NavContext.Provider>
  );
}
