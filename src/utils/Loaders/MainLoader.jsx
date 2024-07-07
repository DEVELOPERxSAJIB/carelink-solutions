import { ColorRing } from "react-loader-spinner";
import {motion} from "framer-motion"
const MainLoader = () => {
  return (
    <motion.div  initial={{ y: -5 }}
    animate={{ y: 0 }}
    exit={{ y: -5 }}
    transition={{ duration: 2 }} className="loader">
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#685DD8", "#8277F2", "#9289F3", "#9C94F4", "#9C94F4"]}
      />
    </motion.div>
  );
};

export default MainLoader;
