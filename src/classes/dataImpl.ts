import { DataType } from "../enums/datatype";
import { IData } from "../interfaces/data.interface";
import { IFormulas } from "../interfaces/formulas.interface";
import { Average } from "./formulas/average";
import { Sum } from "./formulas/sum";

// A class for holding a cell's value and type of that value
export class Data implements IData {
    private value: String | number | IFormulas;
    private dataType: DataType;

    public constructor(value: String | number | IFormulas) {
        if (typeof(value) ===  'string') {
            this.dataType = DataType.STRING;
            this.value = value;
        } else if (typeof(value) === 'number') {
            this.dataType = DataType.NUMBER;
            this.value = value;
        } else if (value instanceof Sum || value instanceof Average) {
            this.dataType = DataType.FORMULA;
            this.value = value;
        } else {
            this.dataType = DataType.STRING;
            this.value = "";
        }
    }

    // Returns the value from this Data
    public getValue(): number | String | IFormulas {
        return this.value;
    }

    // Returns the type of value in this Data
    public getDataType(): DataType {
        return this.dataType;
    }

    // Sets the type of value in this Data. Recommended to just use setData()
    // to keep the value and its data type matching consistently
    public setDataType(dt: DataType): void {
        this.dataType = dt;
    }

    // Sets the value of this Data and finds the data type
    public setData(value: String | number | IFormulas): void {
        if (typeof(value) ===  'string') {
            this.dataType = DataType.STRING;
            this.value = value;
        } else if (typeof(value) === 'number') {
            this.dataType = DataType.NUMBER;
            this.value = value;
        } else if (value instanceof Sum || value instanceof Average) {
            this.dataType = DataType.FORMULA;
            this.value = value;
        } else {
            this.dataType = DataType.STRING;
            this.value = "";
        }
    }
}