import { ICells } from "src/interfaces/cells.interface";
import { IObserver } from "../interfaces/observer.interface";

// An observer class for a cell to keep track of cell's state. The observer contains the
// cell that is doing the observing
export class CellObserver implements IObserver {

    public constructor(private cell: ICells) {}

    // Updates the cell doing the observing whenever this observer is notified
    public update(): void {
        this.cell.updateCell();
    }

    // Returns the cell that is doing the observing
    public getCell() {
        return this.cell;
    }
}