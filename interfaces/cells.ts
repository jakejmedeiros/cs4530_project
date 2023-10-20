interface ICells {
    attatch(observer: IObserver)
    detatch(observer: IObserver)
    notify()
}