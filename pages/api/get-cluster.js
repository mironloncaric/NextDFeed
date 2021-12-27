import clientPromise, { client } from "../../lib/mongodb.js";
import { getSession } from "next-auth/react";

export default async function getCluster(req, res) {
  try {
    await clientPromise;
    const users = client.db().collection("users");
    const session = await getSession({ req });
    const user = await users.findOne({ email: session.user.email });
    if (user) {
      const clusters = client.db().collection("clusters");
      const result = await clusters.find({ uid: user._id }).toArray();
      console.log(result);
      return res.json(result);
    } else {
      return res.status(402).end();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
