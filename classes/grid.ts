import { Cells } from "./cellsImpl";
import { Column } from "./column"

export class Grid {
    private instance: Grid | null = null
    private cells: Cells[][];
    private selectedCell: Cells | null;

    public constructor() {
        this.cells = [];
        this.selectedCell = null;
    }

    getInstance() {
        if (this.instance == null) {
            this.instance = new Grid();
        }
        return this.instance
    }

    addColumn(column: Column) {
        throw new Error("Method not implemented.");
    }

    selectCell(x: number, y: number): void {
        if (x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[x].length) {
            this.selectedCell = this.cells[x][y];
        } 
        else {
            throw new Error("Selected cell is out of bounds.");
        }
    }

    initialize(rows: number, columns: number): void {
        this.cells = Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => new Cells()))
    }
}