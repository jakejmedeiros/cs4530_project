import { IFormulas } from "src/interfaces/formulas.interface";
import { ICells } from "src/interfaces/cells.interface";
import { Cells } from "../cellsImpl";
import { Sum } from "./sum";

// Test Suite for Sum class
describe('Sum', () => {
    let sumClass: IFormulas;
    let mainCell: ICells;
    let cell1: ICells;
    let cell2: ICells;
    let cell3: ICells;
    let cell4: ICells;
    let cell5: ICells;
    let cellRange: ICells[];
  
    beforeEach((): void => {
        mainCell = new Cells("", 1, 1);
        cell1 = new Cells(2, 2, 5);
        cell2 = new Cells(3, 2, 6);
        cell3 = new Cells(5, 2, 7);
        cell4 = new Cells(10, 3, 5);
        cell5 = new Cells(10, 3, 5);
        cellRange = [cell1, cell2, cell3, cell4, cell5];
        sumClass = new Sum(cellRange);
        mainCell.setData(sumClass);
    });
  
    afterEach((): void => {
      jest.clearAllMocks();
    });
  
    // calcuate() method
    describe('calculate()', (): void => {
      it(`The premade Sum from beforeEach() should return the sum of the premade cell's values (30)`, () => {
        const totalSum: number = sumClass.calculate();
  
        expect(totalSum).toEqual(30);
      });

      it(`This Sum that doesn't contain a cell range should return 0`, () => {
        const sum: IFormulas = new Sum([]);
        const total: number = sum.calculate();
  
        expect(total).toEqual(0);
      });

      it(`This Sum that contains a non-number a cell range should return 0`, () => {
        const cell: ICells = new Cells("foo", 1, 2);
        const sum: IFormulas = new Sum([cell]);
        const total: number = sum.calculate();
  
        expect(total).toEqual(0);
      });

      it(`This Sum that contains a number (3) and a non-number a cell range should return 3`, () => {
        const cell: ICells = new Cells("foo", 1, 2);
        const cell2: ICells = new Cells(3, 1, 2);
        const sum: IFormulas = new Sum([cell, cell2]);
        const total: number = sum.calculate();
  
        expect(total).toEqual(3);
      });
    });

    // getCalculation() method
    describe('getCalculation()', (): void => {
        it(`This Sum that contains an empty cell range should return 0`, () => {
            const sum: IFormulas = new Sum([]);
            const total: number = sum.getCalculation();
      
            expect(total).toEqual(0);
        });

        it(`The premade Sum from beforeEach() should return the sum of the premade cell's values (30)`, () => {
            const sum: IFormulas = new Sum([]);
            const total: number = sumClass.getCalculation();
      
            expect(total).toEqual(30);
        });

        it(`The premade Sum from beforeEach() should still return 30 after calling calculate() and getCalculation()`, () => {
            const sum: IFormulas = new Sum([]);
            const total: number = sumClass.calculate();
            const retrieveTotal: number = sumClass.getCalculation();
      
            expect(retrieveTotal).toEqual(30);
        });

        it(`This Sum that contains an empty cell range should return 0`, () => {
            const sum: IFormulas = new Sum([]);
            const total: number = sum.getCalculation();
      
            expect(total).toEqual(0);
        });

        it(`This Sum that contains a number (8) and a non-number a cell range should return 8`, () => {
            const cell: ICells = new Cells("foo", 1, 2);
            const cell2: ICells = new Cells(8, 1, 2);
            const sum: IFormulas = new Sum([cell, cell2]);
            const total: number = sum.getCalculation();
      
            expect(total).toEqual(8);
          });
    });
});