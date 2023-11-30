import { DataType } from "../enums/datatype"
import { IFormulas } from "./formulas.interface";
import { IObserver } from "./observer.interface";

// An interface representing a cell in a spreadsheet
export interface ICells {
    // Adds the given observer to the list of observers this cell can notify
    attach(observer: IObserver): void;

    // Removes the given observer from this cell's list of observers
    detach(observer: IObserver): void;

    // Notifies every observer in this cell's list of observers.
    // This cell should notify its observers whenever its data changes
    notify(): void;

    // Returns this cell's list of observers
    getObservers(): IObserver[];

    setCellState(setCellEditValue: (value: React.SetStateAction<string>) => void): any;

    // Returns the value of this cell's data. The data type should be a string, number, or IFormula
    getValue(): String | number | IFormulas;

    // Sets the data this cell contains
    setData(data: String | number | IFormulas): void;
    
    // Updates the cell. Usually called when a cell that this cell is observing has 
    // its value changed
    updateCell(): void;

    // Return the data type of this cell's data. It is an enum of 
    getDataType(): DataType;

    // Directly sets the data type of the data this cell contains. Should prioritize using setData() instead to 
    // keep data value and data type consistent
    setDataType(dt: DataType): void;

    // Returns the state of this cell
    getState(): String;

    // Sets the state of this cell. The state is the command that was typed into this
    // cell. The 'state' is translated into the cell's value
    setState(input: String): void;
    
    // Returns the x coordinate of this cell. The x coordinate reflects the column this cell
    // is in
    getX(): number;

    // Returns the y coordinate of this cell. The y coordinate reflects the row this cell
    // is in
    getY(): number;

    // Sets up for this cell to observe a cell at a given coordinate when that cell is referenced by
    // this cell 
    cellReference(row: number, column: number): {refCell: ICells, observer: IObserver}

    // Sets the list of cells that this cell is observing through reference and/or sum/average
    setCellsObserved(cells: ICells[]): void;

    // Returns the list of cells that this cell is observing through reference and/or sum/average
    getCellsObserved(): ICells[]
}