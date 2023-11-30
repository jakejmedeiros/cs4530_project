import Papa from "papaparse";
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
                    this.cells[rowIndex][columnIndex].setState("");
                    this.cells[rowIndex][columnIndex].setData("");
                    this.cells[rowIndex][columnIndex].updateCell();
                }
            });
        });
    }

    public clearColumn(targetIndex: number) {
        this.cells.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                if (columnIndex === targetIndex) {
                    this.cells[rowIndex][columnIndex].setState("");
                    this.cells[rowIndex][columnIndex].setData("");
                    this.cells[rowIndex][columnIndex].updateCell();
                }
            });
        });
    }



    // Returns the list of list of cells in this Grid
    public getCells(): ICells[][] {
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

    public setCellInGrid = (row: number, column: number, cell: ICells): void => {
        this.cells[row][column] = cell;
      }
    

      
    //Save the entire grid into a .csv file
    public saveToCSV(): void {
        const csvContent = this.cells.map(row => row.map(cell => cell.getValue().toString()).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

  // Load data from a CSV string and update the grid
public loadFromCSVString(csvString: string, setGrid: (value: React.SetStateAction<ICells[][]>) => void): void {
    const parsedData = Papa.parse<string[]>(csvString, { header: false }).data;
  
    let newGrid: ICells[][] = this.cells;

    if (parsedData.length > 0) {  
      // Determine the size of the grid based on the CSV data
      const maxRows = parsedData.length;
      const maxColumns = Math.max(...parsedData.map(row => row.length));
  
      // Initialize the grid with the determined size
      this.initialize(maxRows, maxColumns);
  
      // Populate the grid with data from the CSV
      newGrid = [];
      let newColumn: ICells[] = [];
      parsedData.forEach((row, rowIndex) => {
        newColumn = [];
        row.forEach((value, columnIndex) => {
            let valueInt: number | string = "";
            if (parseFloat(value)) {
                valueInt = parseFloat(value);
            } else if (value === "") {
                valueInt = "";
            } else {
                valueInt = "\"" + value + "\"";
            }
            const cell = new Cells(valueInt, rowIndex, columnIndex);
            cell.setState(valueInt.toString());
            newColumn = [...newColumn, cell];
        });
        newGrid = [...newGrid, newColumn];
        this.cells = newGrid;
        setGrid(newGrid);
      });
    };
  }
}