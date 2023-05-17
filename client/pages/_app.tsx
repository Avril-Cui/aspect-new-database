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

const ProtectedRoute = dynamic(() => import("../components/ProtectedRoute"), {
  ssr: false,
});
const EndSeason = dynamic(() => import("../components/EndSeason"), {
  ssr: false,
});

const AuthRequired = ["/dashboard"];
const EndSeasonRequired = ["/season-review"];
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <CookiesProvider>
        {EndSeasonRequired.includes(router.pathname) ? (
          <EndSeason>
            {AuthRequired.includes(router.pathname) ? (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </EndSeason>
        ) : (
          <>
            {AuthRequired.includes(router.pathname) ? (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
        </>
        )}
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;