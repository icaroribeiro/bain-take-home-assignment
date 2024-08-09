import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world",
  });
});

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
