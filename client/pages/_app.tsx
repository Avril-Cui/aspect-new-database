import "../styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import Layout from "../components/UI/Layout";
import { useRouter } from "next/router";
import store from "../store/store.js";
import { Provider } from "react-redux";
import Head from "next/head";
import "intro.js/introjs.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const ProtectedRoute = dynamic(() => import("../components/ProtectedRoute"), {
  ssr: false,
});

const AuthRequired = ["/dashboard"];
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const firebaseConfig = {
    apiKey: "AIzaSyAHY-ZeX87ObL6y3y_2n76GLNxU-24hHs0",
    authDomain: "aspect-fb6c9.firebaseapp.com",
    projectId: "aspect-fb6c9",
    storageBucket: "aspect-fb6c9.appspot.com",
    messagingSenderId: "892850653809",
    appId: "1:892850653809:web:2f32da549a8ae3ee8d69d0",
    measurementId: "G-M8HVV57X9S",
  };
  const app = initializeApp(firebaseConfig);

  if (typeof window !== "undefined") {
    const analytics = getAnalytics(app);
  }

  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <CookiesProvider>
        {AuthRequired.includes(router.pathname) ? (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;
