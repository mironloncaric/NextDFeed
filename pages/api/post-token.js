import clientPromise, { client } from "../../lib/mongodb.js";
import { getSession } from "next-auth/react";

export default async function postToken(req, res) {
  try {
    const { userToken, name, sums } = req.body;
    const tokens = client.db().collection("tokens");
    const token = await tokens.findOne({ userToken });
    const url = token.sums[0];
    await tokens.updateOne({ _id: token._id }, { $pop: { sums: -1 } });
    if (req.body.sums) {
      await tokens.updateOne(
        { _id: token._id },
        { $push: { results: { sums: req.body.sums, name } } }
      );
    }
    if (url) return res.redirect(301, `/ispunjavanje/${url}`);
    else return res.redirect(301, "/");
  } catch (err) {
    console.log(err);
  }
}
