import { DataType } from "../enums/datatype"
import { IFormulas } from "./formulas.interface";
import { IObserver } from "./observer.interface";

export interface ICells {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
    getValue(): String | number | IFormulas;
    setData(data: String | number | IFormulas): void;
    getDataType(): DataType;
    setDataType(dt: DataType): void;
    getState(): String;
    setState(input: String): void;
    getX(): number;
    getY(): number;
    cellReference(row: number, column: number): void;
}