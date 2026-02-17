import { Puzzle } from './types';

export const puzzles: Puzzle[] = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Copy each item from INBOX to OUTBOX',
    initialInbox: [1, 2, 3],
    expectedOutbox: [1, 2, 3],
    memorySize: 5,
    minSteps: 9,
    hint: 'Use INBOX and OUTBOX blocks in sequence'
  },
  {
    id: 'add-one',
    name: 'Add One',
    description: 'Read a number, add 1, and output it',
    initialInbox: [5],
    expectedOutbox: [6],
    memorySize: 5,
    minSteps: 12,
    hint: 'Use ADD block after reading input'
  },
  {
    id: 'sum-all',
    name: 'Sum All',
    description: 'Read all numbers and output their sum',
    initialInbox: [1, 2, 3, 4, 5],
    expectedOutbox: [15],
    memorySize: 5,
    minSteps: 30,
    hint: 'You\'ll need a loop using JUMP blocks'
  },
  {
    id: 'negate',
    name: 'Negate',
    description: 'Read a number and output its negative',
    initialInbox: [7],
    expectedOutbox: [-7],
    memorySize: 5,
    minSteps: 15,
    hint: 'SUB from zero'
  },
];

export const getPuzzleById = (id: string): Puzzle | undefined => {
  return puzzles.find(p => p.id === id);
};