export function isNumber(val: number | string): boolean {
	return !isNaN(Number(val))
}

export function isValidOperator(val: string): boolean {
	return ['+', '-', '*', '/'].includes(val)
}
