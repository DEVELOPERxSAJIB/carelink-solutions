import { InfinitySpin } from "react-loader-spinner";
import { motion } from "framer-motion";
const AuthLoader = () => {
  return (
    <motion.div
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      exit={{ y: -5 }}
      transition={{ duration: 2 }}
      className="main-loader"
    >
      <InfinitySpin
        visible={true}
        width="400"
        color="#685DD8"
        ariaLabel="infinity-spin-loading"
      />
    </motion.div>
  );
};

export default AuthLoader;
