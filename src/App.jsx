
import {RouterProvider} from "react-router-dom"
import router from './Routes/router';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <>
    <RouterProvider router={router}/>
     <Loader/>
    </>
  );
}

export default App;
