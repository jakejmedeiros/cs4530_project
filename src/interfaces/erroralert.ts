import { ICells } from "./cells"

export interface IErrorAlert {
    errorCell: ICells

    report()
    toText()
}