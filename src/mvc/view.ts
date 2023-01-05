import { createInterface } from 'readline'
import type { State } from './Model'

export class CalculatorView {
	readline = createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	askContinue(callback: (answer: string) => void) {
		this.readline.question(`continue? (y/n) or reset (r)\n`, callback)
	}

	askNumber(callback: (inputNumber: string) => void) {
		this.readline.question(`Choose your number.\n`, callback)
	}

	askOperator(callback: (operator: State['operator']) => void) {
		this.readline.question(
			`Choose your operator ? (+, -, *, /).\n`,
			callback
		)
	}

	log(message: string) {
		console.log(message)
	}

	close() {
		this.readline.close()
	}
}
