import React, { useEffect, useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { Parser } from '../utils/parser';
import { InvalidDataTypeError } from '../errorHandling/InvalidDataTypeError';

interface cellProps {
  cell: ICells;
}

// A react component to visualize a cell class
export const CellBox: React.FC<cellProps> = (props: cellProps) => {
  
  const cell = props.cell;
  const [cellEditValue, setCellEditValue] = useState<string>((cell.getValue() ?? "").toString());

  // Checks if the given input is contained within 
  const isStringInput = (input: String): boolean => {
    return ((input.charAt(0) === '"'
    && input.charAt(input.length - 1) === '"')
    || (input.charAt(0) === "'"
    && input.charAt(input.length - 1) === "'"))
  }

  useEffect(() => {
    setCellEditValue((cell.getValue() ?? "").toString());
  }, [cell]);

  // Checks if the input is a string input or number input
  const typeCheck = (): void => {
    if (isStringInput(cellEditValue)) {
      const newInputList: String[] = cellEditValue.substring(1, cellEditValue.length-1).split(/"\s*\+\s*"/);
      newInputList.map((str) => str.substring(1, str.length-1));
      const newInput = newInputList.join("");
      cell.setState(cellEditValue);
      setCellEditValue(newInput);
      cell.setData(cellEditValue);
    } else if (parseFloat(cellEditValue)) {
      setCellEditValue((cell.getValue() ?? "").toString());
    } else {
      const err: String = new InvalidDataTypeError(cell).toText();
    }
    cell.setData(cellEditValue);
  }

  // Handles when the user enters an input into a cell. Checks if user inputted a function or literal value
  const handleEnterPress = (): void => {
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
            }
          }}
          onChange={(e) => {
            setCellEditValue(e.target.value);
          }}
          onBlur={(e) => {
            handleEnterPress();
          }}
          >
        </textarea>
    </div>
  )
}