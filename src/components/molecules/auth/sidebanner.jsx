import React from "react";
import StartIcon  from "../../../assets/img/Stars.svg";
import Image from "next/image";
import AuthBackground from "../../../assets/img/signup.png";
import H2 from "../headings/h2";

const Sidebanner = () => {
  return (
    <div className="lg:w-2/3 md:w-1/2 w-full md:block hidden">
      <div className="relative sm:min-h-screen h-full flex justify-center">
        <Image
          src={AuthBackground}
          alt="auth bg"
          className="absolute w-full h-full object-cover"
          loading="lazy" />
        <div className="relative z-10 flex flex-col justify-center gap-12 lg:px-[calc(50%_-_280px)] px-[calc(50%_-_180px)]">
          <Image
              src={StartIcon}
              alt="logo"
              width="72"
              height="37"
              className="pb-14"
              loading="lazy"
            />
          <div className="flex flex-col gap-6">
            <H2
              label="Navigate Your Coverage with Confidence"
              additionalClass="text-white font-semibold lg:!text-[72px] md:!text-5xl text-4xl lg:!leading-[90px] tracking-[-2%]"/>
            <p className="lg:text-[20px] text-base font-medium lg:leading-[30px] text-[#fff]">   
            Create a free account and store all your policies at one place. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebanner;
