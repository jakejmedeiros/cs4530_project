import { DataType } from "../enums/datatype";
import { ICells } from "../interfaces/cells.interface";
import { IData } from "../interfaces/data.interface";
import { IFormulas } from "../interfaces/formulas";
import { IObserver } from "../interfaces/observer";
import { Data } from "./dataImpl";

export class Cells implements ICells {
    private observers = new Array<IObserver>();
    private data: IData;

    public constructor(value: String | number | null,
    private x: number, private y: number) {
        this.data = new Data(value);
    }

    public attach(o: IObserver): void {
        if(!this.observers.includes(o)) {
            this.observers.push(o)
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

    public getValue(): String | number | IFormulas | null {
        return this.data.getValue();
    }

    public setData(data: String | number | IFormulas): void {
        this.data.setData(data);
    }

    public getDataType(): DataType {
        return this.data.getDataType();
    }

    public setDataType(dt: DataType): void {
        this.data.setDataType(dt);
    }
    
    public getState(): any {
        throw new Error("Method not implemented.");
    }

    public setState(): void {
        throw new Error("Method not implemented.");
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}