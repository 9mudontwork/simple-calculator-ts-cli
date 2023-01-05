import { CalculatorModel } from './model'
import { CalculatorView } from './view'

export class CalculatorController {
	model: CalculatorModel
	view: CalculatorView

	constructor(model: CalculatorModel, view: CalculatorView) {
		this.model = model
		this.view = view
	}

	askNumber() {
		this.view.askNumber((inputNumber) => {
			if (isNaN(Number(inputNumber))) {
				this.view.log('Invalid number. Please try again.')
				return
			}

			this.model.state.currentInputNumber = Number(inputNumber)

			if (this.model.state.isFirstNumber) {
				this.model.state.sum = this.model.state.currentInputNumber
				this.model.state.isFirstNumber = false
			}

			if (this.model.state.isRequireOperator) {
				this.askOperator()
				this.model.state.isRequireOperator = false
				return
			}

			this.calculate()
		})
	}

	askOperator() {
		this.view.askOperator((operator) => {
			if (!this.model.validateOperator(operator)) {
				this.view.log('Invalid operator. Please try again.')
				return this.askOperator()
			}

			this.model.state.operator = operator
			this.askNumber()
		})
	}

	calculate() {
		this.model.calculate()
		this.view.log(`Result: ${this.model.state.sum}`)
		this.askContinue()
	}

	askContinue() {
		this.view.askContinue((answer) => {
			if (answer === 'y') {
				this.askOperator()
				return
			}

			if (answer === 'r') {
				this.model.state.isRequireOperator = true
				this.model.state.isFirstNumber = true
				this.askNumber()
				return
			}

			this.view.close()
		})
	}

	start() {
		this.askNumber()
	}
}
