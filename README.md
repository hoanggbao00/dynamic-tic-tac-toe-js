# dynamic-tic-tac-toe-js
tic-tac-toe javascript (with dynamic render, and dynamic line to win)

## Ref: [CodeSanbox](https://codesandbox.io/p/sandbox/tic-tac-toedynamic-yirkd)
Replace old check win function - which is check same as size of dimension (boardSize) with new check win function

## Idea
Idea Function: Start from where last move is, then check below situations
+ Check Horizontal: check left and right with `col±1`
+ Check Vertical:  check up and down with `row±1`
+ Check Diagonal: with UP-LEFT _(row-1/col-1)_ & DOWN-RIGHT _(row+1/col+1)_
+ Check Reverse Diagonal: with DOWN-LEFT _(row+1/col-1)_ & UP-RIGHT _(row-1/col+1)_

## Test
By open `game.js` then change the below variable to test change
+ `dimension`: boardSize _(ex: 5 is 5x5 board)_
+ `winLine`: line to win _(ex: 3, just need 3 line nearby to win)_
