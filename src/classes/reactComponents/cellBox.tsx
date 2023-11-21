import React, { useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { CellObserver } from '../cellObserver';
import { ColumnNameTranslate } from '../utils/columnNameTranslate';
import { Parser } from '../utils/parser';

interface cellProps {
  cell: ICells;
}

export const CellBox: React.FC<cellProps> = (props: cellProps) => {
  
  const cell: ICells = props.cell;
  const [cellEditValue, setCellEditValue] = useState((cell.getValue() ?? "").toString());

  const handleEnterPress = (): void => {
    cell.setData(cellEditValue);
    const newVal = Parser.referenceParse(cell);
    setCellEditValue(newVal.toString());
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