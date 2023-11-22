import { ICells } from 'src/interfaces/cells.interface';
import { ColumnNameTranslate } from './columnNameTranslate';

export class Parser {
  
    // Parses when a user inputs a reference to a cell. Returns true if the input is a command (REF, SUM, AVG).
    // Returns false if the input is not a command
    public static referenceParse(cell: ICells, input: String): boolean {
        const nearley = require("nearley");
        const grammar = require("src/grammars/reference.js");
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        try {
            const command = input.toUpperCase();
            parser.feed(command);
            if (parser.results[0].function === "REF") {
                cell.setState(command);
                const column: number = ColumnNameTranslate.columnName(parser.results[0].column) - 1;
                const row: number = parser.results[0].row - 1;
                cell.cellReference(column, row);
                return true;
            }
        } catch {
            cell.setData(input);
        }
        return false;
    }
}
