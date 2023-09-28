import { useRouter } from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const userData = cookies.get("userData");
  const router = useRouter();
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, [router, userData]);

  return (
    <Auth0Provider
      domain="dev-by68bdxzfsz4zee3.us.auth0.com"
      clientId="D7iASVLJiFdm6mves3rAUWDsb4k9Ug5q"
      authorizationParams={{
        redirect_uri: "https://www.aspect-game.com",
      }}
    >
      {userData ? children : <></>}{" "}
    </Auth0Provider>
  );
};

export default ProtectedRoute;
