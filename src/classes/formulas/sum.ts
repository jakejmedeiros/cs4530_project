import { ErrorType } from "../../enums/errortype";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { IFormulas } from "../../interfaces/formulas.interface";

// A class to calculate the sum of a given list of numbers
export class Sum implements IFormulas {

    public constructor(private references: String[] = []) {

    }
    
    public calculate(values: number[]): number {
        throw new Error("Method not implemented.");
    }
    
    public reportError(error: ErrorType): IErrorAlert {
        throw new Error("Method not implemented.");
    }
}