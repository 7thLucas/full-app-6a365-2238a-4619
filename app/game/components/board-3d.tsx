import { Layer } from "./layer";
import type { Board, WinResult } from "~/game/game-logic";

interface Board3DProps {
  board: Board;
  winResult: WinResult | null;
  onCellClick: (layer: number, row: number, col: number) => void;
  isDisabled: boolean;
  playerXColor: string;
  playerOColor: string;
}

const LAYER_LABELS = ["Top Layer", "Middle Layer", "Bottom Layer"];

export function Board3D({
  board,
  winResult,
  onCellClick,
  isDisabled,
  playerXColor,
  playerOColor,
}: Board3DProps) {
  // Build a set of winning cell keys for quick lookup
  const winningCells = new Set<string>(
    winResult?.line.map(([l, r, c]) => `${l},${r},${c}`) ?? []
  );

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xs mx-auto">
      {/* Render layers top→bottom visually (layer 2 = top, 0 = bottom) */}
      {[2, 1, 0].map((layerIdx) => (
        <div key={layerIdx} className="w-full">
          <Layer
            layerIndex={layerIdx}
            cells={board[layerIdx]}
            winningCells={winningCells}
            onCellClick={onCellClick}
            isDisabled={isDisabled}
            playerXColor={playerXColor}
            playerOColor={playerOColor}
            label={LAYER_LABELS[2 - layerIdx]}
          />
          {/* Connector between layers */}
          {layerIdx > 0 && (
            <div className="flex justify-center mt-2">
              <div className="flex gap-4 opacity-20">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-px h-5"
                    style={{ background: "var(--primary)" }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
