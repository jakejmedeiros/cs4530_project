import { ICells } from "../../interfaces/cells.interface";
import { IErrorAlert } from "../../interfaces/erroralert.interface";
import { ColumnNameTranslate } from "../utils/columnNameTranslate";

// A class representing an error when a user inputs a formula with incorrect syntax, such as incomplete parentheses.
export class InvalidFormulaSyntax implements IErrorAlert {
    public constructor(private errorCell: ICells) {}

    report():any {
        throw new Error("Method not implemented.");
    }

    // Translates this InvalidFormulaSyntax into text.
    toText():String {
        return "Invalid Formula Syntax Error: The cell at (" 
        + ColumnNameTranslate.columnToLetter(this.errorCell.getY()+1) + (this.errorCell.getX()+1)
        + ") contains invalid formula syntax. For example, there may be a missing or incorrectly place parenthesis."
    }
}
