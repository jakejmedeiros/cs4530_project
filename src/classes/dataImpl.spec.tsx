import { ICells } from "src/interfaces/cells.interface";
import { Grid } from "./grid";
import { IData } from "src/interfaces/data.interface";
import { Data } from "./dataImpl";
import { IFormulas } from "src/interfaces/formulas.interface";
import { Sum } from "./formulas/sum";
import { Cells } from "./cellsImpl";
import { Average } from "./formulas/average";
import { DataType } from "src/enums/datatype";

describe('Data', () => {

    let grid: Grid;
  
    beforeEach((): void => {
      grid = Grid.getInstance();
      grid.initialize(10,10);
    });
  
    afterEach((): void => {
      jest.clearAllMocks();
    });
  
    describe('getValue()', () => {
      it('returning a string "test"', () => {
        const data1: IData = new Data("test");

        const val = data1.getValue();
  
        expect(val).toEqual("test");
      });

      it('returning a number (48)', () => {
        const data1: IData = new Data(48);

        const val = data1.getValue();
  
        expect(val).toEqual(48);
      });

      it('returning a Sum', () => {
        const cell1: ICells = new Cells(2, 2, 5);
        const cell2: ICells = new Cells(3, 2, 6);
        const sum: IFormulas = new Sum([cell1, cell2]);
        const data1: IData = new Data(sum);

        const val = data1.getValue();
  
        expect(val).toEqual(new Sum([cell1, cell2]));
      });

      it('returning a Average', () => {
        const cell1: ICells = new Cells(2, 2, 5);
        const cell2: ICells = new Cells(3, 2, 6);
        const avg: IFormulas = new Average([cell1, cell2]);
        const data1: IData = new Data(avg);

        const val = data1.getValue();
  
        expect(val).toEqual(new Average([cell1, cell2]));
      });
    });

    describe('getDataType()', () => {
        it('returning DataType.STRING for an empty string in data1', () => {
            const data1: IData = new Data("");
    
            const val: DataType = data1.getDataType();
      
            expect(val).toEqual(DataType.STRING);
        });

        it('returning DataType.STRING for an empty string in data1', () => {
            const data1: IData = new Data("");
    
            const val: DataType = data1.getDataType();
      
            expect(val).toEqual(DataType.STRING);
        });

        it('should return DataType.STRING for a string value in data1', () => {
          const data1: IData = new Data("test");
  
          const val: DataType = data1.getDataType();
    
          expect(val).toEqual(DataType.STRING);
        });

        it('should return DataType.NUMBER for a number value in data1', () => {
            const data1: IData = new Data(54);
    
            const val: DataType = data1.getDataType();
      
            expect(val).toEqual(DataType.NUMBER);
          });

        it('should return DataType.FORMULA for a Sum in data1', () => {
            const cell1: ICells = new Cells(2, 2, 5);
            const cell2: ICells = new Cells(3, 2, 6);
            const sum: IFormulas = new Sum([cell1, cell2]);
            const data1: IData = new Data(sum);
    
            const val: DataType = data1.getDataType();
      
            expect(val).toEqual(DataType.FORMULA);
        });

        it('should return DataType.FORMULA for a Average in data1', () => {
            const cell1: ICells = new Cells(2, 2, 5);
            const cell2: ICells = new Cells(3, 2, 6);
            const avg: IFormulas = new Average([cell1, cell2]);
            const data1: IData = new Data(avg);
        
            const val: DataType = data1.getDataType();
      
            expect(val).toEqual(DataType.FORMULA);
        });
    });

    describe('setData()', () => {
        it('should set data1 to an empty string and DataType.STRING', () => {
            const data1: IData = new Data("test");
            data1.setData("");
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual("");
            expect(valType).toEqual(DataType.STRING);
        });

        it('should set data1 to a string "test" and DataType.STRING', () => {
            const data1: IData = new Data("");
            data1.setData("test");
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual("test");
            expect(valType).toEqual(DataType.STRING);
        });

        it('should set data1 to a number (77) and DataType.NUMBER from a string', () => {
            const data1: IData = new Data("");
            data1.setData(77);
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual(77);
            expect(valType).toEqual(DataType.NUMBER);
        });

        it('should set data1 to a Sum and DataType.FORMULA from a string', () => {
            const cell1: ICells = new Cells(2, 2, 5);
            const cell2: ICells = new Cells(3, 2, 6);
            const sum: IFormulas = new Sum([cell1, cell2]);
            const data1: IData = new Data(sum);
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual(new Sum([cell1, cell2]));
            expect(valType).toEqual(DataType.FORMULA);
        });

        it('should set data1 to a Average and DataType.FORMULA from a string', () => {
            const cell1: ICells = new Cells(2, 2, 5);
            const cell2: ICells = new Cells(3, 2, 6);
            const avg: IFormulas = new Average([cell1, cell2]);
            const data1: IData = new Data(avg);
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual(new Average([cell1, cell2]));
            expect(valType).toEqual(DataType.FORMULA);
        });

        it('should set data1 to a number (77) and DataType.NUMBER from a string', () => {
            const data1: IData = new Data("");
            data1.setData(77);
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual(77);
            expect(valType).toEqual(DataType.NUMBER);
        });

        it('should set data1 to a string "test" and DataType.STRING from a number', () => {
            const data1: IData = new Data(7);
            data1.setData("test");
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual("test");
            expect(valType).toEqual(DataType.STRING);
        });

        it('should set data1 to a Sum and DataType.FORMULA from a number', () => {
            const cell1: ICells = new Cells(2, 2, 5);
            const cell2: ICells = new Cells(3, 2, 6);
            const sum: IFormulas = new Sum([cell1, cell2]);
            const data1: IData = new Data(4);

            data1.setData(sum);
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual(new Sum([cell1, cell2]));
            expect(valType).toEqual(DataType.FORMULA);
        });

        it('should set data1 to a Average and DataType.FORMULA from a number', () => {
            const cell1: ICells = new Cells(2, 2, 5);
            const cell2: ICells = new Cells(3, 2, 6);
            const avg: IFormulas = new Average([cell1, cell2]);
            const data1: IData = new Data(5);

            data1.setData(avg);
    
            const val = data1.getValue();
            const valType: DataType = data1.getDataType();
      
            expect(val).toEqual(new Average([cell1, cell2]));
            expect(valType).toEqual(DataType.FORMULA);
        });
    });
});