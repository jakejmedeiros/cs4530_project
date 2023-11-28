import React, { useEffect } from 'react';
import './spreadsheet.css';
import { CellBox } from './classes/reactComponents/cellBox';
import { Grid } from './classes/grid';
import { ColumnNameTranslate } from './classes/utils/columnNameTranslate';
import { ICells } from './interfaces/cells.interface';

// Initial setup of the UI for the spreadsheet
export default function Spreadsheet() {
  const numOfRows = 8;
  const numOfColumns = 10;
  const grid: Grid = Grid.getInstance();
  grid.initialize(numOfRows,numOfColumns);
  let gridCells: Array<Array<ICells>> = grid.getCells();

  return (
    <div className='spreadsheet'>
      {gridCells.map((row, rowIdx) => (
        <div key={rowIdx}>
          {ColumnNameTranslate.columnToLetter(rowIdx + 1)}
          {row.map((cell, cellIdx) => (
            <div key={cellIdx}>
              <CellBox initCell={cell}></CellBox>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}