/**
 * Reference: https://codesandbox.io/p/sandbox/tic-tac-toedynamic-yirkd
 */

let player1 = 'X';
let player2 = 'O';
let turn = 0;
let reset = 0;
let dimension = 6; // boardSize
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
	board = new Array(dimension)
		.fill('')
		.map(() => new Array(dimension).fill(''));
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
	board = new Array(dimension)
		.fill('')
		.map(() => new Array(dimension).fill(''));
	initGame();
}

/**
 * Check win
 * @description dynamically check win with dynamic boardSize and line to win
 * @param {*} row position row of this move
 * @param {*} col position column of this move
 * @param {*} board board array with 2x2 matrix
 * @returns { true } if win
 * @author: hoanggbao
 * Date Modified: 12:04 - 12.06.24
 * TODO: Need Improve
 */
function checkWin(row, col) {
	// if player input line to win greater than boardSize
	if(winLine > dimension) winLine = dimension
	
	let value = board[row][col],
		count = 1;
	let leftCheck = false,
		rightCheck = false,
		upCheck = false,
		downCheck = false;

	let upLeftDia = false,
		upRightDia = false,
		downLeftDia = false,
		downRightDia = false;

	let index = 1,
		r = row,
		c = col;

	// Check horizontal
	// TODO: Need improvement
	while (!leftCheck || !rightCheck) {
		// left check
		if (c - index >= 0 && !leftCheck) {
			if (board[row][c - index] === value && board[row][c - index] !== '') {
				count++;
			} else {
				leftCheck = true;
			}
		} else {
			leftCheck = true;
		}

		if (c + index < dimension && !rightCheck) {
			if (board[row][c + index] === value && board[row][c + index] !== '') {
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
	} // end check horizontal

	// Check vertical
	count = 1;
	index = 1;
	r = row;
	// TODO: Need improvement
	while (!upCheck || !downCheck) {
		// up check
		if (r - index >= 0 && !upCheck) {
			if (board[r - index][col] === value && board[r - index][col] !== '') {
				count++;
			} else {
				upCheck = true;
			}
		} else {
			upCheck = true;
		}

		// down check
		if (r + index < dimension && !downCheck) {
			if (board[r + index][col] === value && board[r + index][col] !== '') {
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
	} // end check vertical

	// TODO: Need improvement
	// Check down-right and up-left diagonal
	index = 1;
	count = 1;
	r = row;
	c = col;
	while (!downRightDia || !upLeftDia) {
		// check up left - upper row and upper column
		if (!upLeftDia && r - index >= 0 && c - index >= 0) {
			if (
				board[r - index][c - index] === value &&
				board[r - index][c - index] !== ''
			) {
				count++;
			} else {
				upLeftDia = true;
			}
		} else {
			upLeftDia = true;
		}

		// check down right - down row(+1) and shift right colum (+1)
		if (!downRightDia && r + index < dimension && c + index < dimension) {
			if (
				board[r + index][c + index] === value &&
				board[r + index][c + index] !== ''
			) {
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

	// TODO: Need improvement
	// Check down-left and up-right diagonal
	count = 1;
	r = row;
	c = col;
	index = 1;

	while (!downLeftDia || !upRightDia) {
		// check down left - down row(+1) and shift left column (-1)
		if (!downLeftDia && r + index < dimension && c - index >= 0) {
			if (
				board[r + index][c - index] === value &&
				board[r + index][c - index] !== ''
			) {
				count++;
			} else {
				downLeftDia = true;
			}
		} else {
			downLeftDia = true;
		}

		// check up right - up row(-1) and shift right column (+1)
		if (!upRightDia && r - index >= 0 && c + index < dimension) {
			if (
				board[r - index][c + index] === value &&
				board[r - index][c + index] !== ''
			) {
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
}
/**
 * Check line win same as dimension 
 * Ex: dimension is 5, line win is 5 too
 */
/*function calwinner() {
	let len = 3;

	//kiểm tra tất cả player đi đủ nước để win chưa
	if (turn < len) {
		return false;
	}

	// console.log(board);

	for (let i = 0; i < len; i++) {
		// Check row win
		if (
			board[i].every((el) => {
				// console.log('el:::', el, `board[${i}][0]::${board[i][0]}`);
				return el === board[i][0] && el !== '';
			})
		) {
			return true;
		}

		// console.log(`${i} Row clear`);
		// Check col win
		let start_col_val = board[0][i];
		let count = 1;
		for (let j = 1; j < len; j++) {
			if (start_col_val === board[j][i] && start_col_val !== '') {
				count++;
			}
		}
		//console.log(`${i} Col clear`);
		if (count === len) {
			return true;
		}
	}

	// check for diagonal

	let i = board[0][0];
	let j = 0;
	while (j < len) {
		//console.log(`${board[j][j]} diagonal`);
		if (board[0][0] === '') {
			break;
		}
		if (board[j][j] !== i) {
			break;
		} else {
			j++;
		}
	}
	//console.log(`Diagonal clear`);
	//console.log(`${j} j for diagonal`);
	if (j === len) {
		return true;
	}

	let rev_i = 0;
	let rev_j = len - 1;
	let rev_val = board[rev_i][rev_j];

	while (rev_i < len) {
		if (board[rev_i][rev_j] === '') {
			break;
		}
		if (rev_val !== board[rev_i][rev_j]) {
			break;
		} else {
			rev_i++;
			rev_j--;
		}
	}
	//console.log(`reverse Diagonal clear`);
	if (rev_i === len) {
		return true;
	}

	return false;
}*/

const handleClick = (cell, i, j) => {
	const el = cell;
	if (reset == 1 || el.innerHTML !== '') {
		return;
	}

	board[i][j] = turn % 2 === 0 ? 'X' : 'O';
	el.innerHTML = board[i][j];

	// if (calwinner()) { -- old condition
	if (checkWin(i, j)) { // hoanggbao: new condition
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

	if (turn === dimension * dimension && reset === 0) {
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
	for (let i = 0; i < dimension; i++) {
		let row = document.createElement('div');
		row.className = 'row';
		for (let j = 0; j < dimension; j++) {
			let cell = document.createElement('div');
			cell.addEventListener('click', (event) => handleClick(cell, i, j));
			cell.className = 'cell';
			row.appendChild(cell);
		}
		gameContainer.appendChild(row);
	}
}
