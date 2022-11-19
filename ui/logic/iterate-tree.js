
const iterateTree = ({tree, getNextStates, getResult, player, ply}) => {
  const results = (() => {
		if (tree.finalState != undefined) {
			return {N: 1, W: tree.finalState};
		} else if (!tree.childStates) { // expand this node
			tree.childStates = getNextStates({player, tree});
			R.forEach(childState => {
				childState.N = 1;
				childState.W = getResult({childState, player: (player === 1) ? -1 : 1, getNextStates});

				if (childState.finalState != undefined) childState.childStates = [];
			}, tree.childStates);

			return {
				N: tree.childStates.length,
				W: R.pipe(R.map(R.prop("W")), R.reduce(R.add, 0))(tree.childStates)
			};
		} else { // select a child node to traverse into
			const c = 1;
			const childNode = R.pipe(
				R.addIndex(R.map)(({W, N}, index) => [index, ((W * player) / N) + (c * Math.sqrt(Math.log(tree.N) / N))]),
				R.sortBy(R.nth(1)),
				R.last,
				array => tree.childStates[array[0]]
			)(tree.childStates);

			return iterateTree({tree: childNode, getNextStates, getResult, player: (player === 1) ? -1 : 1});
		}
	})();

  	tree.N += results.N;
  	tree.W += results.W;
	
	if (!ply) {
		tree.bestLines = R.pipe(
			R.sortBy(R.prop("N")),
			R.reverse,
			R.map(({description, bestLines}) => [description, ...(bestLines.length ? bestLines[0] : [])])
		)(tree.childStates);
	} else {
		const N = R.map(R.prop("N"), tree.childStates);
		const sumN = R.reduce(R.add, 0, N);
		const maxOpacity = R.pipe(R.sortBy(R.identity), R.last)(N) / sumN;
		tree.bestLines = R.pipe(
			R.addIndex(R.map)(({N, W, description, bestLines}, childIndex) => ({N, W, description, bestLines, childIndex})),
			R.sortBy(R.prop("N")),
			R.reverse,
			R.map(({N, W, description, bestLines, childIndex}) => {
				const value = Math.round(W / N * 100) / 100;
				const score = `${(value >= 0) ? "+" : ""}${R.includes(value, [0, 1, -1])? `${value}.0` : value}`.padEnd(5, "0");
				const isCompleteMoves = (ply % 2) === 1;
				const bestLine = isCompleteMoves ? `(${score}) ${R.pipe(R.addIndex(R.map)(([first, second], index) => `${(ply + 1) / 2 + index}.${first}${(second == undefined) ? "" : ` ${second}`}`), R.join(" "))(R.splitEvery(2, [description, ...(bestLines.length ? bestLines[0] : [])]))}` : `(${score}) ${ply / 2}...${description} ${R.pipe(R.addIndex(R.map)(([first, second], index) => `${(ply / 2) + 1 + index}.${first}${(second == undefined) ? "" : ` ${second}`}`), R.join(" "))(R.splitEvery(2, bestLines.length ? bestLines[0] : []))}`;

				return {
					opacity: Math.round(N / sumN / maxOpacity * 100) / 100,
					actionIndex: childIndex,
					bestLine
				};
			})
		)(tree.childStates);
	}

  return results;
};

export default iterateTree;