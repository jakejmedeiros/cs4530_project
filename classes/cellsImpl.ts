import { ICells } from "../interfaces/cells";
import { IObserver } from "../interfaces/observer";

export class Cells implements ICells {
    attatch(observer: IObserver) {
        throw new Error("Method not implemented.");
    }
    detatch(observer: IObserver) {
        throw new Error("Method not implemented.");
    }
    notify() {
        throw new Error("Method not implemented.");
    }
    
    private getState() {
        throw new Error("Method not implemented.");
    }

    private setState() {
        throw new Error("Method not implemented.");
    }

    private getX() {
        throw new Error("Method not implemented.");
    }

    private getY() {
        throw new Error("Method not implemented.");
    }
}