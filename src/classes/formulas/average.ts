import { ICells } from "src/interfaces/cells.interface";
import { IFormulas } from "../../interfaces/formulas.interface";

// A class to calculate the average of values in a selected list of cells
export class Average implements IFormulas {

    public constructor(private references: ICells[], private savedAvg: number = NaN) {}

    // Calculates the average of this Average's list of cells
    public calculate(): number {
        let sum: number = 0;
        let len: number = 0;
        this.references.forEach((cell) => {
            let val = cell.getValue();
            if (typeof val !== 'number') {
                return NaN;
            } else {
                let num: number = Number(val);
                sum += num;
                len++;
            }
        });
        if (len === 0) {
            return 0;
        } else {
            const avg: number = sum / len;
            this.savedAvg = avg;
            return avg;
        }
    }

    // Returns the current average of this Average's list of cells
    public getCalculation(): number {
        let avg: number = this.savedAvg;
        if (Number.isNaN(avg)) {
            avg = this.calculate();
        }
        this.savedAvg = avg;
        return avg;
    }
}