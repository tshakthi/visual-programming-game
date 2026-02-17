import React from 'react';
import { GameState } from '../types';
import './ExecutionPanel.css';

interface ExecutionPanelProps {
  state: GameState;
  expectedOutput: number[];
  onStep: () => void;
  onRun: () => void;
  onReset: () => void;
  isHalted: boolean;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({
  state,
  expectedOutput,
  onStep,
  onRun,
  onReset,
  isHalted,
}) => {
  const isCorrect = 
    JSON.stringify(state.outbox) === JSON.stringify(expectedOutput);

  return (
    <div className="execution-panel">
      <div className="controls">
        <button onClick={onStep} disabled={isHalted} className="btn btn-primary">
          Step
        </button>
        <button onClick={onRun} disabled={isHalted} className="btn btn-success">
          Run
        </button>
        <button onClick={onReset} className="btn btn-secondary">
          Reset
        </button>
      </div>

      <div className="execution-info">
        <div className="info-item">
          <label>Steps:</label>
          <span>{state.stepCount}</span>
        </div>
        <div className="info-item">
          <label>Current Value:</label>
          <span className="value">{state.currentValue ?? '—'}</span>
        </div>
        <div className="info-item">
          <label>Status:</label>
          <span className={`status ${isHalted ? 'halted' : 'running'}`}>{isHalted ? 'Halted' : 'Running'}</span>
        </div>
      </div>

      <div className="io-panel">
        <div className="io-section">
          <h4>Input (Inbox)</h4>
          <div className="io-list">
            {state.inbox.map((val, idx) => (
              <div key={idx} className="io-item">{val}</div>
            ))}
          </div>
        </div>

        <div className="io-section">
          <h4>Output (Outbox)</h4>
          <div className={`io-list ${isCorrect ? 'correct' : ''}`}>{state.outbox.map((val, idx) => (
              <div key={idx} className="io-item">{val}</div>
            ))}</div>
        </div>

        <div className="io-section">
          <h4>Expected Output</h4>
          <div className="io-list">
            {expectedOutput.map((val, idx) => (
              <div key={idx} className="io-item">{val}</div>
            ))}
          </div>
        </div>
      </div>

      {isCorrect && state.outbox.length > 0 && (
        <div className="success-message">✅ Correct output!</div>
      )}
    </div>
  );
};