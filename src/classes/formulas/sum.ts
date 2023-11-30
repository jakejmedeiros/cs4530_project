import { ICells } from "src/interfaces/cells.interface";
import { ErrorType } from "../../enums/errortype";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { IFormulas } from "../../interfaces/formulas.interface";
import { BadReferenceInFormula } from "../errorHandling/BadReferenceError";
import { DivideByZeroError } from "../errorHandling/DivideByZeroError";
import { InvalidDataTypeError } from "../errorHandling/InvalidDataTypeError";

// A class to calculate the sum of a given list of numbers
export class Sum implements IFormulas {

    public constructor(private cell: ICells, private references: ICells[], private savedSum: number = NaN) {}
    
    // Calculates the sum of this Sum's list of cells
    public calculate(): number {
        let sum: number = 0;
        this.references.forEach((cell) => {
            let val = cell.getValue();
            if (typeof val !== 'number') {
                this.reportError(cell, ErrorType.INVALID_DATA_TYPE);
                return NaN;
            } else {
                let num: number = Number(val);
                sum += num;
            }
        });
        this.savedSum = sum;
        return sum;
    }

    // Returns the current sum of this Sum's list of cells
    public getCalculation(): number {
        let sum: number = this.savedSum;
        if (Number.isNaN(sum)) {
            sum = this.calculate();
        }
        this.savedSum = sum;
        return sum;
    }

    public getReferences(): ICells[] {
        return this.references;
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