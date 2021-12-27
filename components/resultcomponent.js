import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ResultComponent(props) {
  const granice = props.scale.granice[props.propsGender][props.propsAge];
  return (
    <div className="page-container">
      <h1>{props.scale.skalaIme}</h1>
      {Object.keys(granice).map((item, key) => {
        if (props.propsSums[item] < granice[item][0])
          return (
            <p key={key}>
              Vaš rezultat je ispodprosječan i spada u prvi kvartil rezultata
              (25% najnižih rezultata za ispitanike vašeg spola i dobi)
            </p>
          );
        else if (
          props.propsSums[item] >= granice[item][0] &&
          props.propsSums[item] <= granice[item][2]
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
      <Bar
        datasetIdKey="id"
        data={{
          labels: Object.keys(granice),
          datasets: [
            {
              label: "Prosiječni rezultat",
              data: Object.keys(props.propsSums).map(
                (key, item) => props.propsSums[key]
              ),
              backgroundColor: "lightblue",
            },
            {
              label: "Rezultati",
              data: Object.keys(granice).map((key, item) => granice[key][1]),
              backgroundColor: "beige",
            },
          ],
        }}
        options={{
          indexAxis: "y",
          aspectRatio: 1.1,
        }}
      />{" "}
    </div>
  );
}
