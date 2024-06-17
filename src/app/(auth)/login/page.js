"use client";
import React, {useState } from "react";
import Logo from "../../../assets/img/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import H3 from "@/components/molecules/headings/h3";
import LoginForm from "@/components/form/login-form";
import Sidebanner from "@/components/molecules/auth/sidebanner";
import { useAuth } from "@/context/authContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "@/utils/withAuth";

const Login = () => {
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const { sendOtp } = useAuth();

  const onSubmit = async (data) => {
    setSubmit(true);
    localStorage.setItem("phone", `+41${data?.phoneNumber}`);
    const response = await sendOtp(`+41${data?.phoneNumber}`);
    if (response) {
      toast.success("OTP sent successfully!", { autoClose: 1000 });
      setTimeout(() => {
        router.push("/otp");
        setSubmit(false);
      }, 1500);
    } else {
      toast.error("Invalid Contact Number", { autoClose: 4000 });
      setSubmit(false);
    }
  };

  return (
    <div className="flex w-full h-screen font-Manrope">
      <ToastContainer />
      <div className="relative flex flex-col justify-center w-full pt-4 overflow-hidden md:w-1/2 bg-secondary before_grad after_grad">
        <div className="w-full px-[calc(50%_-_180px)] flex flex-col  gap-6 z-[1]">
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              width="72"
              height="37"
              className="pb-14"
              loading="lazy"
            />
          </Link>
          <div className="flex flex-col w-full gap-3">
            <H3
              label="Enter your contact number"
              additionalClass=""
              textColor="text-white"
            />
          </div>
          <LoginForm onSubmit={onSubmit} isSubmit={submit} />
        </div>
      </div>
      <Sidebanner />
    </div>
  );
};

export default withAuth(Login, { redirectIfAuthenticated: true });
