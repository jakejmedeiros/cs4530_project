import { ICells } from 'src/interfaces/cells.interface';
import { ColumnNameTranslate } from './columnNameTranslate';
import { Grid } from '../grid';
import { Sum } from '../formulas/sum';
import { Average } from '../formulas/average';
import { IObserver } from 'src/interfaces/observer.interface';
import { CellObserver } from '../cellObserver';
import { IFormulas } from 'src/interfaces/formulas.interface';
import { IErrorAlert } from 'src/interfaces/erroralert.interface';
import { InvalidDataTypeError } from '../errorHandling/InvalidDataTypeError';
import { create, all } from 'mathjs';
import { InvalidInputError } from '../errorHandling/InvalidInputError';
import { BadReferenceInFormula } from '../errorHandling/BadReferenceError';
import { InvalidFormulaSyntax } from '../errorHandling/InvalidFormulaSyntax';

// A class for util methods having to do with parsing. Should only call runCellState
// outside of this class. The rest of the methods are helper methods for runCellState
export class Parser {

    // Takes a given range in the form of a start row number, a start column number, an end row number, and an end column number
    // Returns a list of cells within the range of the given row and column numbers (inclusive)
    private static getCellList(r1: number, c1: number, r2: number, c2: number, holdingCell: ICells): ICells[] {
        const grid = Grid.getInstance();
        const cellList: ICells[] = [];
        for (let x = r1; x < r2+1; x++) {
            for (let y = c1; y < c2+1; y++) {
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
    private static referenceParse(cell: ICells, input: String): {output: String | number, attaches: ICells[]} {
        // A type to store the computed value and the cells needing to be observed
        type referenceSet = {
            output: String | number,
            attaches: ICells[]
        }

        // Concrete type
        const ref: referenceSet = {
            output: "",
            attaches: []
        }

        // Check if command is a reference, Sum, or Average command
        try {
            // Checks the first three characters to see which command it is
            const cleanInput: String = input.trim();
            const command = cleanInput.toUpperCase();
            const method: String = command.substring(0,3);

            if (method === "REF") {
                // Reference command
                const nearley = require("nearley");
                const grammar = require("src/grammars/reference.js");
                const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
                parser.feed(command);
                const column: number = ColumnNameTranslate.columnName(parser.results[0].column) - 1;
                const row: number = parser.results[0].row - 1;
                const grid = Grid.getInstance();
                const refCell: ICells = grid.getSingleCell(row, column);
                let refVal = refCell.getValue();
                let refAns: String | number = "";
                if (refVal instanceof Sum || refVal instanceof Average) {
                    refAns = refVal.getCalculation();
                } else if (typeof refVal === 'number' || typeof refVal === 'string') {
                    refAns = refVal;
                }
                ref.output = refAns;
                ref.attaches = [refCell];
            } else if (method === "SUM") {
                // Sum command
                const nearley = require("nearley");
                const grammar = require("src/grammars/sumRange.js");
                const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
                parser.feed(command);
                const c1: number = ColumnNameTranslate.columnName(parser.results[0].startColumn) - 1;
                const r1: number = parser.results[0].startRow - 1;
                const c2: number = ColumnNameTranslate.columnName(parser.results[0].endColumn) - 1;
                const r2: number = parser.results[0].endRow - 1;
                const cellRange: ICells[] = this.getCellList(r1, c1, r2, c2, cell);
                const cellSum: IFormulas = new Sum(cellRange);
                ref.output = cellSum.getCalculation();
                ref.attaches = cellRange;
            } else if (method === "AVG") {
                // Average command
                const nearley = require("nearley");
                const grammar = require("src/grammars/avgRange.js");
                const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
                parser.feed(command);
                const c1: number = ColumnNameTranslate.columnName(parser.results[0].startColumn) - 1;
                const r1: number = parser.results[0].startRow - 1;
                const c2: number = ColumnNameTranslate.columnName(parser.results[0].endColumn) - 1;
                const r2: number = parser.results[0].endRow - 1;
                const cellRange: ICells[] = this.getCellList(r1, c1, r2, c2, cell);
                const cellAvg: IFormulas = new Average(cellRange);
                ref.output = cellAvg.getCalculation();
                ref.attaches = cellRange;
            }
        } catch {
            // If the command is not REF, SUM, or AVG, it just returns the original command
            return ref;
        }
        return ref;
    }

    // Checks if the given input is contained within quotes to ensure that the input is 
    // meant to be a string
    private static isStringInput = (input: String): boolean => {
        return ((input.charAt(0) === '"'
        && input.charAt(input.length - 1) === '"')
        || (input.charAt(0) === "'"
        && input.charAt(input.length - 1) === "'"))
    }

    // Checks if the input is a string input or number input
    private static typeCheck = (input: any, cell: ICells): number | String | IErrorAlert => {
        let newInput: number | String | IErrorAlert = "";
        
        // Checks if input is a string inputted correctly or number. Otherwise, an error is thrown
        // for the incorrect syntax of the input
        if (this.isStringInput(input)) {
            newInput = input.substring(1, input.length-1);
        } else if (Number.isFinite(Number(input))) {
            newInput = Number(input);
        } else {
            const err: IErrorAlert = new InvalidInputError(cell);
            newInput = err;
        }
        return newInput;
    }

    // Processes a single command. It can either be a single command or from a formula
    private static commandCheck = (command: String, cell: ICells): String | number | IErrorAlert => {
        let input;
        //commandReferences contains the list of cells to attach an observer to
        const commandReferences: {output: String | number, attaches: ICells[]} = this.referenceParse(cell, command);
        if (commandReferences.attaches.length === 0) {
            input = this.typeCheck(command, cell);
        } else {
            input = commandReferences.output;
            if (Number.isNaN(input)) {
                const err: IErrorAlert = new BadReferenceInFormula(cell);
                return err;
            }
            const attaches = commandReferences.attaches;
            const watched: ICells[] = cell.getCellsObserved().concat(attaches);
            cell.setCellsObserved(watched);
            attaches.forEach(observedCell => {
                const obs: IObserver = new CellObserver(cell);
                observedCell.attach(obs);
            });
        }
        return input;
      }

    // Does a second round of parsing to separate parentheses when not a part of a reference, sum, or average
    // command
    private static parseParenthesis = (commandList: String[]) => {
        let newCommandList: String[] = [];
        let secondCommandList: String[] = [];
        let finalCommandList: String[] = [];
        commandList.forEach((command) => {
            const refSplit: String[] = command.split(/[A-Z]{3}\([A-Z]+\d+\)/);
            newCommandList = newCommandList.concat(refSplit);
        });
        newCommandList.forEach((command) => {
            const formulaSplit: String[] = command.split(/[A-Z]{3}\([A-Z]+\d+\.\.[A-Z]+\d+\)/);
            secondCommandList = secondCommandList.concat(formulaSplit);
        });
        secondCommandList.forEach((command) => {
            let start: number = 0;
            if (command.charAt(0) === '(') {
                finalCommandList = finalCommandList.concat('(');
                start = 1;
            }
            if (command.charAt(command.length-1) === ')'
                && (command.substring(0, command.length-1).match(/\([a-z]+\d+\)/gi)
                    || command.substring(0, command.length-1).match(/\([a-z]+\d+\.\.[a-z]+\d+\)/gi)
                    || parseFloat(command.substring(0, command.length-1)))) {
                finalCommandList = finalCommandList.concat(command.substring(start, command.length-1));   
                finalCommandList = finalCommandList.concat(')');
            } else {
                finalCommandList = finalCommandList.concat(command.substring(start));
            }
        });
        finalCommandList = finalCommandList.map((symbol) => symbol.trim());
        return finalCommandList;
    }

    // Runs the given state of a cell
    public static runCellState(cell: ICells): void {
        const state: String = cell.getState();
        // If the input is empty
        if (state === '') {
            cell.setData('');
            return;
        }
        let newValue: String | number = '';

        // Splits the string by arithmetic symbols
        let commandList: String[] = state.split(/(\s*\+|-|\*|\/|\^\s*)/);
        commandList = commandList.filter(str => str !== "");
        const commListParenthesis: String[] = this.parseParenthesis(commandList);
        let parsedList: String[] = [];
        let typeTracker: String = "";

        // Goes through the list of parsed elements from the command, processing them one at a time to make
        // them constants (number or string)
        for (let command of commListParenthesis) {
            let commItem: String | number | IErrorAlert = "";
            if (command === '+' || command === '-' || command === '*'
                || command === '/' || command === '^' 
                || command === '(' || command === ')') {
                commItem = command;
            } else {
                commItem = this.commandCheck(command, cell);
                if (typeTracker !== "" && typeof commItem !== typeTracker) {
                    const err = new InvalidDataTypeError(cell);
                    typeTracker = err.toText();
                    break;
                } else if (commItem instanceof InvalidInputError
                    || commItem instanceof BadReferenceInFormula) {
                    typeTracker = commItem.toText();
                    break;
                } else {
                    typeTracker = typeof commItem;
                    commItem = commItem.toString();
                }
            }
            parsedList.push(commItem);
        };

        // Checks typeTracker to process parsed command correctly
        if (typeTracker === 'number') {
            newValue = parsedList.join('');
            try{
                // from mathjs package
                const math = create(all);
                const result: number = math.evaluate(newValue as string);
                cell.setData(result);
            } catch {
                const err: IErrorAlert = new InvalidFormulaSyntax(cell);
                alert(err.toText());
                cell.setData("");
                cell.setState("");
                return;
            }
        } else if (typeTracker === 'string') {
            const hasValidSymbols: boolean = parsedList.some((str) => {
                const ans: boolean = this.isStringInput(str) || str === '+';
                return ans;
            });
            if (parsedList.length > 1 && !hasValidSymbols) {
                const err: IErrorAlert = new InvalidDataTypeError(cell);
                alert(err.toText());
                cell.setData("");
                cell.setState("");
                return;
            }
            parsedList = parsedList.filter((str) => str !== "+");
            newValue = parsedList.join('');
            cell.setData(newValue.toString());
        } else {
            alert(typeTracker);
            cell.setData("");
            cell.setState("");
        }
    }
}

