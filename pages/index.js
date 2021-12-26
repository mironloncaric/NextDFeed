import { useEffect } from "react";
import Link from "next/link";
import Layout from "../components/layout.js";
import image from "../landing-page.jpg";
import { scales } from "../scales.js";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data } = useSession();
  const list = Object.keys(scales);
  return (
    <>
      <div className="landing-page-poster">
        <Image layout="fill" src={image} />
        <div className="info">
          <h3 className="title">Data Feedback HR</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            gravida fringilla odio, eget pharetra neque condimentum sit amet.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Aenean maximus diam sit amet commodo
            hendrerit. Nam porta metus et turpis consequat pulvinar. Etiam sed
            varius nulla. Mauris ut.
          </p>
        </div>
      </div>

      <div className="items-grid">
        {list.map((key, index) => (
          <div key={index} className="item">
            <h3>{scales[key].skalaIme}</h3>
            <div>
              <Link href={`/ispunjavanje/${scales[key].url}`}>
                Ispunjavanje
              </Link>
              <Link href={`/upisivanje/${scales[key].url}`}>Upisivanje</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
