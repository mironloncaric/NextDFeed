import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ResultComponent(props) {
  const granice = props.scale.granice[props.propsGender][props.propsAge];
  return (
    <div className="page-container">
      <h1>{props.scale.skalaIme}</h1>
      {Object.keys(granice).map((item, key) => {
        if (props.propsSums[key] < granice[item][0]) return <p>Prvi slučaj</p>;
        else if (
          props.propsSums[key] > granice[item][0] &&
          props.propsSums[key] < granice[item][1]
        )
          return <p>Drugi slučaj</p>;
        else if (
          props.propsSums[key] > granice[item][1] &&
          props.propsSums[key] < granice[item][2]
        )
          return <p>Treći slučaj</p>;
        return <p>Četvrti slučaj</p>;
      })}
      <Bar
        datasetIdKey="id"
        data={{
          labels: Object.keys(granice),
          datasets: [
            {
              label: "Prosiječni rezultat",
              data: props.propsSums,
            },
            {
              label: "Rezultati",
              data: Object.keys(granice).map((key, item) => granice[key][1]),
            },
          ],
        }}
        options={{
          indexAxis: "y",
          aspectRatio: 1.1,
          scales: {
            yAxes: [
              {
                ticks: {
                  fontSize: 7,
                },
              },
            ],
          },
        }}
      />{" "}
    </div>
  );
}
