# Tic-tac-toe game (home assignment)

## Postman collection

See [Postman Collection](./tic-tac-toe.postman_collection.json)

## Description

This is a simple implementation of the tic-tac-toe game. The game is played by two players on a 3x3 board. The players take turns to place their mark (X or O) on the board. The first player to place three of their marks in a row (horizontally, vertically, or diagonally) wins the game. If the board is full and no player has won, the game ends in a draw.

## How to run the program

To run the program, execute the following command in the terminal:

`npm run build`

`npm run start`

## How to play the game (how to interact with the program, assuming you know how to play tic-tac-toe)

The current implementation supports playing the game using Postman. The server listens on port 3000 by default.

### Starting a new game

To start a new game, send an empty POST request to `{{BASE_URL}}/game_cli/new`. The response will contain the game ID, which you will need to make moves in the game. Each game has a unique ID and is accessible for 1 hour after creation. (assuming the server wasn't restarted)

### Making a move

The game is played by sending POST requests to `{{BASE_URL}}/game_cli/{{GameID}}/draw_cell`. The request body should contain the player's mark (X or O) and the position where the player wants to place their mark. The position should be coordinates provided as properties `Row`,`Column`. For example, to place an X in the top-left corner, send a POST request with the following body:

```
{
    "Player": "X",
    "Row": "0",
    "Column": "0"
}
```

### Getting the current state of the game

To get the current state of the game, send a GET request to `{{BASE_URL}}/game_cli/{{GameID}}`. The response will contain the current state of the game board.

### Ending the game

After each move, the server checks if the game has ended. If the game has ended, the server will respond with the game result. If the game has not ended, the server will respond with the current state of the game board.

## Possible improvements

If I had more time, I would implement the following improvements:

- Add a web interface for playing the game.
- Change the game state representation to a more user-friendly format. (currently the formatting of the game board is not very readable)
- Add validation to check if the player who is making a move is the player who should be making a move. (and make the Player property in the request body optional)
- Add more tests to cover edge cases.
- Add a feature to delete games after they have ended. (instead of keeping them for 1 hour or until the server is restarted)
- Add a feature to allow players to play against the computer.
