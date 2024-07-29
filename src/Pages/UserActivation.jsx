import { useNavigate, useParams } from "react-router-dom";
import { Hourglass, ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";
import { useActivateUserMutation } from "../Redux/api/UserApi";

const UserActivation = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [activateUser, { data, isLoading, isSuccess }] =
    useActivateUserMutation();

  useEffect(() => {
    if (params.token) {
      activateUser(params?.token);
      const timer = setTimeout(() => {
        navigate(`/login`);
      }, 1000 * 5);

      return () => clearTimeout(timer);
    }
  }, [navigate, params.token, activateUser]);

  return (
    <>
      <div className="verify-loader">
        {isLoading && (
          <>
            <div className="loader-1">
              <h4>
                We are activating your account. Please do not exit from this
                page.
              </h4>
            </div>

            <div className="loader-2">
              <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={["#7367F0", "#7367F0"]}
              />
            </div>
          </>
        )}
        {isSuccess && (
          <>
            <div className="loader-1">
              <h4>{data.message}</h4>
            </div>

            <div className="loader-2">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserActivation;
