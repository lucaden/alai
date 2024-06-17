"use client";
import React, { useEffect, useState } from "react";
import Logo from "../../../assets/img/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import H3 from "@/components/molecules/headings/h3";
import Sidebanner from "@/components/molecules/auth/sidebanner";
import { useForm } from "react-hook-form";
import Button from "@/components/molecules/button";
import OTPInput from "@/components/molecules/auth/otpInput";
import OTPTimer from "@/components/molecules/auth/otpTimer";
import ResendOTPButton from "@/components/molecules/auth/resendOtpButton";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/molecules/loading";
import withAuth from "@/utils/withAuth";

const OtpInput = () => {
  const [countdown, setCountdown] = useState(120);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const { verifyOtp } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmit(true);
    try {
      const response = await verifyOtp(data.otp);
      if (response.status) {
        toast.success("OTP verified successfully!", { autoClose: 4000 });
        router.push("/success?from=otp");
      } else {
        toast.error(response.message, { autoClose: 4000 });
      }
      setIsSubmit(false);
    } catch (error) {
      toast.error("Failed to validate OTP", { autoClose: 4000 });
    }
  };
  const handleTimeout = () => {
    if (countdown > 0) setCountdown(countdown - 1);
  };

  useEffect(() => {
    if (!localStorage.getItem("phone")) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  return (
    <>
      {loading && <Loading />}
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
                label="Enter OTP"
                additionalClass="mb-8"
                textColor="text-white"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col w-full gap-5 mb-4">
                <OTPInput
                  name="otp"
                  label="Secure code"
                  control={control}
                  errors={errors}
                  rules={{ required: "OTP is required." }}
                />
              </div>
              <p className="text-[#fff] text-sm text-center mb-24">
                Didn&apos;t receive the OTP?{" "}
                {countdown > 0 ? (
                  <OTPTimer seconds={countdown} onTimeout={handleTimeout} />
                ) : (
                  <ResendOTPButton email={null} setCountdown={setCountdown} />
                )}
              </p>
              <Button
                isSubmitting={isSubmit}
                disabled={!isValid || isSubmit}
                type="submit"
                additionalClass="font-regular py-[10px] mt-[32px] w-full"
                label="Verify OTP"
              />
            </form>
          </div>
        </div>
        <Sidebanner />
      </div>
    </>
  );
};

export default withAuth(OtpInput, { checkLocalStorage: { phone: true } });
