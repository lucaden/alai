import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import Loading from "@/components/molecules/loading";

const withAuth = (WrappedComponent, options = {}) => {
  const WithAuthComponent = (props) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       if (authLoading) {
         return; // Do nothing while auth status is loading
       }
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const phone = localStorage.getItem("phone");
      const userInfo = user ? JSON.parse(user) : {};

      const redirectTo = (path) => {
        setIsLoading(false);
        router.push(path);
      };

      const handleLoginRedirection = () => {
        if (isAuthenticated || (user && token)) {
          redirectTo("/dashboard");
        } else {
          setIsLoading(false);
        }
      };

      const handleOtpRedirection = () => {
        if (phone) {
          setIsLoading(false);
        } else {
          redirectTo("/");
        }
      };

      const handleSignupRedirection = () => {
        if (isAuthenticated && (!userInfo.firstName || !userInfo.lastName)) {
          setIsLoading(false);
        } else {
          redirectTo("/dashboard");
        }
      };

      const handleDashboardRedirection = () => {
        if (isAuthenticated && user && token) {
          setIsLoading(false);
        } else {
          redirectTo("/");
        }
      };

      const handleRedirection = () => {
        switch (pathname) {
          case "/login":
            handleLoginRedirection();
            break;
          case "/otp":
            handleOtpRedirection();
            break;
          case "/signup":
            handleSignupRedirection();
            break;
          case "/dashboard":
            console.log("HEre");
            handleDashboardRedirection();
            break;
          default:
            setIsLoading(false);
        }
      };

      handleRedirection();
    }, [isAuthenticated, router, pathname]);

    if (isLoading) {
      return <Loading />;
    }
    return <WrappedComponent {...props} />;
  };

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithAuthComponent.displayName = `withAuth(${wrappedComponentName})`;

  return WithAuthComponent;
};

export default withAuth;
