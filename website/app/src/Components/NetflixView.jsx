import Clusters from "./Clusters";

export default function NetflixView({ imageBlobArr }) {
  return (
    <div className="container-fluid m-2"
      style={{margin:"0px"}}
    >
      <div className="d-flex flex-column"
      style={{
        width:"100%", paddingLeft:"0px",paddingRight:"0px"}}
      >
        <Clusters imageBlobArr={imageBlobArr} />
      </div>
    </div>
  );
}
