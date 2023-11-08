import { DataType } from "../enums/datatype";
import { IFormulas } from "./formulas.interface";

export interface IData {
    getValue(): String | number | IFormulas | null;
    setData(value: String | number | IFormulas | null): void;
    getDataType() : DataType;
    setDataType(dt: DataType): void;
}