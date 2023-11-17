import { ICells } from "./cells.interface";

export interface IColumn {
    removeCell(index: number):void;

    addCell(cell: ICells): void;

    getSize(): number;
}