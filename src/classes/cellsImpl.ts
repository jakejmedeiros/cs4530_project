import { DataType } from "../enums/datatype";
import { ICells } from "../interfaces/cells.interface";
import { IData } from "../interfaces/data.interface";
import { IFormulas } from "../interfaces/formulas.interface";
import { IObserver } from "../interfaces/observer.interface";
import { CellObserver } from "./cellObserver";
import { Data } from "./dataImpl";
import { Grid } from "./grid";
import { Parser } from "./utils/parser";

// A class representing a cell in the spreadsheet
export class Cells implements ICells {
    private observers = new Array<IObserver>();
    private data: IData;
    private state: String;
    private isNeedsUpdate: boolean = false;

    public constructor(value: String | number | IFormulas,
    private x: number, private y: number) {
        this.data = new Data(value);
        this.state = "";
    }

    // Adds the given observer to the list of observers this cell can notify
    public attach(o: IObserver): void {
        const sameObserver = (obs: IObserver) => {
            return (obs.getCell().getX() === o.getCell().getX())
            && (obs.getCell().getY() === o.getCell().getY());
        };
        if(!this.observers.some(sameObserver)) { 
            this.observers.push(o);
        }
    }

    // Removes the given observer from this cell's list of observers
    public detach(o: IObserver): void {
        this.observers.splice(this.observers.indexOf(o));
    }

    // Notifies every observer in this cell's list of observers.
    // This cell should notify its observers whenever its data changes
    public notify(): void {
        for (let o of this.observers) {
            o.update();
        }
    }

    // Returns true if this cell contains observers, false otherwise
    public hasObservers(): boolean {
        return this.observers.length > 0;
    }

    // Returns the value of this cell's data. The data type should be a string or number
    public getValue(): String | number | IFormulas {
        return this.data.getValue();
    }

    // Sets the data this cell contains
    public setData(data: String | number | IFormulas): void {
        this.data.setData(data);
        this.notify();
    }

    // Updates the cell. Usually called when a cell that this cell is observing has 
    // its value changed
    public updateCell(): void {
        Parser.referenceParse(this, this.getState());
    }

    // Return the data type of this cell's data. It is an enum of 
    public getDataType(): DataType {
        return this.data.getDataType();
    }

    // Directly sets the data type of the data this cell contains. Should prioritize using setData() instead to 
    // keep data value and data type consistent
    public setDataType(dt: DataType): void {
        this.data.setDataType(dt);
    }
    
    // Returns the state of this cell
    public getState(): String {
        return this.state;
    }

    // Sets the state of this cell. The state is the command that was typed into this
    // cell. The 'state' is translated into the cell's value
    public setState(input: String): void {
        this.state = input;
    }

    // Returns the x coordinate of this cell. The x coordinate reflects the column this cell
    // is in
    public getX(): number {
        return this.x;
    }

    // Returns the y coordinate of this cell. The y coordinate reflects the row this cell
    // is in
    public getY(): number {
        return this.y;
    }

    // Sets up for this cell to observe a cell at a given coordinate when that cell is referenced by
    // this cell
    public cellReference(row: number, column: number): {refCell: ICells, observer: IObserver} {
        const grid = Grid.getInstance();
        const refCell: ICells = grid.getSingleCell(row, column);
        const observer: IObserver = new CellObserver(this);

        // refCell.attach(new CellObserver(this));
        // const refValue: number | String | IFormulas = refCell.getValue();
        return {
            refCell,
            observer
        }
    }
};