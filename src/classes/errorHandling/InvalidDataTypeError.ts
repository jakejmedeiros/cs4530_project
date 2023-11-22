import { ICells } from "../../interfaces/cells.interface";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { ColumnNameTranslate } from "../utils/columnNameTranslate";

export class InvalidDataTypeError implements IErrorAlert {
    public constructor(private errorCell: ICells) {}

    report():any {
        throw new Error("Method not implemented.");
    }
    toText():String {
        return "Invalid Data Type Error: The cell at (" 
        + ColumnNameTranslate.columnToLetter(this.errorCell.getX())
        + ","
        + this.errorCell.getY()
        + ") contains an invalid data type."
    }
}
