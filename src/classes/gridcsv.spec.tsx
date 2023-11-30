import { Cells } from './cellsImpl';
import { Grid } from './grid';

describe('Grid CSV Tests', () => {
  let grid: Grid;

  beforeEach(() => {
    // Initialize a grid for each test
    grid = Grid.getInstance();
    // Mocking the necessary parts of the document object
    /*
    document.createElement = jest.fn();
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    */
  });

  it('should save and load grid data to/from CSV', () => {
    // Initialize a simple grid
    const cells: Cells[][] = [
      [new Cells('A1', 0, 0), new Cells('B1', 0, 1)],
      [new Cells(1, 1, 0), new Cells(2, 1, 1)],
    ];
    grid.initialize(2, 2);
    cells[0][0].setState("A1");
    cells[0][1].setState("B1");
    cells[1][0].setState("1");
    cells[1][1].setState("2");


    // Save the grid to CSV
    /*
    grid.saveToCSV();

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(document.body.removeChild).toHaveBeenCalled();

    */
    // Mock React setGrid function
    const mockSetGrid = jest.fn();

    // Load data from CSV
    const csvData = 'A1,B1\n1,2';
    grid.loadFromCSVString(csvData, mockSetGrid);

    // Expect setGrid to be called with the loaded grid data
    expect(mockSetGrid).toHaveBeenCalledWith(grid.getCells());
    //not testing for deep equality but rather just values being transferred properly
    expect(grid.getCells()[0][0].getValue()).toEqual(cells[0][0].getValue());
    expect(grid.getCells()[0][1].getValue()).toEqual(cells[0][1].getValue());
    expect(grid.getCells()[1][0].getValue()).toEqual(cells[1][0].getValue());
    expect(grid.getCells()[1][1].getValue()).toEqual(cells[1][1].getValue());
  });

});