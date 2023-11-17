import React from 'react';
import './spreadsheet.css';
import { ICells } from './interfaces/cells.interface';
import { CellBox } from './classes/reactComponents/cellBox';
import { Grid } from './classes/grid';

export default function Spreadsheet() {

  const grid: Grid = Grid.getInstance();
  grid.initialize(15,10);
  const gridCells: Array<Array<ICells>> = grid.getCells();

  return (
    <div className='spreadsheet'>
      {gridCells.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((cell, cellIdx) => (
            <div key={cellIdx}>
              <CellBox cell={cell}></CellBox>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}