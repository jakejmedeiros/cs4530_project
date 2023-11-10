import { IObserver } from "./observer"

export interface ICells {
    attatch(observer: IObserver)
    detatch(observer: IObserver)
    notify()
}