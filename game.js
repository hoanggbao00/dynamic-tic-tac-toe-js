/**
 * Reference: https://codesandbox.io/p/sandbox/tic-tac-toedynamic-yirkd
 */

let player1 = 'X';
let player2 = 'O';
let turn = 0;
let reset = 0;
let boardSize = 6; // boardSize
let winLine = 3; // hoanggbao: line to win
let board;

document.getElementById('play_again').disabled = true;
document.getElementById('rst').disabled = true;
document.getElementById('play_again').style.opacity = 0.5;
document.getElementById('rst').style.opacity = 0.5;

function rst() {
	window.location.reload();
}

function play_again() {
	board = new Array(boardSize)
		.fill('')
		.map(() => new Array(boardSize).fill(''));
	initGame();
	turn = 0;
	reset = 0;
	document.getElementById('play_again').disabled = true;
	document.getElementById('rst').disabled = true;
	document.getElementById('play_again').style.opacity = 0.5;
	document.getElementById('rst').style.opacity = 0.5;
	var rm = document.getElementById('field');
	while (rm.firstChild) {
		rm.removeChild(rm.firstChild);
	}
	initGame();
}


function start() {
	//alert(player1+" "+player2);
	document.getElementById('bottom').classList.remove('hide');
	document.getElementById('st').setAttribute('disabled', true);
	document.getElementById('st').style.opacity = 0.5;
	board = new Array(boardSize)
		.fill('')
		.map(() => new Array(boardSize).fill(''));
	initGame();
}
/**
 * Check win
 * @description Check start from this move where player last place
 * @param {*} row position row of this move
 * @param {*} col position column of this move
 * @returns { true } if win
 * @author: hoanggbao
 * Date Modified: 12:04 - 12.06.24
 * TODO: Need Improve
 */
function checkWin(row, col) {
	// if player input line to win greater than boardSize
	if (winLine > boardSize) winLine = boardSize;

	let value = board[row][col];
	if (!value) return;


	// TODO: Need improvement
	function IsHorizontalChecked() {
		let leftCheck = false,
			rightCheck = false;
		let index = 1,
			count = 1;

		while (!leftCheck || !rightCheck) {
			// left check
			if (col - index >= 0 && !leftCheck) {
				if (board[row][col - index] === value) {
					count++;
				} else {
					leftCheck = true;
				}
			} else {
				leftCheck = true;
			}

			if (col + index < boardSize && !rightCheck) {
				if (board[row][col + index] === value) {
					count++;
				} else {
					rightCheck = true;
				}
			} else {
				rightCheck = true;
			}

			index++;

			if (count === winLine) {
				console.log('win');
				return true;
			}
		}

		return false;
	} // end check horizontal

	// TODO: Need improvement
	function IsVerticalChecked() {
		let upCheck = false,
			downCheck = false;
		let index = 1,
			count = 1;

		while (!upCheck || !downCheck) {
			// up check
			if (row - index >= 0 && !upCheck) {
				if (board[row - index][col] === value) {
					count++;
				} else {
					upCheck = true;
				}
			} else {
				upCheck = true;
			}

			// down check
			if (row + index < boardSize && !downCheck) {
				if (board[row + index][col] === value) {
					count++;
				} else {
					downCheck = true;
				}
			} else {
				downCheck = true;
			}

			index++;

			if (count === winLine) {
				console.log('win');
				return true;
			}
		}
		return false;
	} // end check vertical

	// TODO: Need improvement
	function IsDiagonalChecked() {
		let downRightDia = false,
			upLeftDia = false;
		let count = 1,
			index = 1;

		// Check down-right and up-left diagonal
		while (!downRightDia || !upLeftDia) {
			// check up left - upper row and upper column
			if (!upLeftDia && row - index >= 0 && col - index >= 0) {
				if (board[row - index][col - index] === value) {
					count++;
				} else {
					upLeftDia = true;
				}
			} else {
				upLeftDia = true;
			}

			// check down right - down row(+1) and shift right colum (+1)
			if (!downRightDia && row + index < boardSize && col + index < boardSize) {
				if (board[row + index][col + index] === value) {
					count++;
				} else {
					downRightDia = true;
				}
			} else {
				downRightDia = true;
			}

			index++;

			if (count === winLine) {
				console.log('win');
				return true;
			}
		}
		return false;
	} // end Diagonal check

	// TODO: Need improvement
	function IsRDiagonalChecked() {
		let downLeftDia = false,
			upRightDia = false;
		let count = 1,
			index = 1;

		while (!downLeftDia || !upRightDia) {
			// check down left - down row(+1) and shift left column (-1)
			if (!downLeftDia && row + index < boardSize && col - index >= 0) {
				if (board[row + index][col - index] === value) {
					count++;
				} else {
					downLeftDia = true;
				}
			} else {
				downLeftDia = true;
			}

			// check up right - up row(-1) and shift right column (+1)
			if (!upRightDia && row - index >= 0 && col + index < boardSize) {
				if (board[row - index][col + index] === value) {
					count++;
				} else {
					upRightDia = true;
				}
			} else {
				upRightDia = true;
			}

			index++;

			if (count === winLine) {
				console.log('win');
				return true;
			}
		}
		return false;
	} // end check RDiagonal

	return (
		IsHorizontalChecked() ||
		IsVerticalChecked() ||
		IsDiagonalChecked() ||
		IsRDiagonalChecked()
	);
}

const handleClick = (cell, i, j) => {
	const el = cell;
	if (reset == 1 || el.innerHTML !== '') {
		return;
	}

	board[i][j] = turn % 2 === 0 ? 'X' : 'O';
	el.innerHTML = board[i][j];

	// Check win here
	if (checkWin(i, j)) {
		if (turn % 2 == 0) alert(player1 + ' is winner');
		else alert(player2 + ' is winner');
		reset = 1;
		document.getElementById('play_again').disabled = false;
		document.getElementById('rst').disabled = false;
		document.getElementById('play_again').style.opacity = 1;
		document.getElementById('rst').style.opacity = 1;
		return;
	}
	turn++;
	document.getElementById('info').innerHTML =
		turn % 2 == 0 ? player1 + " turn's" : player2 + " turn's";

	if (turn === boardSize * boardSize && reset === 0) {
		alert('Game is drawn');
		reset = 1;
		document.getElementById('play_again').disabled = false;
		document.getElementById('rst').disabled = false;
		document.getElementById('play_again').style.opacity = 1;
		document.getElementById('rst').style.opacity = 1;
		return;
	}
};

function initGame() {
	let gameContainer = document.getElementById('field');
	for (let i = 0; i < boardSize; i++) {
		let row = document.createElement('div');
		row.className = 'row';
		for (let j = 0; j < boardSize; j++) {
			let cell = document.createElement('div');
			cell.addEventListener('click', (event) => handleClick(cell, i, j));
			cell.className = 'cell';
			row.appendChild(cell);
		}
		gameContainer.appendChild(row);
	}
}

// Start game immediately
start();