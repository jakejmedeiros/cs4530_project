import React, { useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'
import { CellObserver } from '../cellObserver';

interface cellProps {
  cell: ICells;
}

export const CellBox: React.FC<cellProps> = (props: cellProps) => {
  const [cellEditValue, setCellEditValue] = useState('');
  
  const cell: ICells = props.cell;

  const handleEnterPress = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      cell.setData(cellEditValue);
      const nearley = require("nearley");
      const grammar = require("src/grammars/reference.js");
      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
      try {
        parser.feed(cell.getValue());
        console.log(parser.results[0]);
        const o = new CellObserver(cell);
        cell.notify();
      } catch {
        console.log(JSON.stringify(parser.results));
      }
    }
  };

  return (
    <div>
        <textarea className='cell'
          defaultValue={(cell.getValue() ?? "").toString()}
          onKeyDown={handleEnterPress}
          onChange={(e) => {
          setCellEditValue(e.target.value);
        }}></textarea>
    </div>
  )
}