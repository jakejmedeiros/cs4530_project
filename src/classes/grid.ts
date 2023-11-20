import { IColumn } from "src/interfaces/column.interface";
import { Cells } from "./cellsImpl";
import { Column } from "./column"
import { IRow } from "src/interfaces/row.interface";
import { ICells } from "src/interfaces/cells.interface";

// Class for creating the grid of cells for the spreadsheet. Cells[x][y] where x is the row and y is the column
// The Grid class is an implementation of the Singletone design pattern
export class Grid {
    private static instance: Grid | null = null
    private cells: Array<Array<ICells>>;
    private selectedCell: ICells | null;

    private constructor() {
        this.cells = [];
        this.selectedCell = null;
    }

    public static getInstance(): Grid {
        if (!this.instance) {
            this.instance = new Grid();
        }
        return this.instance;
    }

    public addRow(row: Array<ICells>) {
        this.cells.push(row);
    }

    public addColumn(column: Array<ICells>) {
        this.cells.forEach((array, index) => {
            array.push(column[index]);
        });
    }

    public getCells(): Array<Array<ICells>> {
        return this.cells;
    }

    public getSingleCell(row: number, column: number): ICells {
        return this.cells[row][column];
    }

    public selectCell(x: number, y: number): void {
        if (x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[x].length) {
            this.selectedCell = this.cells[x][y];
        } 
        else {
            throw new Error("Selected cell is out of bounds.");
        }
    }

    public initialize(rows: number, columns: number): void {
        this.cells = Array.from({ length: columns }, () =>
        Array.from({ length: rows }, () => new Cells(null, 0, 0)));
    }
}