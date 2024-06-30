import PublicGard from "./PublicGard";
import Login from './../Pages/Auth/Login';
import Register from './../Pages/Auth/Register';
import ForgetPassword from './../Pages/Auth/ForgetPassword';
import NotFound from './../Pages/404/NotFound';


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
      path: "/*",
      element: <NotFound />,
    },
  ]
 }
];

export default PublicRouter;
