import { DataType } from "../enums/datatype";
import { ICells } from "../interfaces/cells.interface";
import { IData } from "../interfaces/data.interface";
import { IFormulas } from "../interfaces/formulas.interface";
import { IObserver } from "../interfaces/observer.interface";
import { CellObserver } from "./cellObserver";
import { Data } from "./dataImpl";
import { Grid } from "./grid";
import { Parser } from "./utils/parser";

export class Cells implements ICells {
    private observers = new Array<IObserver>();
    private data: IData;
    private state: String;

    public constructor(value: String | number,
    private x: number, private y: number) {
        this.data = new Data(value);
        this.state = "";
    }

    public attach(o: IObserver): void {
        const sameObserver = (obs: IObserver) => {
            return (obs.getCell().getX() === o.getCell().getX())
            && (obs.getCell().getY() === o.getCell().getY());
        };
        if(!this.observers.some(sameObserver)) { 
            this.observers.push(o);
        }
    }

    public detach(o: IObserver): void {
        this.observers.splice(this.observers.indexOf(o));
    }

    public notify(): void {
        for (let o of this.observers) {
            o.update();
        }
    }

    public getValue(): String | number | IFormulas {
        return this.data.getValue();
    }

    public setData(data: String | number | IFormulas): void {
        this.data.setData(data);
        this.notify();
    }

    public updateState(): void {
        console.log("Updating state...");
        Parser.referenceParse(this, this.getState());
    }

    public getDataType(): DataType {
        return this.data.getDataType();
    }

    public setDataType(dt: DataType): void {
        this.data.setDataType(dt);
    }
    
    public getState(): String {
        return this.state;
    }

    public setState(input: String): void {
        this.state = input;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public cellReference(row: number, column: number): void {
        const grid = Grid.getInstance();
        const refCell = grid.getSingleCell(row, column);
        refCell.attach(new CellObserver(this));
        const refValue: number | String | IFormulas = refCell.getValue();
        this.setData(refValue);
    }
}