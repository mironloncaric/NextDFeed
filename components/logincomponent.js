import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginComponent(props) {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <div>
      <button className="center" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
