
type Player = "X" | "O";
type Cell = Player | " ";
type Row = [Cell, Cell, Cell];
export type Board = [Row, Row, Row];

/**
 * This class represents a game of Tic Tac Toe.
 */
export class Game {

  private board: Board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  // winner is either a player, "Draw" or null (representing ongoing game)
  private winner: Player | "Draw" | null = null;

  /**
   * A method to draw a cell on the board.
   * @param player the player who is making a move
   * @param row the row of the cell to draw on
   * @param col the column of the cell to draw on
   */
  public drawCell(player: Player, row: number, col: number): void {
    if (col < 0 || col > 2 || row < 0 || row > 2) {
      throw new Error(`Cell [${row}, ${col}] is out of bounds`);
    }
    if (this.board[row][col] !== " ") {
      throw new Error(`Cell [${row}, ${col}] is already taken`);
    }
    this.board[row][col] = player;
    this.refreshWinner();
  }

  /**
   * A method that refreshes the winner of the game.
   */
  private refreshWinner(): void {

    // Check rows
    for (const row of this.board) {
      if (row[0] !== " ")
        if (row[0] === row[1] && row[1] === row[2]) {
          this.winner = row[0];
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] !== " ")
        if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
          this.winner = this.board[0][i] as Player;
        }
    }

    // Check diagonals
    if (this.board[0][0] !== " ")
      if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
        this.winner = this.board[0][0];
      }
    if (this.board[0][2] !== " ")
      if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
        this.winner = this.board[0][2];
      }

    // Check for draw
    if (this.winner === null) {
      let draw = true;
      for (const row of this.board) {
        for (const cell of row) {
          if (cell === " ") {
            draw = false;
            break;
          }
        }
      }
      if (draw) {
        this.winner = "Draw";
      }
    }
  }

  /**
   * A method that returns a string representation of the game
   * @returns a string representation of the game
   */
  toString(): string {
    let res = "";
    if (this.winner) {
      if (this.winner === "Draw")
        res += "Game is done!\nIt's a draw!\n\n";
      else
        res += `Game is done!\nWinner: ${this.winner}\n\n`;
      // TODO: remove from cache
    }
    else
      res += "Game is ongoing\n\n";
    res += this.board.map(row => row.join(" | ")).join("\n---------\n");
    return res;
  }
}
