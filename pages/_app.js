import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import index from "./index.js";
import "../components/global.css";
import Layout from "../components/layout.js";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
