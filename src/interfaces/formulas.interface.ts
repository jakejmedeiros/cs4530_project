import { ErrorType } from "../enums/errortype"

// Interface for formulas to use on cells
export interface IFormulas {
    calculate(values: number[]): any;
    reportError(error: ErrorType): any;
}