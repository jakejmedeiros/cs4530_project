import { ICells } from "src/interfaces/cells.interface";
import { IFormulas } from "../../interfaces/formulas.interface";

// A class to calculate the sum of a given list of numbers
export class Sum implements IFormulas {

    public constructor(private cell: ICells, private references: ICells[], private savedSum: number = NaN) {}
    
    // Calculates the sum of this Sum's list of cells
    public calculate(): number {
        let sum: number = 0;
        this.references.forEach((cell) => {
            let val = cell.getValue();
            if (typeof val !== 'number') {
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
}