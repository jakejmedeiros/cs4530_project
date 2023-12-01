import React from 'react';
import { ICells } from 'src/interfaces/cells.interface';
import { Cells } from './cellsImpl';
import { IObserver } from 'src/interfaces/observer.interface';
import { CellObserver } from './cellObserver';
import { Grid } from './grid';

describe('CellObserver', () => {

  let grid: Grid;

  beforeEach((): void => {
    grid = Grid.getInstance();
    grid.initialize(10,10);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  describe('update()', () => {
    it('calling update() should update the observingCell with the value of watchedCell (43)', () => {
      const watchedCell: ICells = grid.getSingleCell(0, 0);
      watchedCell.setData(43);
      const observingCell: ICells = grid.getSingleCell(2, 3);
      const obs: IObserver = new CellObserver(observingCell);
      watchedCell.attach(obs);
      observingCell.setState("ref(a1)");

      obs.update();

      expect(observingCell.getValue()).toEqual(43);
    });

    it('calling update() should update the observingCell with the value of watchedCell ("test")', () => {
      const watchedCell: ICells = grid.getSingleCell(0, 0);
      watchedCell.setData("test");
      const observingCell: ICells = grid.getSingleCell(2, 3);
      const obs: IObserver = new CellObserver(observingCell);
      watchedCell.attach(obs);
      observingCell.setState("ref(a1)");

      obs.update();

      expect(observingCell.getValue()).toEqual("test");
    });
  })
});