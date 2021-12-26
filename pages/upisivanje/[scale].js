import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import UpisivanjeComponent from "../../components/upisivanjecomponent.js";
import ResultComponent from "../../components/resultcomponent.js";
import { scales } from "../../scales.js";

export default function Ispunjavanje() {
  const router = useRouter();
  const { scale } = router.query;

  const [upisDisplay, setUpisDisplay] = useState(true);
  const [resultDisplay, setResultDisplay] = useState(false);
  const [propsGender, setPropsGender] = useState();
  const [propsAge, setPropsAge] = useState();
  const [propsSums, setPropsSums] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [scale]);

  if (upisDisplay) {
    return scale ? (
      <UpisivanjeComponent
        name={scale}
        scale={scales[scale]}
        setUpisDisplay={setUpisDisplay}
        setPropsGender={setPropsGender}
        setPropsAge={setPropsAge}
        setPropsSums={setPropsSums}
      />
    ) : (
      <div>Waiting...</div>
    );
  } else
    return (
      <ResultComponent
        scale={scales[scale]}
        propsAge={propsAge}
        propsGender={propsGender}
        propsSums={propsSums}
      />
    );
  // return <div>{scale}</div>;
}
