import { IFormulas } from "src/interfaces/formulas.interface";
import { ICells } from "src/interfaces/cells.interface";
import { Cells } from "../cellsImpl";
import { Average } from "./average";

// Test Suite for Average class
describe('Average', () => {
    let avgClass: IFormulas;
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
        avgClass = new Average(cellRange);
        mainCell.setData(avgClass);
    });
  
    afterEach((): void => {
      jest.clearAllMocks();
    });
  
    // calcuate() method
    describe('calculate()', (): void => {
      it(`The premade Average from beforeEach() should return the average of the premade cell's values (6)`, () => {
        const totalAvg: number = avgClass.calculate();
  
        expect(totalAvg).toEqual(6);
      });

      it(`This Average that doesn't contain a cell range should return 0`, () => {
        const avg: IFormulas = new Average([]);
        const total: number = avg.calculate();
  
        expect(total).toEqual(0);
      });

      it(`This Average that contains a non-number a cell range should return 0`, () => {
        const cell: ICells = new Cells("foo", 1, 2);
        const avg: IFormulas = new Average([cell]);
        const total: number = avg.calculate();
  
        expect(total).toEqual(0);
      });

      it(`This Average that contains a number (3) and a non-number a cell range should return 3`, () => {
        const cell: ICells = new Cells("foo", 1, 2);
        const cell2: ICells = new Cells(3, 1, 2);
        const avg: IFormulas = new Average([cell, cell2]);
        const total: number = avg.calculate();
  
        expect(total).toEqual(3);
      });
    });

    // getCalculation() method
    describe('getCalculation()', (): void => {
        it(`This Average that contains an empty cell range should return 0`, () => {
            const avg: IFormulas = new Average([]);
            const total: number = avg.getCalculation();
      
            expect(total).toEqual(0);
        });

        it(`The premade Average from beforeEach() should return the avg of the premade cell's values (6)`, () => {
            const avg: IFormulas = new Average([]);
            const total: number = avgClass.getCalculation();
      
            expect(total).toEqual(6);
        });

        it(`The premade Average from beforeEach() should still return 6 after calling calculate() and getCalculation()`, () => {
            const avg: IFormulas = new Average([]);
            const total: number = avgClass.calculate();
            const retrieveTotal: number = avgClass.getCalculation();
      
            expect(retrieveTotal).toEqual(6);
        });

        it(`This Average that contains an empty cell range should return 0`, () => {
            const avg: IFormulas = new Average([]);
            const total: number = avg.getCalculation();
      
            expect(total).toEqual(0);
        });

        it(`This Average that contains a number (8) and a non-number a cell range should return 8`, () => {
            const cell: ICells = new Cells("foo", 1, 2);
            const cell2: ICells = new Cells(8, 1, 2);
            const avg: IFormulas = new Average([cell, cell2]);
            const total: number = avg.getCalculation();
      
            expect(total).toEqual(8);
          });
    });
});