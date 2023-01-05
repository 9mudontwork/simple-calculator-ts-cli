import { CalculatorModel } from './model'
import { CalculatorView } from './view'
import { CalculatorController } from './controller'

const model = new CalculatorModel()
const view = new CalculatorView()
const controller = new CalculatorController(model, view)
controller.start()
