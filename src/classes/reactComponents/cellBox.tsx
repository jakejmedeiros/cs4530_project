import React, { useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { Parser } from '../utils/parser';
import { Grid } from '../grid';

interface CellProps {
  initCell: ICells;
}

// A react component to visualize a cell class
export const CellBox: React.FC<CellProps> = ({ initCell }) => {
  const cell: ICells = initCell;
  const [cellEditValue, setCellEditValue] = useState((cell.getValue() ?? "").toString());
  const grid = Grid.getInstance();

  cell.setCellState(setCellEditValue);

  // Handles when the user enters an input into a cell and either presses the enter/return key or clicks outside of this cell.
  // Checks if user inputted a formula, reference, or literal value
  const handleEnterPress = (): void => {
    if (cell.getState() !== cellEditValue) {
      grid.detachCellFromObserved(cell);
      cell.setData("");
    }
    cell.setState(cellEditValue);
    Parser.runCellState(cell);
    setCellEditValue(cell.getValue() === "" ? cell.getState().toString() : cell.getValue().toString());
    const x: number = cell.getX();
    const y: number = cell.getY();
    grid.setCellInGrid(x, y, cell);
  };
        
  return (
    <div>
        <textarea className='cell'
          value={cellEditValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); 
              handleEnterPress();
              e.currentTarget.blur();
            }
          }}
          onChange={(e) => {
            setCellEditValue(e.target.value);
          }}
          onFocus={(e) => {
            setCellEditValue((cell.getState() ?? "").toString());
          }}
          onBlur={(e) => {
            handleEnterPress();
          }}
          >
        </textarea>
    </div>
  )
}