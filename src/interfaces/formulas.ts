import { ErrorType } from "../enums/errortype"

export interface IFormulas {
    references: string[]

    calculate(values: number[]): any
    reportError(error: ErrorType): any
}