import { ICells } from "../../interfaces/cells.interface";
import { IErrorAlert } from "../../interfaces/erroralert.interface";

export class BadReferenceInFormula implements IErrorAlert {

    public constructor(private errorCell: ICells) {}

    report():any {
        throw new Error("Method not implemented.");
    }
    toText():String {
        throw new Error("Method not implemented.");
    }
}