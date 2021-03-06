import dotenv from "dotenv";
import express from "express";

import Phelia from "phelia";
import { RandomImage } from "./random-image";

dotenv.config();

const app = express();
const port = 3000;

const client = new Phelia(process.env.SLACK_TOKEN);

client.registerComponents([RandomImage]);

// Register the interaction webhook
app.post(
  "/interactions",
  client.messageHandler(process.env.SLACK_SIGNING_SECRET)
);

// This is how you post a message....
client.postMessage(RandomImage, "YOUR MEMBER ID HERE");

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
