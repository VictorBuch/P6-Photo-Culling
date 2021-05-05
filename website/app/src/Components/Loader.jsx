import styled from "styled-components";

export default function Loader() {
  return (
    <StyledLoaderSection>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="loader"></div>

        <h3>Please wait, the robot is thinking &#129302;</h3>
      </div>
    </StyledLoaderSection>
  );
}


const StyledLoaderSection = styled.section`
  height: 100vh;
  
  h3 {
    color: white;
    display: block;
  }

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #414141; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: 50px;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
