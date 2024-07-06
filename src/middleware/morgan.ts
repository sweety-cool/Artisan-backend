import responseTime from "response-time";

const { r, g, b, w, c, m, y, k }: any = [
	["r", 1],
	["g", 2],
	["b", 4],
	["w", 7],
	["c", 6],
	["m", 5],
	["y", 3],
	["k", 0],
].reduce(
	(cols: any, col: any) => ({
		...cols,
		[col[0]]: (f: any) => `\x1b[3${col[1]}m${f}\x1b[0m`,
	}),
	{},
);

export default responseTime((req: any, res: any, time: any) => {
	console.log(
		`${g(req.method)} ${b(req.path)} ${y(time.toFixed(2))} ${m("ms")}`,
	);
});
