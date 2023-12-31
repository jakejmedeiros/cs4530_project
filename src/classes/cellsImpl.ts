import { DataType } from "../enums/datatype";
import { ICells } from "../interfaces/cells.interface";
import { IData } from "../interfaces/data.interface";
import { IFormulas } from "../interfaces/formulas.interface";
import { IObserver } from "../interfaces/observer.interface";
import { Data } from "./dataImpl";
import { Grid } from "./grid";
import { Parser } from "./utils/parser";

// A class representing a cell in the spreadsheet
export class Cells implements ICells {
    private observers = new Array<IObserver>();
    private data: IData;
    private state: String;
    private cellViewFunction: ((value: React.SetStateAction<string>) => void) = () => {return ""};
    private cellsObserved: ICells[] = [];

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
        const newObs: IObserver[] = this.observers.filter(obs => 
            (obs.getCell().getX() !== o.getCell().getX()) 
            && (obs.getCell().getY() !== o.getCell().getY()));
        this.observers = newObs;
    }

    // Notifies every observer in this cell's list of observers.
    // This cell should notify its observers whenever its data changes
    public notify(): void {
        for (let o of this.observers) {
            o.update();
        }
    }

    // Returns this cell's list of observers
    public getObservers(): IObserver[] {
        return this.observers;
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
        Parser.runCellState(this);
        this.cellViewFunction((this.getValue() ?? "").toString());
        const grid = Grid.getInstance();
        grid.setCellInGrid(this.x, this.y, this);
    }

    // Set this cell's cellViewFunction so the corresponding cellBox can be updated visually
    public setCellState(setCellEditValue: (value: React.SetStateAction<string>) => void): void {
        this.cellViewFunction = setCellEditValue;
    }

    // Return the data type of this cell's data. It is an enum of 
    public getDataType(): DataType {
        return this.data.getDataType();
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

    // Sets the list of cells that this cell is observing through reference and/or sum/average
    public setCellsObserved(cells: ICells[]): void {
        this.cellsObserved = cells;
    }

    // Returns the list of cells that this cell is observing through reference and/or sum/average
    public getCellsObserved(): ICells[] {
        return this.cellsObserved;
    }
};