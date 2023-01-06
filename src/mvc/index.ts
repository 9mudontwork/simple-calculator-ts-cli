import { createInterface } from 'readline'
import { MainController } from './controller'
import { Calculator } from './calculator'

export interface MainAble {
	setResult: (result: number) => void
	setErrorMessage: (msg: string) => void
}

class Main implements MainAble {
	private operator?: string = undefined
	private number1?: number = undefined
	private number2?: number = undefined
	private reader = createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	private controller: MainController

	constructor() {
		this.controller = new MainController(new Calculator(), this)
		this.askQuestion('Choose your number 1:')
	}

	startOverAgain() {
		this.number1 = undefined
		this.number2 = undefined
		this.operator = undefined
		this.askQuestion('Choose your number 1:')
	}

	setResult(result: number) {
		console.log("result: ", result)
		this.startOverAgain()
	}

	setErrorMessage(msg: string) {
		console.log("err: ", msg)
		this.startOverAgain()
	}

	askQuestion(title: string) {
		this.reader.question(`${title}\n`, (value) => {
			try {
				if (!this.number1) {
					this.number1 = Number(value)
					this.askQuestion('Choose your number2:')
				} else if (!this.number2) {
					this.number2 = Number(value)
					this.askQuestion('Choose your operator ? (+, -, *, /): ')
				} else if (!this.operator) {
					this.operator = value
					this.controller.execute(
						this.operator,
						this.number1,
						this.number2
					)
				}
			} catch (err) {
				console.error('err: ', err)
			}
		})
	}
}

;(() => {
	new Main()
})()
