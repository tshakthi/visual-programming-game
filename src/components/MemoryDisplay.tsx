import React from 'react';
import './MemoryDisplay.css';

interface MemoryDisplayProps {
  memory: Map<number, number>;
  memorySize: number;
  onCellChange: (cell: number, value: number) => void;
}

export const MemoryDisplay: React.FC<MemoryDisplayProps> = ({
  memory,
  memorySize,
  onCellChange,
}) => {
  const cells = Array.from({ length: memorySize }, (_, i) => i);

  return (
    <div className="memory-display">
      <h3>Memory</h3>
      <div className="memory-grid">
        {cells.map(cell => (
          <div key={cell} className="memory-cell">
            <div className="cell-index">[{cell}]</div>
            <div className="cell-value">{memory.get(cell) ?? 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
};