// import Header from ""
import dynamic from "next/dynamic";
import styles from "./Layout.module.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Header = dynamic(() => import("../Header/Header"), {
  ssr: false,
});

const Layout = ({ children }) => {
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirect(window.location.origin);
    }
    console.log(redirect);
    console.log(typeof redirect);
  }, [redirect]);
  return (
    <Auth0Provider
      domain="dev-by68bdxzfsz4zee3.us.auth0.com"
      clientId="D7iASVLJiFdm6mves3rAUWDsb4k9Ug5q"
      authorizationParams={{
        redirect_uri: "https://www.aspect-game.com/",
      }}
    >
      <div className={styles.layout}>
        <div>
          <Header />
          {children}
        </div>
      </div>
    </Auth0Provider>
  );
};

export default Layout;
