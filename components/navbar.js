import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useToken } from "../components/tokencontext.js";

import styles from "./navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  const { createToken, token } = useToken();

  const [show, setShow] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const { data: session } = useSession();
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
          {!session ? (
            <>
              <hr />
              <div className="auth-links">
                <a onClick={() => signIn()} className={styles.navlink}>
                  Authenticate
                </a>
                {!token && (
                  <a
                    onClick={() => {
                      if (showToken) setShowToken(false);
                      else setShowToken(true);
                    }}
                    className={styles.navlink}
                  >
                    Enter a Token
                  </a>
                )}
                {/*
              <input
                name="token"
                type="text"
                value={userToken}
                onChange={(e) => setUserToken(e.target.value)}
              />
              <button
                onClick={() => {
                  // setToken(userToken);
                }}
              >
                Enter a token
              </button>
               */}
              </div>
            </>
          ) : (
            <>
              <hr />
              <div className="auth-links">
                <a className={styles.navlink} onClick={() => signOut()}>
                  Sign out
                </a>
                <Link href="/dashboard">
                  <a className={styles.navlink}>Dashboard</a>
                </Link>
              </div>
            </>
          )}
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
      {showToken && (
        <div className={styles.tokencontainer}>
          <input
            name="token"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
            type="text"
            placeholder="Token"
          />
          <button
            onClick={(e) => {
              createToken(userToken);
              fetch("/api/post-token", {
                method: "POST",
                redirect: "follow",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userToken: userToken }),
              })
                .then((res) => {
                  if (res.redirected) {
                    router.push(res.url);
                    setShowToken(false);
                  }
                })
                .catch((err) => console.log(err));
            }}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}
