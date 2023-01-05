import { createInterface } from 'readline'

type State = {
	operator: '+' | '-' | '*' | '/'
	currentInputNumber: number
	sum: number
}

const readline = createInterface({
	input: process.stdin,
	output: process.stdout,
})

let state: State = {
	operator: '+',
	currentInputNumber: 0,
	sum: 0,
}

let isRequireOperator = true

const operator = {
	'+': () => (state.sum = state.sum + state.currentInputNumber),
	'-': () => (state.sum = state.sum - state.currentInputNumber),
	'*': () => (state.sum = state.sum * state.currentInputNumber),
	'/': () => (state.sum = state.sum / state.currentInputNumber),
}

function validateOperator(operator: string): boolean {
	const operators = ['+', '-', '*', '/']
	return operators.includes(operator)
}

function calculate() {
	operator[state.operator]()
	console.log(`Result: ${state.sum}`)
	askContinue()
}

function askContinue() {
	readline.question(`continue? (y/n) or reset (r)\n`, (answer: string) => {
		if (answer === 'y') {
			askOperater()
			return
		}

		if (answer === 'r') {
			isRequireOperator = true
			askNumber()
			return
		}

		readline.close()
	})
}

function askNumber() {
	readline.question(`What is your number?\n`, (inputNumber: string) => {
		if (isNaN(Number(inputNumber))) {
			console.log('Invalid number. Please try again.')

			return
		}

		state.currentInputNumber = Number(inputNumber)

		if (isRequireOperator) {
			askOperater()
			isRequireOperator = false
			return
		}

		calculate()
	})
}

function askOperater() {
	readline.question(
		`What your operator need to do ? (+, -, *, /).\n`,
		(operator: State['operator']) => {
			if (!validateOperator(operator)) {
				console.log('Invalid operator. Please try again.')

				return askOperater()
			}

			state.operator = operator
			askNumber()
		}
	)
}

askNumber()
