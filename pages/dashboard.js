import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { scales } from "../scales.js";

export default function Dashboard(props) {
  const { data: session, status } = useSession();
  const Router = useRouter();

  const [sums, setSums] = useState({});
  const [name, setName] = useState("");
  const [n, setN] = useState(1);
  const [clusters, setClusters] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    console.log("lol");
    fetch("/api/get-cluster", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        setClusters(response);
        response.forEach((item, key) => {
          fetch("/api/get-tokens", {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tokens: item.tokens }),
          })
            .then((res) => res.json())
            .then((response) => {
              console.log(response, key);
              const temp = tokens.split();
              temp[key] = response;
              setTokens(temp);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(tokens);
  }, [tokens]);

  if (status === "loading") {
    return <p>loading...</p>;
  }
  if (status === "unauthenticated") {
    Router.push("/");
  }
  return (
    <div className="page-container">
      <h3>Dashboard</h3>
      <input
        name="name"
        type="text"
        value={name}
        placeholder="Cluster Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <div>
        {Object.keys(scales).map((key) => (
          <div
            key={key}
            style={{
              display: "inline-block",
              width: "32%",
            }}
          >
            <label
              style={{
                display: "inline-block",
                width: "70px",
              }}
              htmlFor={key}
            >
              {key}
            </label>
            <input
              style={{
                width: "30px",
              }}
              name={key}
              type="checkbox"
              value={key}
              onChange={(e) => {
                if (sums[e.target.value]) {
                  let a = sums;
                  delete a[e.target.value];
                  setSums(a);
                } else {
                  let a = sums;
                  a[e.target.value] = 1;
                  setSums(a);
                }
              }}
            />
          </div>
        ))}
      </div>
      <br />
      <input
        name="number"
        type="number"
        value={n}
        onChange={(e) => setN(e.target.value)}
        style={{
          width: "100px",
        }}
      />
      <br />
      <button
        onClick={(e) => {
          fetch("/api/create-cluster", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sums: Object.keys(sums),
              n,
              name,
            }),
          });
        }}
      >
        Submit
      </button>
      <br />
      <div>
        {clusters &&
          clusters.length > 0 &&
          clusters.map((cluster, key) => (
            <div key={key}>
              <h3>{cluster.name}</h3>
              <span>{key}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
