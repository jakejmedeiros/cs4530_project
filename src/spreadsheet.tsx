import React from 'react';
import './spreadsheet.css';
import { ICells } from './interfaces/cells.interface';
import { CellBox } from './classes/reactComponents/cellBox';
import { Grid } from './classes/grid';
import { Cells } from './classes/cellsImpl';

export default function Spreadsheet() {

  const numOfRows = 8;
  const numOfColumns = 10;
  const grid: Grid = Grid.getInstance();
  grid.initialize(numOfRows,numOfColumns);
  const gridCells: Array<Array<ICells>> = grid.getCells();

  const columnToLetter = (column: number): String => {
    let result = '';
    const base = 'A'.charCodeAt(0) - 1;

    while (column > 0) {
      const remainder = (column) % 26;
      result = String.fromCharCode(base + remainder) + result;
      column = Math.floor((column) / 26);
    }

    return result;
  }

  return (
    <div className='spreadsheet'>
      {gridCells.map((row, rowIdx) => (
        <div key={rowIdx}>
          {columnToLetter(rowIdx + 1)}
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