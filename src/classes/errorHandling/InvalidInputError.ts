import { ICells } from "../../interfaces/cells.interface";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { ColumnNameTranslate } from "../utils/columnNameTranslate";

// A class representing an error when a user inputs an invalid input, usually by typing letters as a part
// of their input without using quotation marks
export class InvalidInputError implements IErrorAlert {
    public constructor(private errorCell: ICells) {}

    report():any {
        throw new Error("Method not implemented.");
    }

    // Translates this InvalidInputError into text.
    toText():String {
        return "Invalid Input Error: The cell at (" 
        + ColumnNameTranslate.columnToLetter(this.errorCell.getY()+1) + (this.errorCell.getX()+1)
        + `) contains an invalid input. To input a string into a cell, put quotation marks ("") around the `
        + "input. Otherwise, make sure to write references with the correct syntax (e.g: sum(a1..c4), ref(d4)) and within the existing "
        + "spreadsheet."
    }
}
