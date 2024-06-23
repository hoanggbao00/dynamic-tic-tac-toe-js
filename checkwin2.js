/**
 * ref: https://github.com/leonwerth2703/tictoe
 *  from this comment: https://www.facebook.com/groups/1065116420221723/posts/7831246893608608/?comment_id=7836556546410976&reply_comment_id=7837016749698289
 */

function checkWin(row, col) {
	function rowChecked(row) {
		let cnt = 0;
		let ch = 'X';

		for (let i = 0; i < dimension; ++i) {
			if (board[row][i] === '') {
				cnt = 0;
			} else if (ch === board[row][i]) {
				cnt++;
				if (cnt === winLine) {
					return true;
				}
			} else {
				cnt = 1;
				ch = board[row][i];
			}
		}

		return false;
	}

	function colChecked(col) {
		let cnt = 0;
		let ch = 'X';

		for (let i = 0; i < dimension; ++i) {
			if (board[i][col] === '') {
				cnt = 0;
			} else if (ch === board[i][col]) {
				cnt++;
				if (cnt === winLine) {
					return true;
				}
			} else {
				cnt = 1;
				ch = board[i][col];
			}
		}

		return false;
	}

	function diagonal1Checked(row, col) {
		let cnt = 0;
		let ch = 'X';

		for (
			let k = Math.max(-row, -col);
			k <= Math.min(dimension - row - 1, dimension - col - 1);
			++k
		) {
			if (board[row + k][col + k] === '') {
				cnt = 0;
			} else if (ch === board[row + k][col + k]) {
				cnt++;
				if (cnt === winLine) {
					return true;
				}
			} else {
				cnt = 1;
				ch = board[row + k][col + k];
			}
		}

		return false;
	}

	function diagonal2Checked(row, col) {
		let cnt = 0;
		let ch = 'X';

		for (
			let k = Math.max(-row, -dimension + col + 1);
			k <= Math.min(dimension - row - 1, col);
			++k
		) {
			if (board[row + k][col - k] === '') {
				cnt = 0;
			} else if (ch === board[row + k][col - k]) {
				cnt++;
				if (cnt === winLine) {
					return true;
				}
			} else {
				cnt = 1;
				ch = board[row + k][col - k];
			}
		}

		return false;
	}

	return (
		rowChecked(row) ||
		colChecked(col) ||
		diagonal1Checked(row, col) ||
		diagonal2Checked(row, col)
	);
}
