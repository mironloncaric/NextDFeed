import { useEffect } from "react";
import { useSession } from "next-auth/react";

import Navbar from "./navbar.js";
import Footer from "./footer.js";

export default function Layout({ children }) {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "75vh" }}>{children}</main>
      <Footer />
    </>
  );
}
