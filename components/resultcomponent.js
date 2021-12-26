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
          maxWidth: "500px",
          minHeight: "900px",
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
                data: Object.keys(granice).map(
                  (key, index) => props.propsSums[index] / n_skala[key]
                ),
                backgroundColor: Object.keys(granice).map(
                  (key, index) =>
                    (props.propsSums[index] < granice[key][1] && "red") ||
                    (props.propsSums[index] > granice[key][1] && "green") ||
                    "lightblue"
                ),
              },
              {
                label: "Prosječni rezultati",
                data: Object.keys(granice).map(
                  (key, index) => granice[key][1] / n_skala[key]
                ),
                backgroundColor: "beige",
              },
            ],
          }}
          options={{
            indexAxis: "y",
            aspectRatio: 1.5,
            maintainAspectRatio: true,
            scales: {
              yAxes: {
                ticks: {
                  fontSize: 5,
                },
              },
            },
          }}
        />{" "}
      </div>
    </div>
  );
}
