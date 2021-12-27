import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { scales } from "../scales.js";

export default function Dashboard({ cluster }) {
  const { data: session, status } = useSession();
  const Router = useRouter();

  const [sums, setSums] = useState({});
  const [name, setName] = useState("");
  const [n, setN] = useState(1);
  const [clusters, setClusters] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [exportData, setExportData] = useState([]);

  useEffect(async () => {
    const response = await fetch("http://localhost:3000/api/get-cluster");
    const clusterData = await response.json();
    let tokenData = [];
    for (let i = 0; i < clusterData.length; i++) {
      const tokens = await fetch("http://localhost:3000/api/get-tokens", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokens: clusterData[i].tokens }),
      });
      let temp = await tokens.json();
      tokenData.push(temp);
    }
    setTokens(tokenData);
    setClusters(clusterData);
  }, []);

  useEffect(() => {
    tokens.forEach((token) => {
      token.forEach((item) => {
        if (!item.sums || item.sums.length === 0) {
          console.log(item);
          setExportData([
            ...exportData,
            {
              id: item._id,
              userToken: item.userToken,
              ...item.results,
            },
          ]);
        }
      });
    });
  }, [tokens]);

  useEffect(() => {
    console.log("Export data: ", exportData);
  }, [exportData]);

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
          clusters.map((cluster, key) => {
            return (
              <div key={key}>
                <h3>{cluster.name}</h3>
                <table>
                  <tr>
                    <th>Token</th>
                    {tokens[key][0].results.map((result, key) => {
                      return scales[result.name].skale.map((scale, key) => (
                        <th>{scale}</th>
                      ));
                    })}
                  </tr>
                  {tokens.length > 0 &&
                    tokens[key].map((header, key) => {
                      if (header.results)
                        return (
                          <tr>
                            <td>{header.userToken}</td>
                            {header.results.map((result, key) => {
                              return result.sums.map((sum, index) => {
                                return <td>{sum}</td>;
                              });
                            })}
                          </tr>
                        );
                      return;
                    })}
                  <br />
                </table>
              </div>
            );
          })}
      </div>
    </div>
  );
}
