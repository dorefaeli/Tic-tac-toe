/**
 * This file contains an API for users to interact with through Postman.
 */

import express, { Express, Request, Response } from "express";
import { GameCache } from "./game_cache";

const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const gameCache = GameCache.getInstance();

router.post("/new", (req: Request, res: Response) => {
  const gameID = gameCache.createNew();
  res.send(`Created new game with ID: ${gameID}`);
});

router.get("/:gameID", (req: Request, res: Response) => {
  const game = gameCache.load(req.params.gameID);
  res.send(`${game.toString()}\n\n`);
});

router.post("/:gameID/draw_cell", jsonParser, (req: Request, res: Response) => {
  const game = gameCache.load(req.params.gameID);
  game.drawCell(req.body.Player, req.body.Row, req.body.Column)
  res.send(`${game.toString()}\n\n`);
});

module.exports = router;
