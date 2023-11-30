import { ErrorType } from "../enums/errortype"
import { ICells } from "./cells.interface";

// Interface for formulas to use on a range of cells
export interface IFormulas {

    // Calculates a range of cells depending on the class
    calculate(): any;

    // Returns the current value of the calculation of this IFormulas's list of cells
    getCalculation(): number;
}