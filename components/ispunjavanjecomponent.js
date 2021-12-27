import { useState, useEffect } from "react";

import { useToken } from "./tokencontext.js";
import styles from "./ispunjavanecomponent.module.css";
import { useRouter } from "next/router";
import { scales } from "../scales.js";

export default function IspunjavanjeComponent(props) {
  const { token } = useToken();
  const router = useRouter();

  const [gender, setGender] = useState("female");
  const [age, setAge] = useState(14);
  const [sums, setSums] = useState({});
  const [itemsValue, setItemsValue] = useState(
    Object.keys(props.scale.pitanja).map((item, key) => {
      return 0;
    })
  );

  useEffect(() => {
    setItemsValue(
      Object.keys(props.scale.pitanja).map((item, key) => {
        return 0;
      })
    );
  }, [router]);

  if (props) {
    return (
      <div className="page-container">
        <h3 className="scale-name">{props.scale.skalaIme}</h3>
        {props.scale.pitanja.map((question, index) => (
          <div className={styles.scaleInputItem} key={index}>
            <h5>{question}</h5>
            <div className={styles.questionRadio}>
              <div className={styles.scaleInputRadioItem}>
                <label>1</label>
                <input
                  checked={itemsValue[index] === 1}
                  onChange={(e) => {
                    let a = itemsValue.slice();
                    a[index] = 1;
                    setItemsValue(a);
                  }}
                  value={1}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>2</label>
                <input
                  checked={itemsValue[index] === 2}
                  onChange={(e) => {
                    let a = itemsValue.slice();
                    a[index] = 2;
                    setItemsValue(a);
                  }}
                  value={2}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>3</label>
                <input
                  checked={itemsValue[index] === 3}
                  onChange={(e) => {
                    let a = itemsValue.slice();
                    a[index] = 3;
                    setItemsValue(a);
                  }}
                  value={3}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>4</label>
                <input
                  checked={itemsValue[index] === 4}
                  onChange={(e) => {
                    let a = itemsValue.slice();
                    a[index] = 4;
                    setItemsValue(a);
                  }}
                  value={4}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>5</label>
                <input
                  checked={itemsValue[index] === 5}
                  onChange={(e) => {
                    let a = itemsValue.slice();
                    a[index] = 5;
                    setItemsValue(a);
                  }}
                  value={5}
                  type="radio"
                  name={index}
                />
              </div>
            </div>
          </div>
        ))}
        {!token && (
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
        )}
        <button
          className="align-center btn-outline"
          onClick={() => {
            console.log(itemsValue);
            let scaleSums = {};
            Object.keys(props.scale.sumsTemplate).forEach((item, key) => {
              let a = 0;
              props.scale.sumsTemplate[item].forEach((num) => {
                a += Number(itemsValue[num - 1]);
              });
              scaleSums[item] = a;
            });
            //setItemsValue(0);
            props.setPropsSums(scaleSums);
            props.setPropsAge(age);
            props.setPropsGender(gender);
            console.log(scaleSums);
            if (token) {
              fetch("/api/post-token", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userToken: token,
                  name: props.name,
                  sums: scaleSums,
                }),
              }).then((response) => {
                router.push(response.url);
              });
            } else {
              props.setUpisDisplay(false);
            }
          }}
        >
          Submit
        </button>
        <br />
      </div>
    );
  } else {
    return <span>Loading...</span>;
  }
}
