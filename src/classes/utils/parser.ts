import { ICells } from 'src/interfaces/cells.interface';
import { ColumnNameTranslate } from './columnNameTranslate';
import { Grid } from '../grid';
import { Sum } from '../formulas/sum';
import { Average } from '../formulas/average';
import { IObserver } from 'src/interfaces/observer.interface';
import { CellObserver } from '../cellObserver';
import { IFormulas } from 'src/interfaces/formulas.interface';

// A class for util methods having to do with parsing
export class Parser {

    // Takes a given range in the form of a start row number, a start column number, an end row number, and an end column number
    // Returns a list of cells within the range of the given row and column numbers (inclusive)
    private static getCellList(r1: number, c1: number, r2: number, c2: number, holdingCell: ICells): ICells[] {
        const grid = Grid.getInstance();
        const cellList: ICells[] = [];
        for (let x = c1; x < c2+1; x++) {
            for (let y = r1; y < r2+1; y++) {
                const currentCell: ICells = grid.getSingleCell(x,y);
                cellList.push(currentCell);
                const o: IObserver = new CellObserver(holdingCell);
                currentCell.attach(o);
            }
        }
        return cellList;
    }
  
    // Parses when a user inputs a reference to a cell. Returns true if the input is a REF, SUM, or AVERAGE command.
    // Returns false if the input is not a command
    public static referenceParse(cell: ICells, input: String): ICells[] {
        try {
            const cleanInput: String = input.trim();
            const command = cleanInput.toUpperCase();
            const method: String = command.substring(0,3);
            if (method === "REF") {
                const nearley = require("nearley");
                const grammar = require("src/grammars/reference.js");
                const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
                parser.feed(command);
                const column: number = ColumnNameTranslate.columnName(parser.results[0].column) - 1;
                const row: number = parser.results[0].row - 1;
                const grid = Grid.getInstance();
                const refCell: ICells = grid.getSingleCell(row, column);
                // const observer: IObserver = new CellObserver(cell);
                // ans = cell.cellReference(column, row);
                return [refCell];
            } else if (method === "SUM") {
                const nearley = require("nearley");
                const grammar = require("src/grammars/sumRange.js");
                const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
                parser.feed(command);
                const c1: number = ColumnNameTranslate.columnName(parser.results[0].startColumn) - 1;
                const r1: number = parser.results[0].startRow - 1;
                const c2: number = ColumnNameTranslate.columnName(parser.results[0].endColumn) - 1;
                const r2: number = parser.results[0].endRow - 1;
                const cellRange: ICells[] = this.getCellList(r1, c1, r2, c2, cell);
                const cellSum: IFormulas = new Sum(cell, cellRange);
                cell.setData(cellSum);
                return cellRange;
            } else if (method === "AVG") {
                const nearley = require("nearley");
                const grammar = require("src/grammars/avgRange.js");
                const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
                parser.feed(command);
                const c1: number = ColumnNameTranslate.columnName(parser.results[0].startColumn) - 1;
                const r1: number = parser.results[0].startRow - 1;
                const c2: number = ColumnNameTranslate.columnName(parser.results[0].endColumn) - 1;
                const r2: number = parser.results[0].endRow - 1;
                const cellRange: ICells[] = this.getCellList(r1, c1, r2, c2, cell);
                const cellAvg: IFormulas = new Average(cell, cellRange);
                cell.setData(cellAvg);
                return cellRange;
            }
        } catch {
            return [];
        }
        return [];
    }
}

