// This is the file where we biuld our app :)

import React from "react";
import ImageCardDeck from "./Components/ImageCardDeck";
import RankedImage from "./Components/RankedImage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <ImageCardDeck />
    </div>
  );
}

export default App;
