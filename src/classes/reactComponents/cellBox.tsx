import React, { useRef, useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { Parser } from '../utils/parser';

interface CellProps {
  initCell: ICells;
}

// A react component to visualize a cell class
export const CellBox: React.FC<CellProps> = ({ initCell }) => {
  const [cell, setCell] = useState(initCell);
  const [cellEditValue, setCellEditValue] = useState((cell.getValue() ?? "").toString());

  // Handles when the user enters an input into a cell and either presses the enter/return key or clicks outside of this cell.
  // Checks if user inputted a formula, reference, or literal value
  const handleEnterPress = (): void => {
    cell.setState(cellEditValue);
    cell.setCellState(setCellEditValue)
    Parser.runCellState(cell);
    setCellEditValue((cell.getValue() ?? "").toString());
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
          onClick={(e) => {
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