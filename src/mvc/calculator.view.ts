import { createInterface } from 'readline'
import { CalculatorController, type Operator } from './calculator.controller'
import { CalculatorModel } from './calculator.model'

export interface ICalculatorView {
  setResult(result: number): void
  setError(error: string): void
}

export class CalculatorView implements ICalculatorView {
  readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  number1: number
  number2: number
  operator: Operator
  result: number

  _controller: CalculatorController

  constructor() {
    this._controller = new CalculatorController(new CalculatorModel(), this)
    this.ask('Choose your number 1')
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

  isNumber(val: number | string): boolean {
    return !isNaN(Number(val))
  }

  isValidOperator(val: string): boolean {
    return ['+', '-', '*', '/'].includes(val)
  }

  tryAgain(text: string) {
    this.ask(`Invalid input. Please try ${text} again.`)
  }

  reset() {
    this.number1 = undefined
    this.number2 = undefined
    this.operator = undefined
    console.log('Program will be Reset, Please try again.')
    this.ask('Choose your number 1')
  }

  ask(title: string) {
    this.readline.question(`${title}\n`, (val: string) => {
      if (!this.number1) {
        if (!this.isNumber(val)) {
          this.tryAgain('number 1')
          return
        }

        this.number1 = Number(val)
        this.ask('Choose your operator ? (+, -, *, /).')

        return
      }

      if (!this.operator) {
        if (!this.isValidOperator(val)) {
          this.tryAgain('operator')
          return
        }

        this.operator = val as Operator
        this.ask('Choose your number 2')

        return
      }

      if (!this.number2) {
        if (!this.isNumber(val)) {
          this.tryAgain('number 2')
          return
        }

        this.number2 = Number(val)
      }

      this._controller.calculate(this.operator, this.number1, this.number2)
    })
  }
}
