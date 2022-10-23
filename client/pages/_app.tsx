import "../styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import Layout from "../components/UI/Layout";
import { useRouter } from "next/router";
import store from "../store/store.js";
import { Provider } from "react-redux";
const ProtectedRoute = dynamic(
  () => import("../components/ProtectedRoute"),
  {
    ssr: false,
  }
);
const AuthRequired = ["/dashboard"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
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
    </Provider >
  );
}

export default MyApp;
