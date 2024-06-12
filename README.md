# dynamic-tic-tac-toe-js
tic-tac-toe javascript, with dynamic render, and dynamic line to win

## Ref: [CodeSanbox](https://codesandbox.io/p/sandbox/tic-tac-toedynamic-yirkd)
Replace old check win function - which is check same as size of dimension (boardSize) with new check win function

Idea Function: Start from where last move is, then check below situations
+ Check Horizontal: check left and right with `col±1`
+ Check Vertical:  check up and down with `row±1`
+ Check Diagonal: with UP-LEFT(row-1/col-1) & DOWN-RIGHT(row+1/col+1)
+ Check Reverse Diagonal: with DOWN-LEFT(row+1/col-1) & UP-RIGHT(row-1/col+1)
