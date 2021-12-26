import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import styles from "./navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className={`${styles.nav} nav`}>
        <Link href="/">
          <a className={styles.navlogo}>DFeed</a>
        </Link>
        <div id={show ? "show" : ""} className={`${styles.navlinks} navlinks`}>
          <div>
            <Link href="/">
              <a className={styles.navlink}>Izvori</a>
            </Link>
            <Link href="/">
              <a className={styles.navlink}>O nama</a>
            </Link>
            <Link href="/">
              <a className={styles.navlink}>Suradnje</a>
            </Link>
          </div>
        </div>
        <button
          className={styles.hidetoggle}
          id="hide-toggle"
          onClick={() => {
            show ? setShow(false) : setShow(true);
          }}
        >
          ...
        </button>
      </nav>
    </>
  );
}
