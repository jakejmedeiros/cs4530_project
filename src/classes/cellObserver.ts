import { ICells } from "src/interfaces/cells.interface";
import { IObserver } from "../interfaces/observer.interface";

// An observer class for a cell to keep track of cell's state
export class CellObserver implements IObserver {
    private state: String;

    public constructor(private cell: ICells) {
        this.state = cell.getState();
    }

    public update(): void {
        this.cell.updateState();
    }

    public getCell() {
        return this.cell;
    }
}