import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

import index from "./index.js";
import "../components/global.css";
import Layout from "../components/layout.js";
import { TokenProvider } from "../components/tokencontext.js";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <TokenProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TokenProvider>
    </SessionProvider>
  );
}
