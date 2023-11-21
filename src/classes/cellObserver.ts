import { ICells } from "src/interfaces/cells.interface";
import { IObserver } from "../interfaces/observer.interface";

// An observer class for a cell to keep track of cell's state
export class CellObserver implements IObserver {
    private state: String;

    public constructor(private cell: ICells) {
        cell.attach(this);
        this.state = cell.getState();
    }

    public update(): void {
        console.log("This cell was updated: " + this.cell.getX() + ", " + this.cell.getY());
        this.state = this.cell.getState();
    }

    public getCell() {
        return this.cell;
    }
}