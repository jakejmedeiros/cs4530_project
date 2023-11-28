import { ICells } from "src/interfaces/cells.interface";
import { ErrorType } from "../../enums/errortype";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { IFormulas } from "../../interfaces/formulas.interface";
import { DivideByZeroError } from "../errorHandling/DivideByZeroError";
import { InvalidDataTypeError } from "../errorHandling/InvalidDataTypeError";
import { BadReferenceInFormula } from "../errorHandling/BadReferenceError";

// A class to calculate the average of values in a selected list of cells
export class Average implements IFormulas {

    public constructor(private cell: ICells, private references: ICells[], private average: number = NaN) {}

    // Calculates the average of this Average's list of cells
    public calculate(): number {
        let sum: number = 0;
        const len: number = this.references.length;
        for (let i = 0; i < len; i++) {
            let cell: ICells = this.references[i];
            let val = cell.getValue();
            if (typeof val !== 'number') {
                this.reportError(cell, ErrorType.INVALID_DATA_TYPE);
                return NaN;
            } else {
                let num: number = Number(this.references[i].getValue());
                sum += num;
            }
        }
        const avg: number = sum / len;
        return avg;
    }

    // Returns the current average of this Average's list of cells
    public getCalculation(): number {
        let avg: number = this.average;
        if (Number.isNaN(avg)) {
            avg = this.calculate();
        }
        return avg;
    }
    
    // Reports an error encountered in this Sum's inputs when utilizing this class
    public reportError(cell: ICells, error: ErrorType): IErrorAlert {
        let err: IErrorAlert;
        switch (error) {
            case ErrorType.DIVIDE_BY_ZERO:
                err = new DivideByZeroError(cell);
                break;
            case ErrorType.INVALID_DATA_TYPE:
                err = new InvalidDataTypeError(cell);
                break;
            case ErrorType.BAD_REFERENCE:
                err = new BadReferenceInFormula(cell);
                break;
        }
        return err;
    }
}