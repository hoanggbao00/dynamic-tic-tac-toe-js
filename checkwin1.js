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
function checkWin1(row, col) {
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
