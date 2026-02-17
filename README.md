# 🧩 Visual Programming Game

A visual programming learning game built with React + TypeScript that teaches fundamental programming concepts through block-based instruction design.

## Features

### 1. **Visual Block Editor**
- Drag-and-drop block-based programming
- 9 different instruction types
- Color-coded blocks for easy identification
- Configure block parameters (memory cells, jump labels)

### 2. **Step-by-Step Debugger**
- Execute programs step-by-step
- Watch values change in real-time
- Current instruction highlighting
- Full program execution mode

### 3. **Memory System**
- Visual memory cells (RAM)
- Store and retrieve values
- Track memory usage
- See all values at a glance

### 4. **4 Sample Puzzles**
- **Hello World**: Basic input/output
- **Add One**: Simple arithmetic
- **Sum All**: Loop construction with JUMP blocks
- **Negate**: Working with negative numbers

## Block Types

| Block | Description | Color |
|-------|-------------|-------|
| INBOX | Read from input | 🟢 Green |
| OUTBOX | Write to output | 🟠 Orange |
| COPYTO | Store in memory | 🔵 Blue |
| COPYFROM | Load from memory | 🔵 Blue |
| ADD | Add to accumulator | 🔴 Red |
| SUB | Subtract from accumulator | 🔴 Red |
| JUMP | Unconditional jump | 🟣 Purple |
| JUMP_IF_ZERO | Jump if zero | 🟣 Purple |
| JUMP_IF_NEGATIVE | Jump if negative | 🟣 Purple |

## Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tshakthi/visual-programming-game.git
cd visual-programming-game

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at `http://localhost:3000`

### Building

```bash
npm run build
```

Builds the app for production in the `build` folder.

## How to Play

1. **Select a Puzzle** - Choose from the dropdown in the header
2. **Build Your Program** - Click block buttons to add instructions
3. **Configure Blocks** - Click ⚙️ to set memory cells or jump labels
4. **Execute** - Use Step button to debug or Run button for full execution
5. **Check Output** - Compare your output with expected output
6. **Optimize** - Try to solve with fewer steps and less memory

## Architecture

```
src/
├── types.ts              # TypeScript interfaces
├── puzzles.ts            # Puzzle definitions
├── executor.ts           # Execution engine (CPU simulator)
├── App.tsx               # Main component
├── index.tsx             # Entry point
├── App.css               # Main styles
└── components/
    ├── BlockPalette.tsx  # Available blocks panel
    ├── BlockCanvas.tsx   # Program editor
    ├── ExecutionPanel.tsx# Execution controls & I/O
    └── MemoryDisplay.tsx # Memory visualization
```

## Key Components

### ProgramExecutor
Simulates a simple CPU with:
- Instruction pointer
- Memory cells (RAM)
- Accumulator (current value)
- Input/output queues
- Step-by-step execution

### Game State
Tracks:
- Current blocks in program
- Input and output values
- Memory state
- Execution progress

## Learning Outcomes

Players learn:
- **Algorithm Design** - How to solve problems step-by-step
- **Memory Management** - Using variables and storage
- **Control Flow** - Loops and conditionals using jumps
- **Code Optimization** - Minimizing steps and memory
- **Debugging** - Finding and fixing logic errors
- **CPU Concepts** - How computers execute instructions

## Future Enhancements

- [ ] Drag-and-drop block reordering
- [ ] More puzzle levels
- [ ] Custom puzzle creator
- [ ] Code export (JavaScript output)
- [ ] Multiplayer leaderboards
- [ ] Advanced blocks (functions, arrays)
- [ ] Visual flowchart generation
- [ ] Performance analytics

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **No external dependencies** - Minimal, fast, focused

## License

MIT

## Author

Created by [@tshakthi](https://github.com/tshakthi)

---

**Have fun learning programming! 🚀**