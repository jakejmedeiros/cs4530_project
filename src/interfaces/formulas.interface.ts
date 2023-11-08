import { ErrorType } from "../enums/errortype"
import { IErrorAlert } from "./erroralert.interface"

export interface IFormulas {

    calculate(values: number[]): number
    reportError(error: ErrorType): IErrorAlert;
}