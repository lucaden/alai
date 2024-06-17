import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ResendOTPButton = ({ setCountdown }) => {
  const [isResend] = useState(false);
  const { sendOtp, phoneNumber } = useAuth();

  const sendOTP = async () => {
    try {
      setCountdown(120);
      await sendOtp(phoneNumber);
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  return (
    <button
      className="ms-[4px] text-base  leading-[24px] text-white font-semibold"
      type="button"
      onClick={() => sendOTP()}
      disabled={isResend}
    >
      {isResend ? "Sending..." : "Click to resend"}
    </button>
  );
};

export default ResendOTPButton;

// Adding props validation using PropTypes
ResendOTPButton.propTypes = {
  setCountdown: PropTypes.func, // Function to set the countdown
};
