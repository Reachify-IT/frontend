import loader from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/75 z-100">
      <div className="w-32 h-32">
        <img src={loader} alt="Loading..." className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default Loader;
