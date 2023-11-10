import React, { useState } from 'react';
import './spreadsheet.css';
import { ICells } from './interfaces/cells.interface';
import { Cells } from './classes/cellsImpl';

export default function Spreadsheet() {

  const [cellEditValue, setCellEditValue] = useState('');

  const testCell: ICells = new Cells(null, 0, 0);

  const handleEnterPress = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      testCell.setData(cellEditValue);
    }
  };

  return (
    <div className='spreadsheet'>
      <textarea className='cell' 
      defaultValue={(testCell.getValue() ?? "").toString()}
      onKeyDown={handleEnterPress}
      onChange={(e) => {
        setCellEditValue(e.target.value);
      }}></textarea>
    </div>
  )
}