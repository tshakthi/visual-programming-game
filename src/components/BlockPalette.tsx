import React from 'react';
import { BlockType } from '../types';
import './BlockPalette.css';

interface BlockPaletteProps {
  onBlockAdd: (type: BlockType) => void;
}

const AVAILABLE_BLOCKS: { type: BlockType; label: string; description: string }[] = [
  { type: 'INBOX', label: 'INBOX', description: 'Read from input' },
  { type: 'OUTBOX', label: 'OUTBOX', description: 'Write to output' },
  { type: 'COPYTO', label: 'COPY TO', description: 'Store in memory' },
  { type: 'COPYFROM', label: 'COPY FROM', description: 'Load from memory' },
  { type: 'ADD', label: 'ADD', description: 'Add value' },
  { type: 'SUB', label: 'SUB', description: 'Subtract value' },
  { type: 'JUMP', label: 'JUMP', description: 'Unconditional jump' },
  { type: 'JUMP_IF_ZERO', label: 'JUMP IF ZERO', description: 'Jump if zero' },
  { type: 'JUMP_IF_NEGATIVE', label: 'JUMP IF NEG', description: 'Jump if negative' },
];

export const BlockPalette: React.FC<BlockPaletteProps> = ({ onBlockAdd }) => {
  return (
    <div className="block-palette">
      <h3>Blocks</h3>
      <div className="blocks-grid">
        {AVAILABLE_BLOCKS.map(block => (
          <button
            key={block.type}
            className="block-btn"
            onClick={() => onBlockAdd(block.type)}
            title={block.description}
          >
            {block.label}
          </button>
        ))}
      </div>
    </div>
  );
};