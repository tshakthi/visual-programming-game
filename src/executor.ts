import { Block, GameState, BlockType, Puzzle } from './types';

export class ProgramExecutor {
  private state: GameState;
  private originalInbox: number[];
  private maxSteps: number = 10000;

  constructor(puzzle: Puzzle) {
    this.originalInbox = [...puzzle.initialInbox];
    this.state = {
      blocks: [],
      inbox: [...puzzle.initialInbox],
      outbox: [],
      memory: new Map(),
      instructionPointer: 0,
      currentValue: null,
      isRunning: false,
      stepCount: 0,
      halted: false
    };
  }

  setState(blocks: Block[]): void {
    this.state.blocks = blocks.sort((a, b) => a.position - b.position);
  }

  step(): boolean {
    if (this.state.halted || this.state.stepCount >= this.maxSteps) {
      this.state.halted = true;
      return false;
    }

    if (this.state.instructionPointer >= this.state.blocks.length) {
      this.state.halted = true;
      return false;
    }

    const block = this.state.blocks[this.state.instructionPointer];
    
    try {
      this.executeBlock(block);
      this.state.stepCount++;
      return true;
    } catch (error) {
      this.state.halted = true;
      throw error;
    }
  }

  private executeBlock(block: Block): void {
    switch (block.type) {
      case 'INBOX':
        if (this.state.inbox.length === 0) {
          this.state.halted = true;
          break;
        }
        this.state.currentValue = this.state.inbox.shift()!;
        this.state.instructionPointer++;
        break;

      case 'OUTBOX':
        if (this.state.currentValue !== null) {
          this.state.outbox.push(this.state.currentValue);
          this.state.currentValue = null;
        }
        this.state.instructionPointer++;
        break;

      case 'COPYTO':
        if (block.targetCell !== undefined && this.state.currentValue !== null) {
          this.state.memory.set(block.targetCell, this.state.currentValue);
        }
        this.state.instructionPointer++;
        break;

      case 'COPYFROM':
        if (block.targetCell !== undefined) {
          const value = this.state.memory.get(block.targetCell) ?? 0;
          this.state.currentValue = value;
        }
        this.state.instructionPointer++;
        break;

      case 'ADD':
        if (block.targetCell !== undefined && this.state.currentValue !== null) {
          const value = this.state.memory.get(block.targetCell) ?? 0;
          this.state.currentValue += value;
        }
        this.state.instructionPointer++;
        break;

      case 'SUB':
        if (block.targetCell !== undefined && this.state.currentValue !== null) {
          const value = this.state.memory.get(block.targetCell) ?? 0;
          this.state.currentValue -= value;
        }
        this.state.instructionPointer++;
        break;

      case 'JUMP':
        const jumpTarget = this.findBlockByLabel(block.jumpLabel);
        if (jumpTarget !== -1) {
          this.state.instructionPointer = jumpTarget;
        } else {
          this.state.instructionPointer++;
        }
        break;

      case 'JUMP_IF_ZERO':
        if (this.state.currentValue === 0) {
          const jumpTarget = this.findBlockByLabel(block.jumpLabel);
          if (jumpTarget !== -1) {
            this.state.instructionPointer = jumpTarget;
          } else {
            this.state.instructionPointer++;
          }
        } else {
          this.state.instructionPointer++;
        }
        break;

      case 'JUMP_IF_NEGATIVE':
        if (this.state.currentValue !== null && this.state.currentValue < 0) {
          const jumpTarget = this.findBlockByLabel(block.jumpLabel);
          if (jumpTarget !== -1) {
            this.state.instructionPointer = jumpTarget;
          } else {
            this.state.instructionPointer++;
          }
        } else {
          this.state.instructionPointer++;
        }
        break;
    }
  }

  private findBlockByLabel(label?: string): number {
    if (!label) return -1;
    return this.state.blocks.findIndex(b => b.jumpLabel === label);
  }

  run(): boolean {
    this.state.isRunning = true;
    while (!this.state.halted && this.state.stepCount < this.maxSteps) {
      if (!this.step()) break;
    }
    this.state.isRunning = false;
    return !this.state.halted;
  }

  reset(puzzle: Puzzle): void {
    this.state = {
      blocks: this.state.blocks,
      inbox: [...puzzle.initialInbox],
      outbox: [],
      memory: new Map(),
      instructionPointer: 0,
      currentValue: null,
      isRunning: false,
      stepCount: 0,
      halted: false
    };
  }

  getState(): GameState {
    return { ...this.state };
  }

  isHalted(): boolean {
    return this.state.halted;
  }

  getOutput(): number[] {
    return [...this.state.outbox];
  }
}