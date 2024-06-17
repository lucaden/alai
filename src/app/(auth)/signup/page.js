"use client";
import React, { useState } from "react";
import Logo from "../../../assets/img/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import H3 from "@/components/molecules/headings/h3";
import Sidebanner from "@/components/molecules/auth/sidebanner";
import SignUpForm from "@/components/form/signup-form";
import { useAuth } from "@/context/authContext";
import withAuth from "@/utils/withAuth";

const SignUp = () => {
  const [submit, setSubmit] = useState();
  const router = useRouter();
  const { updateUser } = useAuth();
  const onSubmit = async (data) => {
    setSubmit(true);
    try {
      const response = await updateUser(data.first_name, data.last_name);
      if (response) {
        router.push("/success?from=signup");
      } else {
        setSubmit(false);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      setSubmit(false);
    }
  };

  return (
    <div className="flex w-full h-screen font-Manrope">
      <ToastContainer />
      <div className="relative flex flex-col justify-center w-full pt-4 overflow-hidden md:w-1/2 bg-secondary before_grad after_grad">
        <div className="w-full px-[calc(50%_-_180px)] flex flex-col sm:items-start items-center gap-6 z-[1]">
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
              label="Let's Get Started"
              additionalClass=""
              textColor="text-white"
            />
          </div>
          <SignUpForm onSubmit={onSubmit} isSubmit={submit} />
        </div>
      </div>
      <Sidebanner />
    </div>
  );
};

export default withAuth(SignUp, { checkLocalStorage: { signupToken: true } });
