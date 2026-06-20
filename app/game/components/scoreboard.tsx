import type { GameState } from "~/game/game-logic";

interface ScoreboardProps {
  scores: GameState["scores"];
  currentPlayer: GameState["currentPlayer"];
  status: GameState["status"];
  playerXColor: string;
  playerOColor: string;
  onResetScores: () => void;
}

export function Scoreboard({
  scores,
  currentPlayer,
  status,
  playerXColor,
  playerOColor,
  onResetScores,
}: ScoreboardProps) {
  const isXTurn = currentPlayer === "X" && status === "playing";
  const isOTurn = currentPlayer === "O" && status === "playing";

  return (
    <div
      className="w-full rounded-xl p-4 backdrop-blur-sm"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        {/* Player X */}
        <ScoreCard
          label="You (X)"
          score={scores.X}
          color={playerXColor}
          isActive={isXTurn}
        />

        {/* Draws */}
        <div className="flex flex-col items-center gap-1 px-2">
          <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
            Draws
          </span>
          <span className="text-2xl font-bold text-muted-foreground tabular-nums">
            {scores.draws}
          </span>
        </div>

        {/* Player O (AI) */}
        <ScoreCard
          label="AI (O)"
          score={scores.O}
          color={playerOColor}
          isActive={isOTurn}
        />
      </div>

      {/* Reset scores */}
      <button
        onClick={onResetScores}
        className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-1 rounded"
      >
        Reset scores
      </button>
    </div>
  );
}

function ScoreCard({
  label,
  score,
  color,
  isActive,
}: {
  label: string;
  score: number;
  color: string;
  isActive: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200"
      style={
        isActive
          ? {
              background: `${color}15`,
              boxShadow: `0 0 12px ${color}33`,
              border: `1px solid ${color}44`,
            }
          : {
              border: "1px solid transparent",
            }
      }
    >
      <span
        className="text-xs font-semibold tracking-wide uppercase"
        style={{ color }}
      >
        {label}
      </span>
      <span
        className="text-3xl font-bold tabular-nums"
        style={{ color: isActive ? color : undefined }}
      >
        {score}
      </span>
      {isActive && (
        <span className="text-[10px] text-muted-foreground animate-pulse">
          your turn
        </span>
      )}
      {!isActive && label.startsWith("AI") && (
        <span className="text-[10px] text-muted-foreground">
          {isActive ? "thinking..." : ""}
        </span>
      )}
    </div>
  );
}
