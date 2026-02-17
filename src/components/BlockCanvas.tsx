import React from 'react';
import { Block, BlockType } from '../types';
import './BlockCanvas.css';

interface BlockCanvasProps {
  blocks: Block[];
  instructionPointer: number;
  onBlockRemove: (id: string) => void;
  onBlockMove: (id: string, newPosition: number) => void;
  onBlockConfig: (block: Block) => void;
}

export const BlockCanvas: React.FC<BlockCanvasProps> = ({
  blocks,
  instructionPointer,
  onBlockRemove,
  onBlockMove,
  onBlockConfig,
}) => {
  const getBlockColor = (type: BlockType): string => {
    const colors: Record<BlockType, string> = {
      INBOX: '#4CAF50',
      OUTBOX: '#FF9800',
      COPYTO: '#2196F3',
      COPYFROM: '#2196F3',
      ADD: '#FF5722',
      SUB: '#FF5722',
      JUMP: '#9C27B0',
      JUMP_IF_ZERO: '#9C27B0',
      JUMP_IF_NEGATIVE: '#9C27B0',
    };
    return colors[type];
  };

  const sortedBlocks = [...blocks].sort((a, b) => a.position - b.position);

  return (
    <div className="block-canvas">
      <h3>Program</h3>
      <div className="blocks-list">
        {sortedBlocks.map((block, idx) => (
          <div
            key={block.id}
            className={`block-item ${idx === instructionPointer ? 'active' : ''}`}
          >
            <div
              className="block"
              style={{ backgroundColor: getBlockColor(block.type) }}
            >
              <span className="block-type">{block.type}</span>
              {(block.type === 'COPYTO' || block.type === 'COPYFROM' || block.type === 'ADD' || block.type === 'SUB') && block.targetCell !== undefined && (
                <span className="block-param">[{block.targetCell}]</span>
              )}
              {(block.type === 'JUMP' || block.type === 'JUMP_IF_ZERO' || block.type === 'JUMP_IF_NEGATIVE') && block.jumpLabel && (
                <span className="block-param">→ {block.jumpLabel}</span>
              )}
            </div>
            <div className="block-actions">
              <button onClick={() => onBlockConfig(block)} className="config-btn">⚙️</button>
              <button onClick={() => onBlockRemove(block.id)} className="delete-btn">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};