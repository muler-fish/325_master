const zc325 = ((Nums) => {
	const numsReversed = Object.keys(Nums).map(x => +x).filter(x => x > 0)
	const getMinDiv = (num) => {
		for (let i = numsReversed.length; i >= 0; i--)
			if (num >= numsReversed[i])
				return numsReversed[i]
	}
	const isDotRegex = /\.(\d+?)0{0,}$/
	const demolish = (num) => {
		if (typeof num !== "number")
			return ""

		if (num === Infinity || Number.isNaN(num))
			return `我们的${num}会变成什么样子😭`

		if (num < 0)
			return `(⑨)*(${demolish(num * -1)})`.replace(/\*\(1\)/g, "")

		if (!Number.isInteger(num)) {
			const strNum = String(num);
			let n = 0;
			if (strNum.includes('.')) {
				n = strNum.split('.')[1].length;
			}
			
			const intPart = Math.round(num * Math.pow(10, n));
			
			return `(${demolish(intPart)})/(${demolish(10)})^(${demolish(n)})`;
		}

		if (Nums[num])
			return String(num)

		const div = getMinDiv(num)
		return (`${div}*(${demolish(Math.floor(num / div))})+` +
			`(${demolish(num % div)})`).replace(/\*\(1\)|\+\(0\)$/g, "")
	}
	//Finisher
	const finisher = (expr) => {
		expr = expr.replace(/\d+|⑨/g, (n) => Nums[n]).replace("^", "**")
		//As long as it matches ([\*|\/])\(([^\+\-\(\)]+)\), replace it with $1$2
		while (expr.match(/[\*|\/]\([^\+\-\(\)]+\)/))
			expr = expr.replace(/([\*|\/])\(([^\+\-\(\)]+)\)/, (m, $1, $2) => $1 + $2)
		//As long as it matches ([\+|\-])\(([^\(\)]+)\)([\+|\-|\)]), replace it with $1$2$3
		while (expr.match(/[\+|\-]\([^\(\)]+\)[\+|\-|\)]/))
			expr = expr.replace(/([\+|\-])\(([^\(\)]+)\)([\+|\-|\)])/, (m, $1, $2, $3) => $1 + $2 + $3)
		//As long as it matches ([\+|\-])\(([^\(\)]+)\)$, replace it with $1$2
		while (expr.match(/[\+|\-]\(([^\(\)]+)\)$/))
			expr = expr.replace(/([\+|\-])\(([^\(\)]+)\)$/, (m, $1, $2) => $1 + $2)
		//If there is a bracket in the outermost part, remove it
		if (expr.match(/^\([^\(\)]+?\)$/))
			expr = expr.replace(/^\(([^\(\)]+)\)$/, "$1")

		expr = expr.replace(/\+-/g,'-')
		return expr
	}
	return (num) => finisher(demolish(num))
})({
	0: "3+(2-5)",
    1: "(3+2)/5",
	2: "(32-5)/3-2-5",
	3: "3-2*5+3+2+5",
    4: "-3+2+5",
    5: "(3-2)*5",
    6: "3-2+5",
    7: "-3+2*5",
    9: "3*(-2+5)",
    10: "3+2+5",
    11: "3*2+5",
    13: "3+2*5",
    21: "3*(2+5)",
    22: "-3+25",
    25: "(3+2)*5)",
    27: "32-5",
    28: "3+25",
    30: "3*2*5",
    37: "32+5",
	49: "325*3/25+3+2+5",
    75: "3*25",
    160: "32*5",
	250: "-3*25+325",
    325: "325",
	650: "325+325",
	799: "32*5*(3+2)+5-3+2-5",
	"⑨": "3*-2+5",
})

if (typeof module === 'object' && module.exports)
	module.exports = zc325

