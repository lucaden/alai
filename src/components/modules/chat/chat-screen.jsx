"use client";
import BodyText from "@/components/molecules/bodyText";
import Button from "@/components/molecules/button";
import { IoSend, IoArrowBack } from "react-icons/io5";
import NoPolicyImg from "@/assets/img/img.png";
import { IoMdAttach } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { CiFileOn } from "react-icons/ci";
import { useAuth } from "@/context/authContext";
import PropTypes from "prop-types";
import ChatWithoutLogin from "./chat-withoutlogin";
import Image from "next/image";

export default function ChatScreen({ chatWithUpload, status }) {
  const {
    isAuthenticated,
    sendOtp,
    verifyOtp,
    updateUser,
    listUploadedFiles,
    uploadFiles,
    sendUserMessage,
    sendUserGeneralMessage,
  } = useAuth();
  const [submit, setSubmit] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [loginWithChat, setLoginWithChat] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enterFirstName, setEnterFirstName] = useState("");
  const [enterLastName, setEnterLastName] = useState("");
  const [upload, setUpload] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [messages, setMessages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [fileuploading, setFileuploading] = useState(false);
  const [chatStatus, setChatStatus] = useState(status);
  const [policyList, setPolicyList] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const uploadRef = useRef(null);

  const fetchFileList = async () => {
    const response = await listUploadedFiles();
    setPolicyList(response);
  };
  useEffect(() => {
    fetchFileList();
    // Define message configurations based on conditions
    const messageConfig = {
      authenticated: {
        withUpload: {
          type: "bot",
          text: "Please upload the document of your current policy",
          otp: false,
        },
        withoutUpload: {
          type: "bot",
          text: "I’m here to assist you in selecting the perfect insurance for your vehicle in a few minutes.",
          otp: false,
        },
      },
      unauthenticated: {
        withUpload: {
          type: "bot",
          text: "Before we proceed, I will need your contact number.",
          otp: false,
        },
        withoutUpload: {
          type: "bot",
          text: "I’m here to assist you in selecting the perfect insurance for your vehicle in a few minutes.",
          otp: false,
        },
      },
    };

    // Determine the message configuration based on authentication and chatWithUpload flags
    const messageType = localStorage.getItem("token")
      ? "authenticated"
      : "unauthenticated";
    const messageKey = chatWithUpload ? "withUpload" : "withoutUpload";
    const initialMessages = [messageConfig[messageType][messageKey]];

    // Set the initial messages
    setMessages(initialMessages);

    const countryCode = !otpSent && chatStatus && !isAuthenticated ? "+41" : "";
    setTextareaValue(countryCode);

    // Fetch file list if the user is authenticated
    if (localStorage.getItem("token")) {
      fetchFileList();
    }

    // Add event listener for clicks outside the upload options
    const handleClickOutside = (event) => {
      if (
        uploadRef.current &&
        !uploadRef.current.contains(event.target) &&
        !event.target.closest(".upload-toggle") // Ensures the click on the toggle doesn't close the dropdown
      ) {
        setUpload(false);
        setUploaded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addLoaderMsg = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "loader", text: "" },
    ]);
  };

  const reomveLoaderMsg = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.type !== "loader")
    );
  };

  const handleSendMessage = async () => {
    const message = textareaValue.trim();
    if (!message) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: message },
    ]);
    addLoaderMsg();
    setSubmit(true);
    setTextareaValue("");
    if (chatStatus) {
      await handleChatMessage(message);
    } else {
      await handleGeneralMessage(message);
    }
  };

  const removeFlashMessages = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.type !== "flashMsg")
    );
  };

  const handleChatMessage = async (message) => {
    if (!isAuthenticated) {
      await handleUnauthenticatedChatMessage(message);
    } else if (loginWithChat && (!enterFirstName || !enterLastName)) {
      await handleIncompleteProfileChatMessage(message);
    } else if (isAuthenticated && fileId && fileSelected) {
      await handleAuthenticatedChatMessage(message);
    } else if (isAuthenticated && !fileId && !fileSelected && !status) {
      await handleGeneralMessage(message);
    } else if(isAuthenticated && !fileId && !fileSelected && status){
      await handleAuthenticatedChatMessage(message);
    }
  };

  const handleUnauthenticatedChatMessage = async (message) => {
    if (!otpSent) {
      await handleUnauthenticatedChatOTP(message);
    } else {
      await handleUnauthenticatedChatOTPVerification(message);
    }
  };

  const handleUnauthenticatedChatOTP = async (message) => {
    const mobileValid = validatePhoneNumber(message);
    if (mobileValid === "Valid") {
      setPhoneNumber(message);
      await sendOtp(message, true);
      setOtpSent(true);
      reomveLoaderMsg();
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          text: "Please share the 4-digit OTP you have received on your phone.",
          otp: true,
        },
      ]);
    } else {
      reomveLoaderMsg();
      setTextareaValue("+41");
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: mobileValid },
      ]);
    }
    setSubmit(false);
  };

  const handleUnauthenticatedChatOTPVerification = async (message) => {
    const otpVerified = await verifyOtp(message, true);
    if (otpVerified) {
      await handleUnauthenticatedChatOTPVerificationSuccess();
      fetchFileList();
    } else {
      reomveLoaderMsg();
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Invalid OTP. Please try again." },
      ]);
      setSubmit(false)
    }
  };

  const handleUnauthenticatedChatOTPVerificationSuccess = async () => {
    setLoginWithChat(true);
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setEnterFirstName(user.firstName || "");
    setEnterLastName(user.lastName || "");

    if (user.firstName && user.lastName) {
      reomveLoaderMsg();
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "flashMsg", text: "Your Contact number has been verified" },
      ]);
      // Remove flash message after a delay (e.g., 5 seconds)
      setTimeout(() => {
        removeFlashMessages();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Please upload the document of your current policy",
          },
        ]);
        setSubmit(false);
      }, 5000);
    } else {
      reomveLoaderMsg();
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "flashMsg", text: "Your Contact number has been verified" },
      ]);
      // Remove flash message after a delay (e.g., 5 seconds)
      setTimeout(() => {
        removeFlashMessages();
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: user.firstName ? "Enter Last Name" : "Enter First Name",
          },
        ]);
        setSubmit(false);
      }, 5000);
    }
  };

  const handleIncompleteProfileChatMessage = async (message) => {
    if (!enterFirstName) {
      setEnterFirstName(message);
      reomveLoaderMsg();
      if (!enterLastName) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: "Enter Last Name" },
        ]);
      }
    } else {
      setEnterLastName(message);
      const userUpdated = await updateUser(enterFirstName, message);
      reomveLoaderMsg();
      if (userUpdated) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "flashMsg", text: "Registration Successfull" },
        ]);
        // Remove flash message after a delay (e.g., 5 seconds)
        setTimeout(removeFlashMessages, 5000);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Please upload the document of your current policy",
          },
        ]);
      }
    }
    setSubmit(false);
  };

  const handleAuthenticatedChatMessage = async (message) => {
    if (!fileId) {
      console.log("File", fileId);
      reomveLoaderMsg();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          text: "Please upload the document of your current policy",
        },
      ]);
      setSubmit(false);
      return;
    }
    const response = await sendUserMessage(fileId, message);
    reomveLoaderMsg();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "bot",
        text: response || "Sorry! unable to answer please try again",
      },
    ]);
    setSubmit(false);
  };

  const handleGeneralMessage = async (message) => {
    const response = await sendUserGeneralMessage(message);
    reomveLoaderMsg();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "bot",
        text: response || "Sorry! unable to answer please try again",
      },
    ]);
    setSubmit(false);
  };

  const handleFileChange = async (event) => {
    setChatStatus(true);
    if (!isAuthenticated) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          text: "Before we proceed, I will need your contact number.",
        },
      ]);
      setUploaded(!uploaded);
      setUpload(!upload);
      return;
    }
    setFileuploading(true);
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        setFileuploading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Only Pdf & Docs are allowed",
          },
        ]);
        reomveLoaderMsg();
        setUpload(!upload);
        return;
      } else {
        // Proceed with the file processing
        console.log("File selected:", file);

        setUpload(false);
        setUploaded(false);
        const response = await uploadFiles(file);

        if (response) {
          setFileuploading(false);
          reomveLoaderMsg();
          fetchFileList();
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "bot",
              text: "Thank you for uploading the document. Analyzing it.",
            },
          ]);
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "flashMsg", text: "Analysis Completed" },
          ]);
          // Remove flash message after a delay (e.g., 5 seconds)
          setTimeout(removeFlashMessages, 5000);
          setMessages((prevMessages) =>
            prevMessages.filter(
              (message) =>
                !(
                  message.type === "bot" &&
                  message.text ===
                    "Thank you for uploading the document. Analyzing it."
                )
            )
          );
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "bot",
              text: "",
              file: true,
            },
            {
              type: "bot",
              text: "Let me know, How can i help you",
              file: false,
            },
          ]);
          setFileInfo(response);
          setFileId(response._id);
          setFileSelected(true);
          setUploaded(!uploaded);
          setUpload(!upload);
        }
      }
    }
  };

  const handleChatFileSelect = (file) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "bot",
        text: "",
        file: true,
      },
      {
        type: "bot",
        text: "Let me know, How can i help you",
        file: false,
      },
    ]);
    setChatStatus(true);
    setFileInfo(file);
    setFileId(file.fileId);
    setFileSelected(true);
    setUploaded(!uploaded);
    setUpload(!upload);
  };

  const handleTextareaChange = (e) => {
    const newValue = e.target.value;
    if (!otpSent && chatStatus && !newValue.startsWith("+41") && !isAuthenticated) {
      setTextareaValue("+41");
    } else {
      setTextareaValue(newValue);
    }
  };

  const validatePhoneNumber = (value) => {
    if (!value.trim()) {
      return "Phone number cannot be empty or contain only spaces";
    } else if (value.length > 15) {
      return "Phone number cannot be more than 15 characters.";
    } else if (value.trim() !== value) {
      return "Phone number cannot start or end with spaces";
    } else if (/\s/.test(value)) {
      return "Phone number cannot contain spaces";
    }

    const phoneRegex = /^\+\d{1,3}\d{3,15}$/;
    if (!phoneRegex.test(value)) {
      return "Phone number must start with a country code and contain only digits";
    }
    return "Valid";
  };

  const handleOtpSubmit = async (phoneNumber) => {
    await sendOtp(phoneNumber, true);
    setCountdown();
  };

  const handleUploaded = () => {
    setUploaded(!uploaded);
  };

  return (
    <>
      {fileuploading && (
        <div className="absolute top-[0px] left-[0px] w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-[7]">
          <div className="spinner"></div>
        </div>
      )}
      <div className="flex flex-col min-h-[calc(100vh_-_232px)] h-full ">
        <ChatWithoutLogin
          fileInfo={fileInfo}
          uploaded={uploaded}
          phoneNumber={phoneNumber}
          messages={messages}
          handleOtpSubmit={handleOtpSubmit}
          countdown={countdown}
          setCountdown={setCountdown}
        />
        <div className="rounded-[6px] w-full border bg-[#17191f] border-[#333] relative min-h-[55px] textarea_wrap flex items-center">
          <textarea
            value={textareaValue}
            onChange={handleTextareaChange}
            className="text-left pr-24 w-full py-1 px-4 leading-[22px] outline-none max-h-[150px] overflow-y-auto text-[14px] text-white text-opacity-50 chatbox-bg resize-none"
            placeholder="Ask a Question"
            onKeyDown={(e) => {
              if (e && e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!submit) handleSendMessage();
              }
            }}
          />
          <div className="flex absolute right-[8px] bottom-[7px] items-center">
            <span className="relative pr-3">
              <IoMdAttach
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  if (isAuthenticated) {
                    setUpload(!upload);
                  } else if (!chatStatus) {
                    setChatStatus(true);
                    setTextareaValue("+41");
                    setMessages((prevMessages) => [
                      ...prevMessages,
                      {
                        type: "bot",
                        text: "Before we proceed, I will need your contact number.",
                        login: false,
                      },
                    ]);
                  }
                }}
              />
              {upload && (
                <div
                  className="bg-[#2b2b2b] min-w-[250px] rounded-[12px]  absolute right-[5px] bottom-[calc(100%_+_22px)] z-[3]"
                  ref={uploadRef}
                >
                  <ul>
                    <li
                      className={`flex items-center gap-x-1 p-2 ${
                        isAuthenticated ? "border-b-[1px]" : ""
                      } border-[#434343]`}
                    >
                      <MdOutlineFileUpload color={"#fff"} size={25} />
                      <label className="cursor-pointer" htmlFor="upload_file">
                        <input
                          type="file"
                          id="upload_file"
                          name="uploadFile"
                          className="hidden"
                          value=""
                          onChange={handleFileChange}
                          accept=".pdf,.docx"
                        />
                        <span>Upload a new policy</span>
                      </label>
                    </li>
                    {isAuthenticated && (
                      <li className="relative flex items-center p-3 gap-x-1">
                        <button
                          onClick={handleUploaded}
                          className="cursor-pointer"
                        >
                          Select from uploaded policies
                        </button>
                        {uploaded && (
                          <div className="bg-[#2b2b2b] min-w-[260px] rounded-[12px] shadow overflow-hidden absolute right-[0px] bottom-[0px] z-[4]">
                            {policyList?.length > 0 ? (
                              <ul className="max-h-[230px] overflow-y-auto">
                                {policyList?.map((item) => (
                                  <button
                                    key={item.fileId}
                                    className="flex items-center gap-x-1 px-3 py-2 relative border-b-[1px] border-[#434343] w-full"
                                    onClick={() => handleChatFileSelect(item)}
                                  >
                                    <div className="flex items-center flex-1 max-w-[calc(100%_-_45px)]">
                                      <span className="min-w-[30px] h-[30px] bg-[#fff] flex items-center justify-center mr-3 rounded-[50%]">
                                        <CiFileOn
                                          color={"#F04438"}
                                          size={17}
                                          strokeWidth={"1"}
                                        />
                                      </span>
                                      <span className="">{item.name}</span>
                                    </div>
                                  </button>
                                ))}
                              </ul>
                            ) : (
                              <div className="flex flex-col items-center justify-center w-full py-6">
                                <Image
                                  src={NoPolicyImg}
                                  alt="logo"
                                  width="100"
                                  height="100"
                                  className="pb-4"
                                  loading="lazy"
                                />
                                <BodyText text="No Policy Available" />
                              </div>
                            )}
                            <div className="relative flex items-center px-3 py-2 cursor-pointer gap-x-1">
                              <IoArrowBack
                                color={"#fff"}
                                size={20}
                                onClick={handleUploaded}
                              />
                              <button onClick={handleUploaded}>Go Back</button>
                            </div>
                          </div>
                        )}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </span>
            <Button
              additionalClass="rounded-[6px] px-2 min-h-[40px] w-[40px] flex items-center justify-center"
              label={<IoSend size={20} />}
              onClick={() => handleSendMessage()}
              disabled={submit}
              isSubmittin={submit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

ChatScreen.propTypes = {
  chatWithUpload: PropTypes.bool,
  status: PropTypes.bool,
};
