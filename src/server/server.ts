import express from "express";
import { join } from "path";

const app = express();
const port = 3000;

app.use("/", express.static(join(__dirname, "public")));

app.listen(port, () => console.log(`Server up and running on ${port}`));
