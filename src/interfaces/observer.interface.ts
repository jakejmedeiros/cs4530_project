import { ICells } from "./cells.interface";

// An interface class for an observer
export interface IObserver {

    // Updates the observing cell
    update(): void;

    // Returns the cell doing the observing
    getCell(): ICells;
}