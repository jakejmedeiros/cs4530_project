export class InvalidDataTypeInFormula implements IErrorAlert {
    errorCell: ICells;
    report() {
        throw new Error("Method not implemented.");
    }
    toText() {
        throw new Error("Method not implemented.");
    }
}
