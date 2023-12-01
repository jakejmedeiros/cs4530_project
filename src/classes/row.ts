import { IRow } from "src/interfaces/row.interface";
import { IColumn } from "src/interfaces/column.interface";

// This class represents a row in a grid containing columns of cells. This class is, in practice, represents a list of lists of cells
export class Row implements IRow {

    public constructor(private columns: Array<IColumn>) {}
    
    public addColumn(column: IColumn): void {
        this.columns.push(column);
    }

    public removeColumn(index: number): void {
        this.columns.splice(index, 1);
    }

    public getColumn(index: number): IColumn {
        return this.columns[index];
    }
    
    public getSize(): number {
        return this.columns.length;
    }
}