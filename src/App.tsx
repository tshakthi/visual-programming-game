import React, { useState, useCallback } from 'react';
import { Block, BlockType, Puzzle } from './types';
import { BlockPalette } from './components/BlockPalette';
import { BlockCanvas } from './components/BlockCanvas';
import { ExecutionPanel } from './components/ExecutionPanel';
import { MemoryDisplay } from './components/MemoryDisplay';
import { ProgramExecutor } from './executor';
import { puzzles, getPuzzleById } from './puzzles';
import './App.css';

function App() {
  const [currentPuzzleId, setCurrentPuzzleId] = useState('hello-world');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [executor, setExecutor] = useState<ProgramExecutor | null>(null);
  const [gameState, setGameState] = useState(executor?.getState() ?? null);
  const [configBlock, setConfigBlock] = useState<Block | null>(null);
  const [targetCell, setTargetCell] = useState<number>(0);
  const [jumpLabel, setJumpLabel] = useState<string>('');

  const currentPuzzle = getPuzzleById(currentPuzzleId);

  const initializePuzzle = useCallback((puzzleId: string) => {
    const puzzle = getPuzzleById(puzzleId);
    if (!puzzle) return;

    const newExecutor = new ProgramExecutor(puzzle);
    setExecutor(newExecutor);
    setBlocks([]);
    setGameState(newExecutor.getState());
    setCurrentPuzzleId(puzzleId);
  }, []);

  const handleBlockAdd = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}-${Math.random()}`,
      type,
      position: blocks.length,
    };
    setBlocks([...blocks, newBlock]);
  }, [blocks]);

  const handleBlockRemove = useCallback((id: string) => {
    const filtered = blocks.filter(b => b.id !== id);
    setBlocks(filtered.map((b, idx) => ({ ...b, position: idx })));
  }, [blocks]);

  const handleBlockConfig = useCallback((block: Block) => {
    setConfigBlock(block);
    setTargetCell(block.targetCell ?? 0);
    setJumpLabel(block.jumpLabel ?? '');
  }, []);

  const handleSaveConfig = useCallback(() => {
    if (!configBlock) return;
    
    const updated = blocks.map(b =>
      b.id === configBlock.id
        ? {
            ...b,
            targetCell: (b.type === 'COPYTO' || b.type === 'COPYFROM' || b.type === 'ADD' || b.type === 'SUB') ? targetCell : undefined,
            jumpLabel: (b.type === 'JUMP' || b.type === 'JUMP_IF_ZERO' || b.type === 'JUMP_IF_NEGATIVE') ? jumpLabel : undefined,
          }
        : b
    );
    setBlocks(updated);
    setConfigBlock(null);
  }, [blocks, configBlock, targetCell, jumpLabel]);

  const handleStep = useCallback(() => {
    if (!executor || !currentPuzzle) return;
    
    executor.setState(blocks);
    executor.step();
    setGameState({ ...executor.getState() });
  }, [executor, blocks, currentPuzzle]);

  const handleRun = useCallback(() => {
    if (!executor || !currentPuzzle) return;
    
    executor.setState(blocks);
    executor.run();
    setGameState({ ...executor.getState() });
  }, [executor, blocks, currentPuzzle]);

  const handleReset = useCallback(() => {
    if (!executor || !currentPuzzle) return;
    
    executor.reset(currentPuzzle);
    setGameState({ ...executor.getState() });
  }, [executor, currentPuzzle]);

  React.useEffect(() => {
    initializePuzzle('hello-world');
  }, [initializePuzzle]);

  if (!currentPuzzle || !gameState) return <div>Loading...</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>🧩 Visual Programming Game</h1>
        <div className="puzzle-selector">
          <label>Puzzle:</label>
          <select value={currentPuzzleId} onChange={(e) => initializePuzzle(e.target.value)}>
            {puzzles.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="main">
        <div className="left-panel">
          <div className="puzzle-info">
            <h2>{currentPuzzle.name}</h2>
            <p>{currentPuzzle.description}</p>
            {currentPuzzle.hint && <p className="hint">💡 {currentPuzzle.hint}</p>}
          </div>
          <BlockPalette onBlockAdd={handleBlockAdd} />
          <MemoryDisplay 
            memory={gameState.memory} 
            memorySize={currentPuzzle.memorySize}
            onCellChange={() => {}}
          />
        </div>

        <div className="center-panel">
          <BlockCanvas
            blocks={blocks}
            instructionPointer={gameState.instructionPointer}
            onBlockRemove={handleBlockRemove}
            onBlockConfig={handleBlockConfig}
            onBlockMove={() => {}}
          />
        </div>

        <div className="right-panel">
          <ExecutionPanel
            state={gameState}
            expectedOutput={currentPuzzle.expectedOutbox}
            onStep={handleStep}
            onRun={handleRun}
            onReset={handleReset}
            isHalted={executor?.isHalted() ?? false}
          />
        </div>
      </main>

      {configBlock && (
        <div className="modal-overlay" onClick={() => setConfigBlock(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Configure Block</h3>
            {(configBlock.type === 'COPYTO' || configBlock.type === 'COPYFROM' || configBlock.type === 'ADD' || configBlock.type === 'SUB') && (
              <div className="form-group">
                <label>Memory Cell:</label>
                <input
                  type="number"
                  min="0"
                  max={currentPuzzle.memorySize - 1}
                  value={targetCell}
                  onChange={(e) => setTargetCell(parseInt(e.target.value))}
                />
              </div>
            )}
            {(configBlock.type === 'JUMP' || configBlock.type === 'JUMP_IF_ZERO' || configBlock.type === 'JUMP_IF_NEGATIVE') && (
              <div className="form-group">
                <label>Label:</label>
                <input
                  type="text"
                  value={jumpLabel}
                  onChange={(e) => setJumpLabel(e.target.value)}
                  placeholder="e.g., loop_start"
                />
              </div>
            )}
            <div className="modal-actions">
              <button onClick={handleSaveConfig} className="btn btn-primary">Save</button>
              <button onClick={() => setConfigBlock(null)} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;