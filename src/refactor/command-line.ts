import { createInterface, type Interface as IReadline } from 'readline'

export interface ICommandLine {
	runQuestion(val: string, callback: (val: string) => void): void
}

export class CommandLine implements ICommandLine {
	readline: IReadline

	constructor() {
		this.readline = createInterface({
			input: process.stdin,
			output: process.stdout,
		})
	}

	runQuestion(questionName: string, callback: (answer: string) => void) {
		this.readline.question(`${questionName}\n`, callback)
	}
}
