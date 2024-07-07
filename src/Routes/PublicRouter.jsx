import PublicGard from "./PublicGard";
import Login from './../Pages/Auth/Login';
import Register from './../Pages/Auth/Register';
import ForgetPassword from './../Pages/Auth/ForgetPassword';
import ResetPassword from './../Pages/Auth/ResetPassword';
import NotFound from './../Pages/404/NotFound';
import Verifying from "../Pages/VerifyingEmail";


const PublicRouter = [
 {
  element:<PublicGard/>,
  children:[
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: `/request-reset-password/:token`,
      element: <ResetPassword />,
    },
    {
      path: "/api/v1/user/activation/:token",
      element: <Verifying />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]
 }
];

export default PublicRouter;
