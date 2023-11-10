import { DataType } from "../enums/datatype"
import { IFormulas } from "./formulas";
import { IObserver } from "./observer";
export interface ICells {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
    getValue(): String | number | IFormulas | null;
    setData(data: String | number | IFormulas): void;
    getDataType(): DataType;
    setDataType(dt: DataType): void;
    getState(): any;
    setState(): void;
    getX(): number;
    getY(): number;
}