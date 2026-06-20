import { Cell } from "./cell";
import type { CellValue } from "~/game/game-logic";

interface LayerProps {
  layerIndex: number;
  cells: CellValue[][];
  winningCells: Set<string>;
  onCellClick: (layer: number, row: number, col: number) => void;
  isDisabled: boolean;
  playerXColor: string;
  playerOColor: string;
  label: string;
}

export function Layer({
  layerIndex,
  cells,
  winningCells,
  onCellClick,
  isDisabled,
  playerXColor,
  playerOColor,
  label,
}: LayerProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Layer label */}
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full opacity-60"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
          {label}
        </span>
      </div>

      {/* 3×3 grid */}
      <div
        className="grid gap-1.5 p-3 rounded-xl backdrop-blur-sm"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          width: "100%",
        }}
      >
        {cells.map((row, r) =>
          row.map((cell, c) => {
            const key = `${layerIndex},${r},${c}`;
            return (
              <Cell
                key={key}
                value={cell}
                onClick={() => onCellClick(layerIndex, r, c)}
                isWinning={winningCells.has(key)}
                isDisabled={isDisabled}
                playerXColor={playerXColor}
                playerOColor={playerOColor}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
