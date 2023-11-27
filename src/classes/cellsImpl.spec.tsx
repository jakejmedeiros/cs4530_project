import React from 'react';
import { ICells } from 'src/interfaces/cells.interface';
import { Cells } from './cellsImpl';
import { IObserver } from 'src/interfaces/observer.interface';
import { CellObserver } from './cellObserver';
import { DataType } from 'src/enums/datatype';
import { Grid } from './grid';

// Tests for methods in the Cells class
describe('Cells', () => {

  let cellModel: ICells;
  let cellModelWithString: ICells;
  let cellModelWithNumber: ICells;
  let grid: Grid;

  beforeEach((): void => {
    cellModel = new Cells("", 1, 2);
    cellModelWithString = new Cells("this is a string", 3, 4);
    cellModelWithNumber = new Cells(42, 5, 6);

    grid = Grid.getInstance();
    grid.initialize(10,10);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('setData()', (): void => {
    it('cell should contain the string "test" as data', () => {
      cellModel.setData("test");

      expect(cellModel.getValue()).toEqual("test");
    });

    it('cell should contain an empty string "" as data', () => {
      cellModel.setData("");

      expect(cellModel.getValue()).toEqual("");
    });

    it('cell should contain the number 99 as data', () => {
      cellModel.setData(99);

      expect(cellModel.getValue()).toEqual(99);
    });

    it('cell should contain the number -54 as data', () => {
      cellModel.setData(-54);

      expect(cellModel.getValue()).toEqual(-54);
    });

    it('cell should contain the number 9.23 as data', () => {
      cellModel.setData(9.23);

      expect(cellModel.getValue()).toEqual(9.23);
    });

    it('cell should show its data type as our String datatype when data is set to "test"', () => {
      cellModel.setData("test");

      expect(cellModel.getDataType()).toEqual(DataType.STRING);
    });

    it('cell should show its data type as our Number datatype when data is set to 23', () => {
      cellModel.setData(23);

      expect(cellModel.getDataType()).toEqual(DataType.NUMBER);
    });

    it('cell should show its data type as our Number datatype when data is set to -2', () => {
      cellModel.setData(-2);

      expect(cellModel.getDataType()).toEqual(DataType.NUMBER);
    });

    it('cell should show its data type as our Number datatype when data is set to 6.33', () => {
      cellModel.setData(6.33);

      expect(cellModel.getDataType()).toEqual(DataType.NUMBER);
    });

    it('cell should show its data type as our Number datatype when data is set to 4+3', () => {
      cellModel.setData(4+3);

      expect(cellModel.getDataType()).toEqual(DataType.NUMBER);
    });
  });

  describe('cellReference()', (): void => {
    it('cell2 should contain the same string as cell1 after calling cellReference', () => {
      const x: number = 5;
      const y: number = 4;

      const cell1: ICells = grid.getSingleCell(x,y);
      cell1.setData("test string");
      const cell2: ICells = new Cells("", x, y);

      cell2.cellReference(x,y);

      expect(cell2.getValue()).toEqual("test string");
    });

    it('cell2 should contain the same number as cell1 after calling cellReference', () => {
      const x: number = 5;
      const y: number = 4;

      const cell1: ICells = grid.getSingleCell(x,y);
      cell1.setData(99);
      const cell2: ICells = new Cells("", x, y);

      cell2.cellReference(x,y);

      expect(cell2.getValue()).toEqual(99);
    });
  });
});