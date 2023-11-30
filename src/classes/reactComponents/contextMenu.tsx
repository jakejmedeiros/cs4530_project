interface ContextMenuProps {
    x: number;
    y: number;
    onClearRow: () => void;
    onClearColumn: () => void;
    onSortRowAsc: () => void;
    onSortRowDsc: () => void;
    onSortColAsc: () => void;
    onSortColDsc: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClearRow, onClearColumn, onSortRowAsc, onSortRowDsc, onSortColAsc, onSortColDsc }) => {
    const menuStyle: React.CSSProperties = {
        position: 'absolute',
        top: y,
        left: x,
        zIndex: 1000,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
      };
  
    return (
      <ul className="context-menu" style={menuStyle}>
        <li onClick={onClearRow}>Clear Row</li>
        <li onClick={onClearColumn}>Clear Column</li>
        <li onClick={onSortRowAsc}>Sort Row Asc.</li>
        <li onClick={onSortRowDsc}>Sort Row Desc.</li>
        <li onClick={onSortColAsc}>Sort Col Asc.</li>
        <li onClick={onSortColDsc}>Sort Col Desc.</li>
      </ul>
    );
  };
