import "./Loader.css";

function Loader() {
  return (
    <div className="Loader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <div>Loading</div>
    </div>
  );
}

export default Loader;
