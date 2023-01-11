import { CalculatorModel } from './calculator.model'
import { type ICalculatorView } from './calculator.view'

export const Operators = {
	PLUS: '+',
	MINUS: '-',
	MULTIPLY: '*',
	DIVIDE: '/',
} as const

export type Operator = typeof Operators[keyof typeof Operators]

// export enum Operators2 {
// 	PLUS = '+',
// 	MINUS = '-',
// 	MULTIPLY = '*',
// 	DIVIDE = '/',
// }

export class CalculatorController {
	_model: CalculatorModel
	_view: ICalculatorView

	constructor(model: CalculatorModel, view: ICalculatorView) {
		this._model = model
		this._view = view
	}

	calculate(operator: Operator, number1: number, number2: number) {
		let result = undefined

		if (operator === Operators.PLUS) {
			result = this._model.plus(number1, number2)
		}

		if (operator === Operators.MINUS) {
			result = this._model.minus(number1, number2)
		}

		if (operator === Operators.MULTIPLY) {
			result = this._model.multiply(number1, number2)
		}

		if (operator === Operators.DIVIDE) {
			if (number2 === 0) {
				this._view.setError('Cannot divide by zero')
				return
			}

			result = this._model.divide(number1, number2)
		}

		this._view.setResult(result)
	}
}
