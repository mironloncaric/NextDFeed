import clientPromise, { client } from "../../lib/mongodb.js";
import { getSession } from "next-auth/react";

export default async function postToken(req, res) {
  try {
    const { userToken, name, sums } = req.body;
    const tokens = client.db().collection("tokens");
    const token = await tokens.findOne({ userToken });
    let url = undefined;
    if (sums) {
      console.log("hello");
      await tokens.updateOne({ _id: token._id }, { $pop: { sums: -1 } });
      await tokens.updateOne(
        { _id: token._id },
        { $push: { results: { sums, name } } }
      );
    }
    const redirectToken = await tokens.findOne({ _id: token._id });
    if (redirectToken.sums[0])
      return res.redirect(301, `/ispunjavanje/${redirectToken.sums[0]}`);
    else return res.redirect(301, "/");
  } catch (err) {
    console.log(err);
  }
}
