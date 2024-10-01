import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const gameCLI = require("./server-side/game_cli_api");
const game = require("./server-side/game_api");

app.get("/", (req: Request, res: Response) => {
  res.send("Tic-tac-toe game server");
});

app.use("/game_cli", gameCLI);
app.use("/game", game);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
