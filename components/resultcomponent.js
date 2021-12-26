import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ResultComponent(props) {
  const granice = props.scale.granice[props.propsGender][props.propsAge];
  const n_skala = props.scale.n_skala;
  useEffect(() => {
    console.log(props.propsGender, props.propsAge);
  }, []);
  return (
    <div className="page-container">
      <h1>{props.scale.skalaIme}</h1>
      {Object.keys(granice).map((item, key) => {
        if (props.propsSums[key] < granice[item][0])
          return (
            <p key={item}>
              Vaš rezultat je ispodprosječan i spada u prvi kvartil rezultata
              (25% najnižih rezultata za ispitanike vašeg spola i dobi)
            </p>
          );
        else if (
          props.propsSums[key] >= granice[item][0] &&
          props.propsSums[key] <= granice[item][2]
        )
          return (
            <p key={item}>
              Važ rezultat je prosječan i spada u srednjih 50% rezultata (26. -
              74. percentil)
            </p>
          );
        return (
          <p key={item}>
            Važ rezultat je iznadprosječan i spada u četvrti kvartil rezultata
            (25% najviših rezultata za ispitanike vašeg spola i dobi)
          </p>
        );
      })}
      <div
        style={{
          height: "auto",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Bar
          datasetIdKey="id"
          data={{
            labels: Object.keys(granice),
            datasets: [
              {
                label: "Rezultati",
                yAxisID: "yAxis",
                data: Object.keys(granice).map(
                  (key, index) => props.propsSums[index] / n_skala[key]
                ),
                backgroundColor: Object.keys(granice).map(
                  (key, index) =>
                    (props.propsSums[index] < granice[key][1] &&
                      "rgba(255, 99, 132, 0.2)") ||
                    (props.propsSums[index] > granice[key][1] &&
                      "rgba(75, 192, 192, 0.2)") ||
                    "rgba(255, 206, 86, 0.2)"
                ),
                borderColor: Object.keys(granice).map(
                  (key, index) =>
                    (props.propsSums[index] < granice[key][1] &&
                      "rgba(255,99,132,1)") ||
                    (props.propsSums[index] > granice[key][1] &&
                      "rgba(75, 192, 192, 1)") ||
                    "rgba(54, 162, 235, 1)"
                ),
                borderWidth: 1,
              },
              {
                label: "Prosječni rezultati",
                data: Object.keys(granice).map(
                  (key, index) => granice[key][1] / n_skala[key]
                ),
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            indexAxis: "y",
            aspectRatio: 1.5,
            maintainAspectRatio: true,
            scales: {
              yAxis: {
                ticks: {
                  font: {
                    size: 9,
                  },
                },
              },
            },
          }}
        />{" "}
      </div>
    </div>
  );
}
