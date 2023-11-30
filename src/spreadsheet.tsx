import React, { useState, useEffect, ChangeEvent } from 'react';
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

  const downloadCsv = () => {
    grid.saveToCSV();
  }

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

  const handleLoadCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
    grid.initialize(15, 15);
    setGridCells(grid.getCells());
    const reader = new FileReader();
    const file = event.target.files?.[0];
    (async () => {
      let newGrid: ICells[][] = [];

      if (file) {

        const loadFile = () => {
          reader.onload = function (e) {
            const csvString = e.target?.result as string;
            grid.loadFromCSVString(csvString, setGridCells);
            newGrid = grid.getCells();
          };
        }
        await loadFile();
        await setGridCells(newGrid);
        reader.readAsText(file);
      }
    })();
  };

  const handleSortRowAsc = (targetRow: number) => {
     grid.sortRowAsc(targetRow);
     setGridCells([...grid.getCells()])
  }

  const handleSortRowDesc = (targetRow: number) => {
    grid.sortRowDesc(targetRow);
    setGridCells([...grid.getCells()]);
  }

  const handleSortColAsc = (targetCol: number) => {
    grid.sortColumnAsc(targetCol);
    setGridCells([...grid.getCells()])
  }

  const handleSortColDesc = (targetCol: number) => {
    grid.sortColumnDesc(targetCol);
    setGridCells([...grid.getCells()])
  }

  const toColumnName = (columnNumber: number): string => {
    let columnName = '';
    let dividend = columnNumber + 1;
    
    while (dividend > 0) {
    let modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
    }
    return columnName;
    };
    
    const getColumnHeaders = () => {
    const cells = grid.getCells();
    if (cells.length === 0 || cells[0].length === 0) {
    return []; // Return an empty array if there are no rows or columns
    }
    
    const columns = cells[0].length; // Number of elements in the first row
    return Array.from({ length: columns }, (_, index) => toColumnName(index));
    };

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
        onSortRowAsc={() => handleSortRowAsc(contextMenu.rowIndex)}
        onSortRowDsc={() => handleSortRowDesc(contextMenu.rowIndex)}
        onSortColAsc={() => handleSortColAsc(contextMenu.columnIndex)}
        onSortColDsc={() => handleSortColDesc(contextMenu.columnIndex)}
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
          <button onClick={() => downloadCsv()} className="download-csv-button">
          Download CSV
          </button>
          <input type='file' accept='.csv' className="upload-csv-button" onChange={handleLoadCsv} />
        </div>
      </div>
     {/* Render Column Headers */}
     <div className='row'>
        <div className='row-header'></div> {/* Empty cell for row header corner */}
        {getColumnHeaders().map((header, index) => (
          <div key={index} className='header-cell'>{header}</div>
        ))}
      </div>
      {/* Render Rows and Cells */}
      {gridCells.map((row, rowIdx) => (
        <div key={rowIdx} className='row'>
          <div className='row-header'>{rowIdx + 1}</div> {/* Row Number */}
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