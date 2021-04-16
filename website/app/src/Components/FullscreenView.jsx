import Cluster from "./Cluster";
import VerticalCluster from "./VerticalCluster";

export default function FullscreenView({ imageBlobArr }) {
  return (
    <section className="container-fluid m-2" id="fullscreenView">
      {/* Replace image with the currecnt clusters best image */}
      <img className="" src={imageBlobArr[0][0]} alt="" />

      {/* Replace with an actual view of clusters with the best image being the representative one */}
      <VerticalCluster imageBlobArr={imageBlobArr} isFullScreen={true} />

      {/* Replace with only the images from the current cluster */}
      <Cluster imageBlobArr={imageBlobArr} isFullScreen={true} />
      <h1>Info and shit</h1>
    </section>
  );
}
