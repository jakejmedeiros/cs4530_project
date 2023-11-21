import React from 'react'
import { ICells } from 'src/interfaces/cells.interface';
import { ColumnNameTranslate } from './columnNameTranslate';

export class Parser {
  
    // Parses when a user inputs a reference to a cell
    public static referenceParse(cell: ICells): String {
        const nearley = require("nearley");
        const grammar = require("src/grammars/reference.js");
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
        try {
            parser.feed(cell.getValue());
            cell.setState(cell.getValue() ? cell.getValue().toString() : "");
            const column: number = ColumnNameTranslate.columnName(parser.results[0].column) - 1;
            const row: number = parser.results[0].row - 1;
            cell.cellReference(column, row);
        } catch {
        }
        return (cell.getValue() ?? "").toString();
    }
}
