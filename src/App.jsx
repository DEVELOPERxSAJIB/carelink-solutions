import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";

function App() {
  
  console.log(location)
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
