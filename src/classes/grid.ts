import { Cells } from "./cellsImpl";
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

    // Returns the instance of this Singleton Grid.
    public static getInstance(): Grid {
        if (!this.instance) {
            this.instance = new Grid();
        }
        return this.instance;
    }

    // Adds a row to the grid
    public addRow() {
        const newRow: ICells[] = [];
        const columns = this.cells[0].length;
        for (let y = 0; y < columns; y++) {
            newRow.push(new Cells("", this.cells.length, y));
        }
        this.cells.push(newRow);
    }

    public removeRow(index: number): void {
        if (index >= 0 && index < this.cells.length) {
            this.cells.splice(index,1);
        } else {
            throw new Error("Row index out of bounds.")
        }
    }

    public addColumn() {
        const newColumnIndex = this.cells[0].length; 
        this.cells.forEach((row, rowIndex) => {
          const newCell: ICells = new Cells("", newColumnIndex, rowIndex);
          row.push(newCell); 
        });
    }

    public removeColumn() {
        this.cells.forEach((row, rowIndex) => {
            row.pop();
        });
    }

    public clearRow(targetIndex: number) {
        this.cells.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (rowIndex == targetIndex) {
                    this.cells[rowIndex][columnIndex] = new Cells("", columnIndex, rowIndex)
                }
            });
        });
    }

    public clearColumn(targetIndex: number) {
        this.cells.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (columnIndex == targetIndex) {
                    this.cells[rowIndex][columnIndex] = new Cells("", columnIndex, rowIndex)
                }
            });
        });
    }


    // Returns the list of list of cells in this Grid
    public getCells(): Array<Array<ICells>> {
        return this.cells;
    }

    // Finds a single cell within this Grid using the given row and column
    public getSingleCell(row: number, column: number): ICells {
        return this.cells[row][column];
    }

    // Saves the selected cell as a way to communicate between the UI and backend
    public selectCell(x: number, y: number): void {
        if (x >= 0 && x < this.cells.length && y >= 0 && y < this.cells[x].length) {
            this.selectedCell = this.cells[x][y];
        } 
        else {
            throw new Error("Selected cell is out of bounds.");
        }
    }

    // Initializes this Grid with the given number of rows and columns
    public initialize(rows: number, columns: number): void {
        let x = 0;
        const initCells: ICells[][] = [];
        Array.from({ length: columns }, () => {
            let y = 0;
            let initRow: ICells[] = [];
            Array.from({ length: rows }, () => {
                initRow.push(new Cells("", x, y));
                y++;
            });
            initCells.push(initRow);
            x++;
        })
        this.cells = initCells;
    }
}