import { Calculator } from './calculator'
import { MainAble } from './index'

export class MainController {
	private calculator: Calculator
	private view: MainAble

	constructor(calculator: Calculator, view: MainAble) {
		this.calculator = calculator
		this.view = view
	}

	execute(operator: string, number1: number, number2: number) {
		if (operator === '+') {
			const res = this.calculator.plus(number1, number2)
			this.view.setResult(res)
		} else if (operator === '-') {
			const res = this.calculator.minus(number1, number2)
			this.view.setResult(res)
		} else if (operator === '*') {
			const res = this.calculator.multiply(number1, number2)
			this.view.setResult(res)
		} else if (operator === '/') {
			if (number2 === 0) {
				this.view.setErrorMessage('divide by zero')
				return
			}

			const res = this.calculator.divide(number1, number2)
			this.view.setResult(res)
		}
	}
}
