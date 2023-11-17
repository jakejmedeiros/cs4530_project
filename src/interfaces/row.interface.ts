import { IColumn } from "./column.interface";

export interface IRow {

    addColumn(column: IColumn): void;

    removeColumn(index: number): void;

    getColumn(index: number): IColumn;
    
    getSize(): number
}