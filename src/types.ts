export type BlockType = 
  | 'INBOX'
  | 'OUTBOX'
  | 'COPYTO'
  | 'COPYFROM'
  | 'ADD'
  | 'SUB'
  | 'JUMP'
  | 'JUMP_IF_ZERO'
  | 'JUMP_IF_NEGATIVE';

export interface Block {
  id: string;
  type: BlockType;
  position: number;
  targetCell?: number;
  jumpLabel?: string;
}

export interface GameState {
  blocks: Block[];
  inbox: number[];
  outbox: number[];
  memory: Map<number, number>;
  instructionPointer: number;
  currentValue: number | null;
  isRunning: boolean;
  stepCount: number;
  halted: boolean;
}

export interface ExecutionResult {
  success: boolean;
  message: string;
  stepsTaken: number;
  memoryUsed: number;
}

export interface Puzzle {
  id: string;
  name: string;
  description: string;
  initialInbox: number[];
  expectedOutbox: number[];
  memorySize: number;
  minSteps?: number;
  hint?: string;
}