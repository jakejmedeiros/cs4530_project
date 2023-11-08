import { Column } from "./column"

export class Grid {
    private instance: Grid

    constructor(instance: Grid) {
        this.instance = instance
    }

    getInstance() {
        return this.instance
    }

    addColumn(column: Column) {
        throw new Error("Method not implemented.");
    }
}