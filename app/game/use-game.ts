import { useCallback, useEffect, useRef, useState } from "react";
import {
  checkWinner,
  createInitialState,
  getAIMove,
  isBoardFull,
  makeMove,
  type GameState,
} from "./game-logic";

export function useGame(difficulty: "easy" | "medium" | "hard" = "medium") {
  const [state, setState] = useState<GameState>(() => createInitialState());
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const placeMove = useCallback(
    (layer: number, row: number, col: number) => {
      setState((prev) => {
        if (prev.status !== "playing") return prev;
        if (prev.currentPlayer !== "X") return prev;
        if (prev.board[layer][row][col] !== null) return prev;

        const next = makeMove(prev.board, layer, row, col, "X");
        const winResult = checkWinner(next);

        if (winResult) {
          return {
            ...prev,
            board: next,
            status: "won",
            winResult,
            currentPlayer: "O",
            scores: { ...prev.scores, X: prev.scores.X + 1 },
          };
        }

        if (isBoardFull(next)) {
          return {
            ...prev,
            board: next,
            status: "draw",
            winResult: null,
            currentPlayer: "O",
            scores: { ...prev.scores, draws: prev.scores.draws + 1 },
          };
        }

        return { ...prev, board: next, currentPlayer: "O" };
      });
    },
    []
  );

  // AI move effect
  useEffect(() => {
    if (state.status !== "playing" || state.currentPlayer !== "O") return;

    const delay = 500 + Math.random() * 300;
    aiTimerRef.current = setTimeout(() => {
      setState((prev) => {
        if (prev.status !== "playing" || prev.currentPlayer !== "O") return prev;

        const move = getAIMove(prev.board, difficulty);
        if (!move) return prev;
        const [l, r, c] = move;

        const next = makeMove(prev.board, l, r, c, "O");
        const winResult = checkWinner(next);

        if (winResult) {
          return {
            ...prev,
            board: next,
            status: "won",
            winResult,
            currentPlayer: "X",
            scores: { ...prev.scores, O: prev.scores.O + 1 },
          };
        }

        if (isBoardFull(next)) {
          return {
            ...prev,
            board: next,
            status: "draw",
            winResult: null,
            currentPlayer: "X",
            scores: { ...prev.scores, draws: prev.scores.draws + 1 },
          };
        }

        return { ...prev, board: next, currentPlayer: "X" };
      });
    }, delay);

    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, [state.status, state.currentPlayer, difficulty]);

  const restart = useCallback(() => {
    setState((prev) => createInitialState(prev.scores));
  }, []);

  const resetScores = useCallback(() => {
    setState(() => createInitialState());
  }, []);

  return { state, placeMove, restart, resetScores };
}
