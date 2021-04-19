import React, { createContext, useState } from "react";

export const NavContext = createContext();

export function NavProvider(props) {
  const [
    numberOfSelectedImagesTotal,
    setNumberOfSelectedImagesTotal,
  ] = useState(0);
  return (
    <NavContext.Provider
      value={[numberOfSelectedImagesTotal, setNumberOfSelectedImagesTotal]}
    >
      {props.children}
    </NavContext.Provider>
  );
}
