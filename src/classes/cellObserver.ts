import { ICells } from "src/interfaces/cells.interface";
import { IObserver } from "../interfaces/observer.interface";

// An observer class for a cell to keep track of cell's state
export class CellObserver implements IObserver {

    public constructor(private subject: ICells) {
        subject.attach(this);
    }

    update(): void {
        console.log("This cell was updated");
    }
}