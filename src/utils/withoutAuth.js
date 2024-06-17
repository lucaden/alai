"use client";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const withoutAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      const checkAuth = async () => {
        if (!localStorage.getItem("token")) {
          if (["/login", "/otp"].includes(pathname)) {
            setIsLoading(false);
            return;
          }
        } else {
          const { subscription_status } = JSON.parse(
            localStorage.getItem("user")
          );
          if (subscription_status != "inactive") {
            router.push("/dashboard");
            return;
          } else {
            router.push("/subscription");
            return;
          }
        }
      };

      checkAuth();
    }, [router, isAuthenticated, pathname]);

    return <div>{isLoading ? <></> : <WrappedComponent {...props} />}</div>;
  };

  return AuthComponent;
};
