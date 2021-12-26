import { useState, useEffect } from "react";

import { useToken } from "./tokencontext.js";
import styles from "./ispunjavanecomponent.module.css";
import { useRouter } from "next/router";

export default function IspunjavanjeComponent(props) {
  const { token } = useToken();
  const router = useRouter();

  const [gender, setGender] = useState("female");
  const [age, setAge] = useState(14);
  const [sums, setSums] = useState();
  const [itemsValue, setItemsValue] = useState(
    Object.keys(props.scale.skale).map((item, key) => {
      return 0;
    })
  );

  return (
    <div className="page-container">
      <h3 className="scale-name">{props.scale.skalaIme}</h3>
      {Object.keys(props.scale.sumsImena).map((key, index) => (
        <div key={index} className={styles.upisInput}>
          <span className={styles.upisInputTitle}>
            {props.scale.sumsImena[key]}
          </span>
          <input
            className={styles.upisInputResult}
            name={key}
            type="number"
            value={itemsValue[index]}
            onChange={(e) => {
              let a = itemsValue.slice();
              a[index] = e.target.value;
              setItemsValue(a);
            }}
          />
        </div>
      ))}
      <>
        <label htmlFor="age">Starost</label>
        <input
          name="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="female">Žensko</option>
          <option value="male">Muško</option>
        </select>
      </>
      <button
        className="align-center btn-outline"
        onClick={() => {
          console.log(itemsValue);
          props.setPropsSums(itemsValue);
          props.setPropsAge(age);
          props.setPropsGender(gender);
          props.setUpisDisplay(false);
        }}
      >
        Submit
      </button>
      <br />
    </div>
  );
}
