import React, { useEffect, useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { Parser } from '../utils/parser';
import { InvalidDataTypeError } from '../errorHandling/InvalidDataTypeError';
import { IFormulas } from 'src/interfaces/formulas.interface';

interface CellProps {
  initCell: ICells;
}

// A react component to visualize a cell class
export const CellBox: React.FC<CellProps> = ({ initCell }) => {
  
  const cell: ICells = initCell;
  const [cellEditValue, setCellEditValue] = useState((cell.getState() ?? "").toString());

  // Checks if the given input is contained within 
  const isStringInput = (input: String): boolean => {
    return ((input.charAt(0) === '"'
    && input.charAt(input.length - 1) === '"')
    || (input.charAt(0) === "'"
    && input.charAt(input.length - 1) === "'"))
  }

  // Checks if the input is a string input or number input
  const typeCheck = (): void => {
    let newInput: number | String = "";
    if (isStringInput(cellEditValue)) {
      const newInputList: String[] = cellEditValue.substring(1, cellEditValue.length-1).split(/"\s*\+\s*"/);
      newInputList.map((str) => str.substring(1, str.length-1));
      newInput = newInputList.join("");
    } else if (parseFloat(cellEditValue)) {
      newInput = parseFloat(cellEditValue);
      setCellEditValue((cell.getValue() ?? "").toString());
    } else {
      const err: String = new InvalidDataTypeError(cell).toText();
    }
    cell.setData(newInput);
  }

  // Handles when the user enters an input into a cell. Checks if user inputted a function or literal value
  const handleEnterPress = (): void => {
    cell.setState(cellEditValue);
    const isCommand: boolean = Parser.referenceParse(cell, cellEditValue);
    if (!isCommand) {
      typeCheck();
    }
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