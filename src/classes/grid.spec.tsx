import { Grid } from './grid';
import { Cells } from './cellsImpl';

describe('Grid Tests', () => {
    let grid: Grid;

    beforeEach(() => {
        grid = Grid.getInstance();
        grid.initialize(3, 3);
    });

    it('should add a new row to the grid', () => {
        grid.addRow();
        expect(grid.getCells().length).toBe(4);
    });

    it('should remove a row from the grid', () => {
        grid.removeRow(0);
        expect(grid.getCells().length).toBe(2);
    });

    it('should add a new column to the grid', () => {
        grid.addColumn();
        expect(grid.getCells()[0].length).toBe(4);
    });

    it('should remove a column from the grid', () => {
        grid.removeColumn();
        expect(grid.getCells()[0].length).toBe(2);
    });

    it('should clear a specific row in the grid', () => {
        grid.clearRow(0);
        expect(grid.getCells()[0].every(cell => cell.getState() === '')).toBe(true);
    });

    it('should clear a specific column in the grid', () => {
        grid.clearColumn(0);
        expect(grid.getCells().every(row => row[0].getState() === '')).toBe(true);
    });

    it('should correctly sort a specific row in ascending order', () => {
        grid.setCellInGrid(0, 0, new Cells(2, 0, 0)); 
        grid.setCellInGrid(0, 1, new Cells(1, 0, 1));
        grid.getSingleCell(0, 0).setState('2');
        grid.getSingleCell(0, 1).setState('1');
        grid.sortRowAsc(0);
        expect(grid.getCells()[0][0].getValue()).toBe(1);
        expect(grid.getCells()[0][1].getValue()).toBe(2);
    });

    it('should sort a specific row in descending order', () => {
        grid.setCellInGrid(0, 0, new Cells(1, 0, 0));
        grid.setCellInGrid(0, 1, new Cells(2, 0, 1));
        grid.getSingleCell(0, 0).setState('1');
        grid.getSingleCell(0, 1).setState('2');
        grid.sortRowDesc(0);
        expect(grid.getCells()[0][0].getValue()).toBe(2);
        expect(grid.getCells()[0][1].getValue()).toBe(1);
    });

    it('should sort a specific column in ascending order', () => {
        grid.setCellInGrid(0, 0, new Cells(2, 0, 0));
        grid.setCellInGrid(1, 0, new Cells(1, 1, 0));
        grid.getSingleCell(0, 0).setState('2');
        grid.getSingleCell(1, 0).setState('1');
        grid.sortColumnAsc(0);
        expect(grid.getCells()[0][0].getValue()).toBe(1);
        expect(grid.getCells()[1][0].getValue()).toBe(2);
    });

    it('should sort a specific column in descending order', () => {
        grid.setCellInGrid(0, 0, new Cells(1, 0, 0));
        grid.setCellInGrid(1, 0, new Cells(2, 1, 0));
        grid.getSingleCell(0, 0).setState('1');
        grid.getSingleCell(1, 0).setState('2');
        grid.sortColumnDesc(0);
        expect(grid.getCells()[0][0].getValue()).toBe(2);
        expect(grid.getCells()[1][0].getValue()).toBe(1);
    });
    
    it('should select a cell within the grid', () => {
        grid.selectCell(1, 1);
        const selectedCell = grid.getSingleCell(1, 1);
        expect(selectedCell).toBe(grid.getCells()[1][1]);
    });

    it('should throw an error when selecting a cell out of bounds', () => {
        expect(() => grid.selectCell(-1, -1)).toThrow();
    });
});
