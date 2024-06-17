"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  const sendOtp = async (phoneNumber, chat = false) => {
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      if (data.success) {
        setPhoneNumber(phoneNumber);
        setOtpSent(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const verifyOtp = async (otp, chat = false) => {
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setOtpSent(false);
        setIsAuthenticated(true);
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.data));
        setFirstName(responseData.data.firstName);
        setLastName(responseData.data.lastName);
      }
      return chat
        ? responseData.success
        : { status: responseData.success, message: responseData.message };
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateUser = async (firstName, lastName, chat = false) => {
    try {
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        localStorage.setItem("user", JSON.stringify(responseData.data));
        setFirstName(responseData.data.firstName);
        setLastName(responseData.data.lastName);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const listUploadedFiles = async () => {
    try {
      const response = await fetch("/api/list-of-uploaded-files", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });

      const responseData = await response.json();
      return responseData.documents;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const userLogout = async () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteFile = async (fileId) => {
    try {
      const response = await fetch("/api/delete-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ fileId }),
      });

      const responseData = await response.json();
      return responseData.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const uploadFiles = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/insurence-upload", {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        return responseData.data;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const sendUserMessage = async (documentIds, question) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ documentIds, question }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        return responseData.message;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const sendUserGeneralMessage = async (question) => {
    try {
      const response = await fetch("/api/general-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "general-chat-key": "3456789009876543567890",
        },
        body: JSON.stringify({ question }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        return responseData.message;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsAuthenticated(true);
      }
      if (localStorage.getItem("phone")) {
        setPhoneNumber(localStorage.getItem("phone"));
      }
      setLoading(false); // Set loading to false after checking
    }
  }, []);

  const authContextValue = useMemo(
    () => ({
      isAuthenticated,
      sendOtp,
      verifyOtp,
      updateUser,
      phoneNumber,
      listUploadedFiles,
      userLogout,
      setIsAuthenticated,
      deleteFile,
      uploadFiles,
      sendUserGeneralMessage,
      sendUserMessage,
      otpSent,
      firstName,
      lastName,
      loading,
    }),
    [isAuthenticated, phoneNumber, sendOtp, updateUser, verifyOtp]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Add props validation
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
