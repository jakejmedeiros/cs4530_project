import React, { useState } from 'react'
import { ICells } from '../../interfaces/cells.interface';
import './cellBox.style.css'

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