import { CalculatorController, type Operator } from './calculator.controller'
import { CalculatorModel } from './calculator.model'
import { CommandLine } from './command-line'
import { isNumber, isValidOperator } from './utils'

export interface ICalculatorView {
	setResult(result: number): void
	setError(error: string): void
}

export class CalculatorView extends CommandLine implements ICalculatorView {
	number1: number
	number2: number
	operator: Operator
	result: number

	_controller: CalculatorController

	constructor() {
		super()
		this._controller = new CalculatorController(new CalculatorModel(), this)
		this.ask('Choose your first')
	}

	setResult(result: number): void {
		this.result = result
		console.log(`Result: ${this.result}`)
		this.readline.close()
	}

	setError(error: string): void {
		console.log(`Error: ${error}`)
		this.reset()
	}

	tryAgain(text: string) {
		this.ask(`Invalid input. Please try ${text} again.`)
	}

	reset() {
		this.number1 = undefined
		this.number2 = undefined
		this.operator = undefined
		console.log('Program will be reset, Please try again.')
		this.ask('Choose your first number')
	}

	ask(title: string) {
		this.runQuestion(`${title}\n`, (val: string) => {
			if (!this.number1) {
				if (!isNumber(val)) {
					this.tryAgain('first number')
					return
				}

				this.number1 = Number(val)
				this.ask('Choose your operator ? (+, -, *, /).')

				return
			}

			if (!this.operator) {
				if (!isValidOperator(val)) {
					this.tryAgain('operator')
					return
				}

				this.operator = val as Operator
				this.ask('Choose your second number')

				return
			}

			if (!this.number2) {
				if (!isNumber(val)) {
					this.tryAgain('second number')
					return
				}

				this.number2 = Number(val)
			}

			this._controller.calculate(
				this.operator,
				this.number1,
				this.number2
			)
		})
	}
}
