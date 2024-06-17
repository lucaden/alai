import PropTypes from "prop-types";
const { AuthProvider } = require("@/context/authContext");
import "react-toastify/dist/ReactToastify.css";

function Providers({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

Providers.propTypes = {
  children: PropTypes.node,
};

export default Providers;
