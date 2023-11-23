import { ICells } from "../../interfaces/cells.interface";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { ColumnNameTranslate } from "../utils/columnNameTranslate";

// A class representing an error when a user inputs an invalid data type, either in the cell by itself
// or within a formula
export class InvalidDataTypeError implements IErrorAlert {
    public constructor(private errorCell: ICells) {}

    report():any {
        throw new Error("Method not implemented.");
    }

    // Translates this InvalidDataTypeError into text.
    toText():String {
        return "Invalid Data Type Error: The cell at (" 
        + ColumnNameTranslate.columnToLetter(this.errorCell.getX())
        + ","
        + this.errorCell.getY()
        + ") contains an invalid data type."
    }
}
