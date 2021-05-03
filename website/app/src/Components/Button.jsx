import React, { useState } from "react";

import styled from "styled-components";

export default function Button(props) {
    //const [isOpen, setIsOpen] = useState(false);


    /*function OpenButton(){
        console.log("button");
        console.log(isOpened);
        return setIsOpen(!isOpen);
    
      }*/

    return(
        <StyledOpenButton 
            bg="blue" >
            Blue button
      </StyledOpenButton>
    )

}


const StyledOpenButton = styled.button`
color: ${props => props.bg === "black" ? "black" : "blue"}

`