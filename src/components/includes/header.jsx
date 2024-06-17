"use client";
import Image from "next/image";
import Link from "next/link";
import LightLogo from "../../assets/img/logo.svg";
import { useAuth } from "@/context/authContext";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Header({ headerType }) {
  const { isAuthenticated, firstName, lastName } = useAuth();
  const [name, setName] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.firstName && user?.lastName) {
        setName(true);
      }
    } else {
      setName(false);
    }
  }, [isAuthenticated, firstName, lastName]);
  return (
    <header
      className={`py-6 ${
        headerType == "transparent"
          ? "absolute bg-transparent w-full z-[3]"
          : "bg-secondary z-[2]"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="logo">
            <figure className="m-0">
              <Link href="/">
                <Image
                  src={LightLogo}
                  alt="Ai Insaurance Brand"
                  width={72}
                  height={39}
                  priority
                />
              </Link>
            </figure>
          </div>
          <div className={`header-nav logo flex  justify-end relative`}>
            <nav>
              <ul className={`flex gap-x-12 flex-row  nav-wrap justify-end`}>
                {isAuthenticated && name ? (
                  <Link
                    href="/dashboard"
                    className={`md:text-[18px] text-base font-Ubuntu font-normal text-white hover:text-primary `}
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className={`md:text-[18px] text-base font-Ubuntu font-normal text-white hover:text-primary `}
                  >
                    Log in
                  </Link>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
Header.propTypes = {
  headerType: PropTypes.oneOf(["transparent", "normal"]),
};
