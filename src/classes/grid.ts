import * as fs from 'fs';
import * as csv from 'fast-csv';
import { Cells } from "./cellsImpl";
import { ICells } from "src/interfaces/cells.interface";
import { IRow } from "src/interfaces/row.interface";
import { IColumn } from 'src/interfaces/column.interface';
import { Column } from './column';
import { Row } from './row';

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
    public addRow(row: Array<ICells>) {
        this.cells.push(row);
    }

    // Adds a column to the grid
    public addColumn(column: Array<ICells>) {
        this.cells.forEach((array, index) => {
            array.push(column[index]);
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

    //Save the entire grid into a .csv file using fast-csv
    public saveToCSV(filePath: string): void {
        const csvStream = csv.format({ headers: true });
        const writableStream = fs.createWriteStream(filePath);
    
        csvStream.pipe(writableStream);
    
        this.cells.forEach((row) => {
            const rowData = row.map(cell => cell.getValue().toString());
            csvStream.write(rowData);
        });
    
        csvStream.end();
    }

    
    //Load from a .csv file using fast-csv
    //the issue currently is that the construction of the Cells cannot tell what type the value is 
    /*
    public loadFromCSV(filePath: string): void {
        const csvStream = fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('data', (row) => {
                const rowData: ICells[] = Object.values(row).map((value, index) => new Cells(value, 0, index));
                this.addRow(rowData);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
            })
            .on('error', (error) => {
                console.error('Error parsing CSV file:', error);
            });
    }
    
    */
    
    
}