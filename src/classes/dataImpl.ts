import { DataType } from "../enums/datatype";
import { IData } from "../interfaces/data.interface";
import { IFormulas } from "../interfaces/formulas";
import { Average } from "./formulas/average";
import { Sum } from "./formulas/sum";

export class Data implements IData {
    private value: String | number | IFormulas | null;
    private dataType: DataType;

    public constructor(value: String | number | IFormulas | null) {
        if (value instanceof String) {
            this.dataType = DataType.STRING;
        } else if (value instanceof Number) {
            this.dataType = DataType.NUMBER;
        } else if (value instanceof Sum || value instanceof Average) {
            this.dataType = DataType.FORMULA;
        } else {
            this.dataType = DataType.NULL;
        }
        this.value = value;
    }

    public getValue(): number | String | IFormulas | null {
        return this.value;
    }

    public getDataType(): DataType {
        return this.dataType;
    }

    public setDataType(dt: DataType): void {
        this.dataType = dt;
    }

    public setData(value: String | number | IFormulas | null): void {
        if (value instanceof String) {
            this.dataType = DataType.STRING;
        } else if (value instanceof Number) {
            this.dataType = DataType.NUMBER;
        } else if (value instanceof Sum || value instanceof Average) {
            this.dataType = DataType.FORMULA;
        } else {
            this.dataType = DataType.NULL;
        }
        this.value = value;
    }
}