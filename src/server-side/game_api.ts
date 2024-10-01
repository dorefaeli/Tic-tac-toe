/**
 * This file contains an API for client to interact with.
 */

import express, { Express, Request, Response } from "express";
import { GameCache } from "./game_cache";

const router = express.Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const gameCache = GameCache.getInstance();

router.post("/new", (req: Request, res: Response) => {
  const gameID = gameCache.createNew();
  res.send({ GameID: gameID });
});

router.get("/:gameID", (req: Request, res: Response) => {
  const game = gameCache.load(req.params.gameID);
  res.send(game);
});

router.post("/:gameID/draw_cell", jsonParser, (req: Request, res: Response) => {
  const game = gameCache.load(req.params.gameID);
  game.drawCell(req.body.Player, req.body.Row, req.body.Column)
  res.send(game);
});

module.exports = router;
