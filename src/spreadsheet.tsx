import React, { useState, useEffect } from 'react';
import './spreadsheet.css';
import { CellBox } from './classes/reactComponents/cellBox';
import { Grid } from './classes/grid';
import { ICells } from './interfaces/cells.interface';
import { ContextMenu } from './classes/reactComponents/contextMenu'

interface ContextMenuState {
  x: number;
  y: number;
  rowIndex: number;
  columnIndex: number;
}

export default function Spreadsheet() {
  const grid = Grid.getInstance();
  const [gridCells, setGridCells] = useState<ICells[][]>([]);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>, rowIndex: number, columnIndex: number): void => {
    event.preventDefault();
    setContextMenu({
      x: event.pageX,
      y: event.pageY,
      rowIndex,
      columnIndex,
    });
  };

  useEffect(() => {
    grid.initialize(15, 15);
    setGridCells(grid.getCells());
  }, []);

  const handleAddRow = () => {
    grid.addRow();
    setGridCells([...grid.getCells()]); 
  };

  const handleRemoveRow = (rowIndex: number) => {
    grid.removeRow(rowIndex);
    setGridCells([...grid.getCells()]); 
  };

  const handleAddColumn = () => {
    grid.addColumn();
    setGridCells([...grid.getCells()]); 
  };
  
  const handleRemoveColumn = () => {
    grid.removeColumn();
    setGridCells([...grid.getCells()]); 
  };

  const handleClearColumn = (targetColumn: number) => {
    grid.clearColumn(targetColumn);
    setGridCells([...grid.getCells()]);
  }

  const handleClearRow = (targetRow: number) => { 
    grid.clearRow(targetRow);
    setGridCells([...grid.getCells()])
  }

  return (
    <div>
      <header className='app-header'>
        <h1>CS4530 Spreadsheet Application</h1>
    </header>
      <div className='top-bar'>
      {contextMenu && (
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        onClearRow={() => handleClearRow(contextMenu.rowIndex)}
        onClearColumn={() => handleClearColumn(contextMenu.columnIndex)}
      />
    )}
        <div className='button-group'>
          <button onClick={handleAddRow} className="add-row-button">Add Row</button>
          <button onClick={() => handleRemoveRow(gridCells.length - 1)} className="remove-row-button">
          Delete Row
          </button>
          <button onClick={handleAddColumn} className="add-column-button">Add Column</button>
          <button onClick={() => handleRemoveColumn()} className="remove-column-button">
          Remove Column
          </button>
        </div>
      </div>
      <div className='spreadsheet'></div>
      {gridCells.map((row, rowIdx) => (
        <div key={rowIdx} className='row'>
          <div className='row-header'>
            {rowIdx + 1}
          </div>
          {row.map((cell, cellIdx) => (
            <div key={`${rowIdx}-${cellIdx}`} className='cell-container' onContextMenu={(e) => handleContextMenu(e, rowIdx, cellIdx)}>
              <CellBox initCell={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};