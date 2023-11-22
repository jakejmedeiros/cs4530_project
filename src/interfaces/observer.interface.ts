import { ICells } from "./cells.interface";

export interface IObserver {
    update(): void;
    getCell(): ICells;
}