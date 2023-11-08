import { ICells } from "../../interfaces/cells.interface";
import { IErrorAlert } from "../../interfaces/erroralert.interface";

export class InvalidDataTypeInFormula implements IErrorAlert {
    public constructor(errorCell: ICells) {}

    report():any {
        throw new Error("Method not implemented.");
    }
    toText():String {
        throw new Error("Method not implemented.");
    }
}
