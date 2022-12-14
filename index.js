const express = require("express");
const app = express();

const firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
  databaseURL: `https://${process.env.GOOGLE_CLOUD_PROJECT}.firebaseio.com`,
});

const { initializeSwagger } = require("./swagger.js");

require("dotenv").config();

/**
 *  @swagger
 * /verify:
 *  get:
 *    tags:
 *      - Verify
 *    description: Verify a token given in the Authorization header
 *    responses:
 *      '200':
 *         description: A successful response
 * */
app.get("/verify", async function (req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401);
    return res.send("Unauthorized");
  }

  try {
    const idToken = authHeader.split(" ")[1];
    const appCheckClaims = await firebaseAdmin.appCheck().verifyToken(idToken);

    return res.send(appCheckClaims);
  } catch (err) {
    res.status(401);
    return res.send(err);
  }
});
if (process.env.NODE_ENV === "development") {
  initializeSwagger(app);
}

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}`);
