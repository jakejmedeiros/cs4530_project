import React, { useEffect, useState } from 'react'
import { ICells } from 'src/interfaces/cells.interface';
import { ColumnNameTranslate } from '../utils/columnNameTranslate';
import { CellBox } from './cellBox';
import { Grid } from '../grid';

interface GridProps {
    cellMatrix: Array<Array<ICells>>;
  }

  // A react component to render the grid of cells
  export const GridComponent: React.FC<GridProps> = ({ cellMatrix }) => {
    const gridCells: Array<Array<ICells>> = cellMatrix;
    const grid = Grid.getInstance();

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
