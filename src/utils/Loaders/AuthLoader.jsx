import { InfinitySpin } from "react-loader-spinner";

const AuthLoader = () => {
  return (
    <div className="main-loader">
      <InfinitySpin
        visible={true}
        width="400"
        color="#685DD8"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default AuthLoader;
