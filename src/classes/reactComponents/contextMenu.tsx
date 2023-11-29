interface ContextMenuProps {
    x: number;
    y: number;
    onClearRow: () => void;
    onClearColumn: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClearRow, onClearColumn }) => {
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
      </ul>
    );
  };
