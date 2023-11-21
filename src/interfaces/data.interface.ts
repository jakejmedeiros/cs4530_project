import { DataType } from "../enums/datatype";
import { IFormulas } from "./formulas.interface";

export interface IData {
    getValue(): String | number | IFormulas;
    setData(value: String | number | IFormulas): void;
    getDataType() : DataType;
    setDataType(dt: DataType): void;
}