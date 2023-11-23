import React from 'react';
import { ICells } from 'src/interfaces/cells.interface';
import { Cells } from './cellsImpl';
import { IObserver } from 'src/interfaces/observer.interface';
import { CellObserver } from './cellObserver';
import { DataType } from 'src/enums/datatype';

// Tests for methods in the Cells class
describe('Cells', () => {

  let cellModel: ICells;

  beforeEach((): void => {
    cellModel = new Cells("", 1, 2);
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
});