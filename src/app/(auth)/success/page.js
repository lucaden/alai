"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebanner from "@/components/molecules/auth/sidebanner";
import successGif from "@/assets/img/success.gif";
import BodyText from "@/components/molecules/bodyText";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verification Successfull");

  useEffect(() => {
    const userDataString = JSON.parse(localStorage.getItem("user"));
    if (userDataString) {
      try {
        console.log("userData", userDataString);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
    if (searchParams.get("from") === "otp") {
      setMessage("Login Successfull");
    } else {
      setMessage("Registration Successfull");
    }
    const timer = setTimeout(() => {
      if (!userDataString?.firstName) {
        router.push("/signup");
      } else {
        router.push("/dashboard");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, searchParams.get("from")]);

  useEffect(() => {}, []);

  return (
    <div className="flex w-full h-screen font-Manrope">
      <ToastContainer />
      <div className="relative flex flex-col justify-center w-full pt-4 overflow-hidden md:w-1/2 bg-secondary before_grad after_grad">
        <div className="w-full px-[calc(50%_-_180px)] flex flex-col sm:items-start items-center gap-6 z-[1]">
          <div className="flex flex-col w-full gap-3">
            <Image src={successGif} alt="my gif" height={500} width={500} />
            <BodyText
              additionalClass="text-center text-[18px]"
              text={message}
            />
          </div>
        </div>
      </div>
      <Sidebanner />
    </div>
  );
};

const page = () => {
  return (
    <Suspense>
      <SignUp />
    </Suspense>
  );
};

export default page;
