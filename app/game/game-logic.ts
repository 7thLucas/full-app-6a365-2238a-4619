// ─────────────────────────────────────────────────────────────────────────────
// TacTox — 3D Tic-Tac-Toe Game Logic
// 3×3×3 board — indexed as [layer][row][col] where layer=0 is bottom
// ─────────────────────────────────────────────────────────────────────────────

export type CellValue = "X" | "O" | null;
export type Board = CellValue[][][]; // [layer][row][col]
export type Player = "X" | "O";
export type GameStatus = "playing" | "won" | "draw";

export interface WinResult {
  winner: Player;
  line: [number, number, number][]; // array of [layer, row, col]
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winResult: WinResult | null;
  scores: { X: number; O: number; draws: number };
}

// All 49 winning lines in a 3×3×3 board
export function getAllWinLines(): [number, number, number][][] {
  const lines: [number, number, number][][] = [];

  // ── Within each layer (9 standard 2D lines × 3 layers = 27) ────────────
  for (let l = 0; l < 3; l++) {
    // rows
    for (let r = 0; r < 3; r++) {
      lines.push([[l, r, 0], [l, r, 1], [l, r, 2]]);
    }
    // columns
    for (let c = 0; c < 3; c++) {
      lines.push([[l, 0, c], [l, 1, c], [l, 2, c]]);
    }
    // diagonals
    lines.push([[l, 0, 0], [l, 1, 1], [l, 2, 2]]);
    lines.push([[l, 0, 2], [l, 1, 1], [l, 2, 0]]);
  }

  // ── Pillars (vertical through layers) — 9 ───────────────────────────────
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      lines.push([[0, r, c], [1, r, c], [2, r, c]]);
    }
  }

  // ── Layer-spanning diagonals ─────────────────────────────────────────────
  // Face diagonals through all 3 layers (row fixed, col varies across layers)
  for (let r = 0; r < 3; r++) {
    lines.push([[0, r, 0], [1, r, 1], [2, r, 2]]);
    lines.push([[0, r, 2], [1, r, 1], [2, r, 0]]);
  }
  // (col fixed, row varies across layers)
  for (let c = 0; c < 3; c++) {
    lines.push([[0, 0, c], [1, 1, c], [2, 2, c]]);
    lines.push([[0, 2, c], [1, 1, c], [2, 0, c]]);
  }

  // ── Space diagonals (4 main body diagonals) ──────────────────────────────
  lines.push([[0, 0, 0], [1, 1, 1], [2, 2, 2]]);
  lines.push([[0, 0, 2], [1, 1, 1], [2, 2, 0]]);
  lines.push([[0, 2, 0], [1, 1, 1], [2, 0, 2]]);
  lines.push([[0, 2, 2], [1, 1, 1], [2, 0, 0]]);

  return lines;
}

const WIN_LINES = getAllWinLines();

export function createEmptyBoard(): Board {
  return Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => Array(3).fill(null) as CellValue[])
  );
}

export function checkWinner(board: Board): WinResult | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const va = board[a[0]][a[1]][a[2]];
    const vb = board[b[0]][b[1]][b[2]];
    const vc = board[c[0]][c[1]][c[2]];
    if (va && va === vb && vb === vc) {
      return { winner: va as Player, line };
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  for (let l = 0; l < 3; l++)
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        if (board[l][r][c] === null) return false;
  return true;
}

export function makeMove(
  board: Board,
  layer: number,
  row: number,
  col: number,
  player: Player
): Board {
  const next = board.map((lay) => lay.map((r) => [...r])) as Board;
  next[layer][row][col] = player;
  return next;
}

// ─────────────────────────────────────────────────────────────────────────────
// AI — minimax with alpha-beta pruning (medium/hard) or random (easy)
// ─────────────────────────────────────────────────────────────────────────────

function scoreBoard(board: Board, depth: number): number {
  const result = checkWinner(board);
  if (result?.winner === "O") return 10 - depth;
  if (result?.winner === "X") return depth - 10;
  return 0;
}

function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  maxDepth: number
): number {
  const score = scoreBoard(board, depth);
  if (score !== 0 || isBoardFull(board) || depth >= maxDepth) return score;

  const player: Player = isMaximizing ? "O" : "X";
  let best = isMaximizing ? -Infinity : Infinity;

  outer: for (let l = 0; l < 3; l++) {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[l][r][c] !== null) continue;
        const next = makeMove(board, l, r, c, player);
        const val = minimax(next, depth + 1, !isMaximizing, alpha, beta, maxDepth);
        if (isMaximizing) {
          best = Math.max(best, val);
          alpha = Math.max(alpha, best);
        } else {
          best = Math.min(best, val);
          beta = Math.min(beta, best);
        }
        if (beta <= alpha) break outer;
      }
    }
  }
  return best;
}

function getEmptyCells(board: Board): [number, number, number][] {
  const cells: [number, number, number][] = [];
  for (let l = 0; l < 3; l++)
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        if (board[l][r][c] === null) cells.push([l, r, c]);
  return cells;
}

export function getAIMove(
  board: Board,
  difficulty: "easy" | "medium" | "hard"
): [number, number, number] | null {
  const empty = getEmptyCells(board);
  if (empty.length === 0) return null;

  if (difficulty === "easy") {
    // pure random
    return empty[Math.floor(Math.random() * empty.length)];
  }

  const maxDepth = difficulty === "hard" ? 4 : 2;

  // For first move, just pick center or random to speed things up
  if (empty.length === 27) {
    return [1, 1, 1]; // center of the 3D board
  }

  let bestVal = -Infinity;
  let bestMove: [number, number, number] = empty[0];

  for (const [l, r, c] of empty) {
    const next = makeMove(board, l, r, c, "O");
    const val = minimax(next, 0, false, -Infinity, Infinity, maxDepth);
    if (val > bestVal) {
      bestVal = val;
      bestMove = [l, r, c];
    }
  }

  return bestMove;
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial state factory
// ─────────────────────────────────────────────────────────────────────────────
export function createInitialState(
  scores: GameState["scores"] = { X: 0, O: 0, draws: 0 }
): GameState {
  return {
    board: createEmptyBoard(),
    currentPlayer: "X",
    status: "playing",
    winResult: null,
    scores,
  };
}
