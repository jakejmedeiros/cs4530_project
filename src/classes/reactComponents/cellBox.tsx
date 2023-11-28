import React, { useEffect, useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { Parser } from '../utils/parser';
import { InvalidDataTypeError } from '../errorHandling/InvalidDataTypeError';
import { IFormulas } from 'src/interfaces/formulas.interface';
import { DataType } from 'src/enums/datatype';
import { IErrorAlert } from 'src/interfaces/erroralert.interface';

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
  const typeCheck = (input: any): number | String | IErrorAlert => {
    let newInput: number | String | IErrorAlert = "";
    if (isStringInput(input)) {
      newInput = input.substring(1, input.length-1);
      // return input.toString();
      // const newInputList: String[] = cellEditValue.substring(1, cellEditValue.length-1).split(/"\s*\+\s*"/);
      // newInputList.map((str) => str.substring(1, str.length-1));
      // newInput = newInputList.join("");
    } else if (parseFloat(input)) {
      newInput = parseFloat(input);
      // return newInput;
      // setCellEditValue((cell.getValue() ?? "").toString());
    } else {
      const err: IErrorAlert = new InvalidDataTypeError(cell);
      newInput = err;
    }
    return newInput;
    // cell.setData(newInput);
  }

  const commandCheck = (command: String): String => {
    //commandReferences is the list of cells to attach an observer to
    const commandReferences: ICells[] = Parser.referenceParse(cell, command);
    if (!commandReferences) {
      const input = typeCheck(command);
    }
    return
    // setCellEditValue((cell.getValue() ?? "").toString());
  }

  // Handles when the user enters an input into a cell. Checks if user inputted a formula, reference, or literal value
  const handleEnterPress = (): void => {
    cell.setState(cellEditValue);
    const commandList: String[] = cellEditValue.split(/(\+|-|\*|\/)/);
    const parsedList: String[] = [];
    const typeTracker: String = "";
    commandList.forEach(command => {
      let commItem: String = "";
      if (command === '+' || command === '-' || command === '*' || command === '/') {
        commItem = command;
      } else {
        commItem = commandCheck(command);
        if (typeTracker !== "" && typeof commItem !== typeTracker) {
          const err = new InvalidDataTypeError(cell);
          return err.toText();
        } else {
          return commItem.toString();
        }
      }
      parsedList.push(commItem);
    });
    console.log(parsedList);
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