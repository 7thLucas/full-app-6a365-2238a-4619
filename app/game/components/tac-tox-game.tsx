import { useConfigurables } from "~/modules/configurables";
import { useGame } from "~/game/use-game";
import { Board3D } from "./board-3d";
import { Scoreboard } from "./scoreboard";
import { StatusBar } from "./status-bar";

export function TacToxGame() {
  const { config, loading } = useConfigurables();

  const difficulty = (config.aiDifficulty ?? "medium") as "easy" | "medium" | "hard";
  const playerXColor = config.playerXColor ?? "#818cf8";
  const playerOColor = config.playerOColor ?? "#fb7185";
  const gameTitle = config.gameTitle ?? "TacTox";
  const gameTagline = config.gameTagline ?? "3D Tic-Tac-Toe";
  const showScoreboard = config.showScoreboard ?? true;

  const { state, placeMove, restart, resetScores } = useGame(difficulty);

  const isDisabled =
    state.status !== "playing" || state.currentPlayer !== "X";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `#6366f1`, borderTopColor: "transparent" }}
          />
          <span className="text-muted-foreground text-sm">Loading game…</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <header
        className="w-full px-4 py-4 flex items-center justify-between"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              boxShadow: "0 0 12px #6366f155",
            }}
          >
            <span className="text-white font-bold text-sm" style={{ fontFamily: "var(--heading-font)" }}>
              T
            </span>
          </div>
          <div>
            <h1
              className="text-lg font-bold leading-none text-foreground"
              style={{ fontFamily: "var(--heading-font)" }}
            >
              {gameTitle}
            </h1>
            <p className="text-xs text-muted-foreground leading-none mt-0.5">
              {gameTagline}
            </p>
          </div>
        </div>

        {/* Difficulty badge */}
        <div
          className="px-3 py-1 rounded-full text-xs font-medium capitalize"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "var(--muted-foreground)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {difficulty}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-6 gap-5 max-w-sm mx-auto w-full">
        {/* Status / turn indicator */}
        <StatusBar
          status={state.status}
          currentPlayer={state.currentPlayer}
          winResult={state.winResult}
          playerXColor={playerXColor}
          playerOColor={playerOColor}
          onRestart={restart}
        />

        {/* 3D Board */}
        <Board3D
          board={state.board}
          winResult={state.winResult}
          onCellClick={placeMove}
          isDisabled={isDisabled}
          playerXColor={playerXColor}
          playerOColor={playerOColor}
        />

        {/* Scoreboard */}
        {showScoreboard && (
          <Scoreboard
            scores={state.scores}
            currentPlayer={state.currentPlayer}
            status={state.status}
            playerXColor={playerXColor}
            playerOColor={playerOColor}
            onResetScores={resetScores}
          />
        )}

        {/* How to play */}
        <div
          className="w-full rounded-xl p-4 text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-xs text-muted-foreground leading-relaxed">
            Win by placing 3 in a row across any layer, pillar, or 3D diagonal.
            <br />
            You play as{" "}
            <span className="font-semibold" style={{ color: playerXColor }}>
              X
            </span>
            {" "}— the AI plays as{" "}
            <span className="font-semibold" style={{ color: playerOColor }}>
              O
            </span>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
