import BodyText from "@/components/molecules/bodyText";
import { TbRobot } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Button from "@/components/molecules/button";
import OTPTimer from "@/components/molecules/auth/otpTimer";
import PropTypes from "prop-types";
import { CiFileOn } from "react-icons/ci";
import { useEffect, useRef } from "react";
import checkImg from "@/assets/img/check.gif";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

// Function to parse and render formatted text
const renderFormattedText = (text) => {
  // Split the text into parts based on '\n\n' and '\n'
  const parts = text.split(/(\n\n|\n)/g);

  return parts.map((part, index) => {
    if (part === "\n\n") {
      return <p key={part} className="mb-2" />;
    } else if (part === "\n") {
      return <br key={part} />;
    } else {
      // Split the part into bold and non-bold segments
      const segments = part.split(/(\*\*.*?\*\*)/g);

      return (
        <span key={part}>
          {segments.map((segment, i) => {
            // Check if the segment should be bold
            if (segment.startsWith("**") && segment.endsWith("**")) {
              return (
                <strong key={segment}>
                  {segment.substring(2, segment.length - 2)}
                </strong>
              );
            }
            return segment;
          })}
        </span>
      );
    }
  });
};

const ChatWithoutLogin = ({
  phoneNumber,
  messages,
  fileInfo,
  handleOtpSubmit,
  countdown,
  setCountdown,
}) => {
  const handleTimeout = () => {
    if (countdown > 0) setCountdown(countdown - 1);
  };

  const { isAuthenticated } = useAuth();

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  let messageKeyCounter = 1;

  const renderMessage = () => {
    return messages.map((message) => {
      const key = `${message.type}-message-${messageKeyCounter++}`;
      if (message.type === "bot") {
        if (fileInfo && message.file === true) {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              className="flex items-center justify-between w-full text-white bg-[#0d131c] border-dashed border border-[#f1f1f12e] py-2 px-3 rounded-[8px] mb-4 max-w-[300px]"
            >
              <div className="flex items-center flex-1 max-w-[calc(100%_-_45px)]">
                <span className="min-w-[38px] h-[38px] bg-[#fff] flex items-center justify-center mr-3 rounded-[50%]">
                  <CiFileOn color={"#F04438"} size={22} strokeWidth={"1"} />
                </span>
                <span>{fileInfo.name}</span>
              </div>
            </div>
          );
        } else {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              className="flex flex-col items-start mb-4 receiver"
            >
              <div className="flex w-full gap-x-2">
                <span className="w-[40px] h-[40px] flex items-center justify-center bg-[#424242] rounded-[50%]">
                  <TbRobot size={25} />
                </span>
                <div className="bg-[#17191f] py-3 px-4 rounded-[25px] rounded-bl-[2px] max-w-[80%]">
                  <BodyText
                    additionalClass="opacity-[0.8]"
                    text={renderFormattedText(message.text)}
                  />
                </div>
              </div>
              {message.otp && !isAuthenticated && (
                <div className="flex mt-2 actions gap-x-2">
                  {countdown > 0 ? (
                    <OTPTimer seconds={countdown} onTimeout={handleTimeout} />
                  ) : (
                    <Button
                      type="button"
                      label="Resend OTP"
                      additionalClass="!bg-[#424242] !border-[#424242]"
                      textClass="!font-light text-sm"
                      onClick={() => handleOtpSubmit(phoneNumber)}
                    />
                  )}
                </div>
              )}
            </div>
          );
        }
      } else if (message.type === "user") {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            className="flex flex-col items-end mb-4 sender"
          >
            <div className="flex flex-row-reverse w-full gap-x-2">
              <span className="w-[40px] h-[40px] flex items-center justify-center bg-[#424242] rounded-[50%]">
                <FaUser size={17} />
              </span>
              <div className="bg-[#17191f] py-3 px-4 rounded-[25px] rounded-br-[2px] max-w-[80%]">
                <BodyText additionalClass="opacity-[0.8]" text={message.text} />
              </div>
            </div>
          </div>
        );
      } else if (message.type === "flashMsg") {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            className="flex flex-col items-end mb-4 sender"
          >
            <div className="flex items-center justify-center w-full py-4 gap-x-2">
              <p className="text-base font-normal">{message.text}</p>
              <Image
                src={checkImg}
                alt="logo"
                width="22"
                height="22"
                loading="lazy"
              />
            </div>
          </div>
        );
      } else {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            className="flex flex-col items-start py-4 mb-5 receiver"
          >
            <div className="dots"></div>
          </div>
        );
      }
    });
  };

  return (
    <div
      className="text-left flex-1 md:max-h-[calc(100vh_-_232px)] overflow-y-auto pr-2"
      ref={chatContainerRef}
    >
      {renderMessage()}
    </div>
  );
};

ChatWithoutLogin.propTypes = {
  phoneNumber: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.object),
  fileInfo: PropTypes.object,
  handleOtpSubmit: PropTypes.func,
  countdown: PropTypes.number,
  setCountdown: PropTypes.func,
};
export default ChatWithoutLogin;
