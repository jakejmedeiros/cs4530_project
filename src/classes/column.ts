import { IColumn } from "src/interfaces/column.interface";
import { ICells } from "src/interfaces/cells.interface";

export class Column implements IColumn{

    public constructor(private cells: ICells[]) {}

    public removeCell(index: number):void  {
        this.cells.splice(index, 1);
    }

    public addCell(cell: ICells): void {
        this.cells.push(cell);
    }

    public getSize(): number {
        return this.cells.length;
    }

}