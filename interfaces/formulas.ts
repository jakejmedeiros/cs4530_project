import { ErrorType } from "../enums/errortype"

export interface IFormulas {
    references: string[]

    calculate(values: number[])
    reportError(error: ErrorType)
}