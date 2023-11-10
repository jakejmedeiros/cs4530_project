import { Cells } from "../classes/cellsImpl";
import { Grid } from "../classes/grid";
import { ICells } from "./cells";
import { IErrorAlert } from "./erroralert";
import { IObserver } from "./observer";

export class SpreadSheetModel {
    private _cells: ICells;
    private _errorAlert: IErrorAlert | null;
    private _grid: Grid;
    private _observers: IObserver[];

    public constructor() {
        this._cells = new Cells();
        this._errorAlert = null;
        this._grid = new Grid();
        this._observers = [];
    }

    public attachObserver(observer: IObserver): void {
        this._observers.push(observer);
      }

    public detachObserver(observer: IObserver): void {
        const index = this._observers.indexOf(observer);
        if (index !== -1) {
          this._observers.splice(index, 1);
        }
      }

    public notifyObervers(): void {
        for (const observer of this._observers) {
            observer.update();
        }
    }

    


}