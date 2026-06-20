import type { GameState } from "~/game/game-logic";

interface StatusBarProps {
  status: GameState["status"];
  currentPlayer: GameState["currentPlayer"];
  winResult: GameState["winResult"];
  playerXColor: string;
  playerOColor: string;
  onRestart: () => void;
}

export function StatusBar({
  status,
  currentPlayer,
  winResult,
  playerXColor,
  playerOColor,
  onRestart,
}: StatusBarProps) {
  let message: string;
  let subMessage: string = "";
  let accentColor = "var(--foreground)";

  if (status === "won" && winResult) {
    if (winResult.winner === "X") {
      message = "You win!";
      subMessage = "Excellent spatial thinking!";
      accentColor = playerXColor;
    } else {
      message = "AI wins!";
      subMessage = "The machine outplayed you — try again!";
      accentColor = playerOColor;
    }
  } else if (status === "draw") {
    message = "It's a draw!";
    subMessage = "A perfectly balanced game.";
    accentColor = "var(--muted-foreground)";
  } else {
    // Playing state
    if (currentPlayer === "O") {
      message = "AI is thinking…";
      accentColor = playerOColor;
    } else {
      message = "Your move";
      accentColor = playerXColor;
    }
  }

  const isGameOver = status !== "playing";

  return (
    <div
      className="w-full rounded-xl p-4 text-center transition-all duration-300"
      style={{
        background: isGameOver
          ? `${accentColor}12`
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${isGameOver ? accentColor + "33" : "rgba(255,255,255,0.08)"}`,
        boxShadow: isGameOver ? `0 0 20px ${accentColor}22` : undefined,
      }}
    >
      <p
        className="text-lg font-bold tracking-wide transition-colors duration-300"
        style={{ fontFamily: "var(--heading-font)", color: accentColor }}
      >
        {message}
      </p>

      {subMessage && (
        <p className="text-sm text-muted-foreground mt-0.5">{subMessage}</p>
      )}

      {isGameOver && (
        <button
          onClick={onRestart}
          className="mt-3 px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: accentColor,
            color: "#fff",
            boxShadow: `0 4px 16px ${accentColor}55`,
            fontFamily: "var(--heading-font)",
          }}
        >
          Play Again
        </button>
      )}
    </div>
  );
}
