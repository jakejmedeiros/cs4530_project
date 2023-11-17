import { ICells } from "./cells.interface"

// Interface for an error class
export interface IErrorAlert {

    report(): any

    // Convert this error class to a string
    toText(): String
}