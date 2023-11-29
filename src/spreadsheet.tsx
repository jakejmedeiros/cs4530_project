import React from 'react';
import './spreadsheet.css';
import { Grid } from './classes/grid';
import { ICells } from './interfaces/cells.interface';
import { GridComponent } from './classes/reactComponents/gridComponent';

// Initial setup of the UI for the spreadsheet
export default function Spreadsheet() {
  const numOfRows = 8;
  const numOfColumns = 10;
  const grid: Grid = Grid.getInstance();
  grid.initialize(numOfRows,numOfColumns);
  const gridCells: Array<Array<ICells>> = grid.getCells();

  return (
    <div>
      <GridComponent cellMatrix={gridCells} />
    </div>
  )
}