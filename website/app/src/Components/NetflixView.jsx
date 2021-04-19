import Clusters from "./Clusters";

export default function NetflixView({ imageBlobArr }) {
  return (
    <div className="container-fluid m-2">
      <div className="d-flex flex-column">
        <Clusters imageBlobArr={imageBlobArr} />
      </div>
    </div>
  );
}
