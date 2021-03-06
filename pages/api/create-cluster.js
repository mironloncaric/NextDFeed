import clientPromise, { client } from "../../lib/mongodb.js";
import { getSession } from "next-auth/react";

export default async function createCluster(req, res) {
  try {
    await clientPromise;
    const users = client.db().collection("users");
    const session = await getSession({ req });
    const user = await users.findOne({ email: session.user.email });
    if (user) {
      const tokens = client.db().collection("tokens");
      const clusters = client.db().collection("clusters");
      const { sums, n, name } = req.body;
      const clusterDoc = await clusters.insertOne({ uid: user._id, name });
      for (var i = 0; i < n; i++) {
        const doc = await tokens.insertOne({ sums });
        const userToken = doc.insertedId.toString().slice(-7);
        await tokens.updateOne(
          { _id: doc.insertedId },
          { $set: { userToken } }
        );
        await clusters.updateOne(
          { _id: clusterDoc.insertedId },
          { $push: { tokens: userToken } }
        );
      }
    }
    res.json({ msg: "Lol" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
}
