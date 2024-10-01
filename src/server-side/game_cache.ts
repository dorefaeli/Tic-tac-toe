import cache from 'memory-cache';
import { Game } from './game';

/**
 * This class is a singleton that caches games.
 * It is used to store games in memory.
 */
export class GameCache {
  private static instance: GameCache;

  private constructor() { }

  public static getInstance(): GameCache {
    if (!GameCache.instance) {
      GameCache.instance = new GameCache();
    }
    return GameCache.instance;
  }

  public load(id: string): Game {
    const game = cache.get(id);
    if (game === null) {
      throw new Error(`Game with id: ${id} not found`);
    }
    return game;
  }

  public createNew(): string {
    const id = Math.random().toString(16).slice(2);
    const game = new Game();
    cache.put(id, game);
    return id;
  }
}
