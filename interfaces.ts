// Phase B Interfaces

interface IObserver {
    update(): void
}

interface ICells {
    attatch(observer: IObserver): void,
    detatch(observer: IObserver): void,
    notify(): void
}

interface IData {
    getDataType(): void
}