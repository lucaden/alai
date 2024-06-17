import { useEffect } from "react";
import PropTypes from "prop-types";

const OTPTimer = ({ seconds, onTimeout }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        onTimeout();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, onTimeout]);

  return <span className="font-bold inline-block">Click to Resend in {seconds}</span>;
};

export default OTPTimer;

// Adding props validation using PropTypes
OTPTimer.propTypes = {
  seconds: PropTypes.number, // Number of seconds for the timer
  onTimeout: PropTypes.func, // Function to be called when the timer reaches zero
};
