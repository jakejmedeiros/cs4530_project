import { ICells } from "src/interfaces/cells.interface";
import { IObserver } from "../interfaces/observer.interface";

// An observer class for a cell to keep track of cell's state. The observer contains the
// cell that is doing the observing and the current state of that cell.
export class CellObserver implements IObserver {
    private state: String;

    public constructor(private cell: ICells) {
        this.state = cell.getState();
    }

    // Updates the cell doing the observing whenever this observer is notified
    public update(): void {
        this.cell.updateCell();
    }

    // Returns the cell that is doing the observing
    public getCell() {
        return this.cell;
    }
}