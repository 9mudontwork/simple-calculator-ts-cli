export type State = {
	operator: '+' | '-' | '*' | '/'
	currentInputNumber: number
	sum: number
	isRequireOperator: boolean
	isFirstNumber: boolean
}

export class CalculatorModel {
	state: State = {
		operator: '+',
		currentInputNumber: 0,
		sum: 0,
		isRequireOperator: true,
		isFirstNumber: true,
	}

	operator = {
		'+': () =>
			(this.state.sum = this.state.sum + this.state.currentInputNumber),
		'-': () =>
			(this.state.sum = this.state.sum - this.state.currentInputNumber),
		'*': () =>
			(this.state.sum = this.state.sum * this.state.currentInputNumber),
		'/': () =>
			(this.state.sum = this.state.sum / this.state.currentInputNumber),
	}

	validateOperator(operator: State['operator']): boolean {
		const operators = ['+', '-', '*', '/']
		return operators.includes(operator)
	}

	calculate(): void {
		this.operator[this.state.operator]()
	}
}
