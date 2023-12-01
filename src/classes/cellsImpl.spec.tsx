import React from 'react';
import { ICells } from 'src/interfaces/cells.interface';
import { Cells } from './cellsImpl';
import { IObserver } from 'src/interfaces/observer.interface';
import { CellObserver } from './cellObserver';
import { DataType } from 'src/enums/datatype';
import { Grid } from './grid';
import { Sum } from './formulas/sum';
import { IFormulas } from 'src/interfaces/formulas.interface';
import { Average } from './formulas/average';

// Tests for methods in the Cells class
describe('Cells', () => {

  let cellModel: ICells;
  let grid: Grid;

  beforeEach((): void => {
    cellModel = new Cells("", 1, 2);

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

  describe('getObservers()', (): void => {
    it('This should return an empty list because it is a brand new cell', () => {
      const cell1: ICells = new Cells("test", 2, 5);

      expect(cell1.getObservers()).toEqual([]);
    });
  });

  describe('attach()', (): void => {
    it('cell2 should contain an observer for cell1', () => {
      const cell1: ICells = new Cells("test", 2, 5);
      const cell2: ICells = new Cells("pop", 5, 6);

      const obs: IObserver = new CellObserver(cell1);
      cell2.attach(obs);

      expect(cell2.getObservers().length).toEqual(1);
    });

    it("cell2 should not add an observer for cell1 a second time. cell2's observer list should only have one observer", () => {
      const cell1: ICells = new Cells("test", 2, 5);
      const cell2: ICells = new Cells("pop", 5, 6);

      const obs: IObserver = new CellObserver(cell1);
      const obs2: IObserver = new CellObserver(cell1);
      cell2.attach(obs);
      cell2.attach(obs2);

      expect(cell2.getObservers().length).toEqual(1);
    });
  });

  describe('detach()', (): void => {
    it('cell2 should have nothing happen to its list of observers because it is initially empty', () => {
      const cell1: ICells = new Cells("test", 2, 5);
      const cell2: ICells = new Cells("pop", 5, 6);
      
      const obs: IObserver = new CellObserver(cell1);
      cell2.detach(obs);

      expect(cell2.getObservers().length).toEqual(0);
    });

    it("cell2's observer list should be empty after calling detach", () => {
      const cell1: Cells = new Cells("test", 2, 5);
      const cell2: ICells = new Cells("pop", 5, 6);

      const obs: IObserver = new CellObserver(cell1);
      cell2.attach(obs);

      cell2.detach(obs);

      expect(cell2.getObservers().length).toEqual(0);
    });

    it("cell2's observer list should be one less after calling detach", () => {
      const cell1: Cells = new Cells("test", 2, 5);
      const cell2: ICells = new Cells("pop", 5, 6);
      const cell3: ICells = new Cells("foo", 3, 1);

      const obs: IObserver = new CellObserver(cell1);
      const obs3: IObserver = new CellObserver(cell3);
      cell2.attach(obs);
      cell2.attach(obs3);

      cell2.detach(obs);

      expect(cell2.getObservers().length).toEqual(1);
    });
  });

  describe('getValue()', (): void => {
    it("cell1's value should return 'test'", () => {
      const cell1: ICells = new Cells("test", 2, 5);

      expect(cell1.getValue()).toEqual('test');
    });

    it("cell1's value should return 34", () => {
      const cell1: ICells = new Cells(34, 2, 5);

      expect(cell1.getValue()).toEqual(34);
    });

    it("cell1's value should return 34", () => {
      const cell1: ICells = new Cells(34, 2, 5);

      expect(cell1.getValue()).toEqual(34);
    });

    it("cell1's value should return a Sum class", () => {
      const cell1: ICells = new Cells(0, 2, 5);

      const cell2: ICells = new Cells(2, 2, 5);
      const cell3: ICells = new Cells(3, 2, 6);
      const cell4: ICells = new Cells(5, 2, 7);
      const cell5: ICells = new Cells(10, 3, 5);
      const cell6: ICells = new Cells(6, 3, 6);
      const cell7: ICells = new Cells(-4, 3, 7);

      const cellRange: ICells[] = [cell2, cell3, cell4, cell5, cell6, cell7];

      const sum: IFormulas = new Sum(cellRange);

      cell1.setData(sum);

      expect(cell1.getValue() instanceof Sum).toEqual(true);
    });

    it("cell1's value should return an Average class", () => {
      const cell1: ICells = new Cells(0, 2, 5);

      const cell2: ICells = new Cells(2, 2, 5);
      const cell3: ICells = new Cells(3, 2, 6);
      const cell4: ICells = new Cells(5, 2, 7);
      const cell5: ICells = new Cells(10, 3, 5);
      const cell6: ICells = new Cells(6, 3, 6);
      const cell7: ICells = new Cells(-4, 3, 7);

      const cellRange: ICells[] = [cell2, cell3, cell4, cell5, cell6, cell7];

      const avg: IFormulas = new Average(cellRange);

      cell1.setData(avg);

      expect(cell1.getValue() instanceof Average).toEqual(true);
    });
  });
});