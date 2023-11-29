interface ContextMenuProps {
    x: number;
    y: number;
    onClearRow: () => void;
    onClearColumn: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClearRow, onClearColumn }) => {
    const menuStyle = {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      zIndex: 1000,
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    };
  
    return (
      <ul className="context-menu">
        <li onClick={onClearRow}>Clear Row</li>
        <li onClick={onClearColumn}>Clear Column</li>
      </ul>
    );
  };
