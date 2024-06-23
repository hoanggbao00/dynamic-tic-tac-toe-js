
/**
 * Check line win same as boardSize 
 * Ex: boardSize is 5, line win is 5 too
 * ref: https://codesandbox.io/p/sandbox/tic-tac-toedynamic-yirkd
 */
function calwinner() {
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
}