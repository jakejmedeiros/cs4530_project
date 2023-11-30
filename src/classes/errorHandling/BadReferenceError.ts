import { ICells } from "../../interfaces/cells.interface";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { ColumnNameTranslate } from "../utils/columnNameTranslate";

// A class representing an invalid reference in a formula
export class BadReferenceInFormula implements IErrorAlert {

    public constructor(private errorCell: ICells) {}

    report():any {
        throw new Error("Method not implemented.");
    }

    // Translates this BadReferenceFormula into text
    toText():String {
        return "Bad Reference in Formula Error: The cell at (" 
        + ColumnNameTranslate.columnToLetter(this.errorCell.getY()+1) + (this.errorCell.getX()+1)
        + ") contains an invalid reference or range in Sum or Average. You are likely referencing a value that "
        + "is a different type than the others."
    }
}