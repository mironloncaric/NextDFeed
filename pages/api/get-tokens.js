import clientPromise, { client } from "../../lib/mongodb.js";
import { getSession } from "next-auth/react";

export default async function getToken(req, res) {
  try {
    await clientPromise;
    const tokens = await client.db().collection("tokens");
    const items = req.body.tokens;
    console.log(tokens.length);
    const response = [];
    for (var i = 0; i < items.length; i++) {
      const append = await tokens.findOne({ userToken: items[i] });
      console.log(append);
      response.push(append);
    }
    res.json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
