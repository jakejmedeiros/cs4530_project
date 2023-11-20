import React, { useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { CellObserver } from '../cellObserver';

interface cellProps {
  cell: ICells;
}

export const CellBox: React.FC<cellProps> = (props: cellProps) => {
  
  const cell: ICells = props.cell;
  const [cellEditValue, setCellEditValue] = useState((cell.getValue() ?? "").toString());

  const columnName = (column: String): number => {
    const base = 'A'.charCodeAt(0) - 1;
    let result = 0;

    for (let i = 0; i < column.length; i++) {
      const charCode = column.charCodeAt(i) - base;
      result = result * 26 + charCode;
    }

    return result;
  }

  const handleEnterPress = (): void => {
    cell.setData(cellEditValue);
    const nearley = require("nearley");
    const grammar = require("src/grammars/reference.js");
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    try {
      parser.feed(cell.getValue());
      const column: number = columnName(parser.results[0].column) - 1;
      const row: number = parser.results[0].row - 1;
      cell.cellReference(column, row);
      setCellEditValue((cell.getValue() ?? "").toString());
    } catch {
    }
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
          }}>
        </textarea>
    </div>
  )
}