import { type CellValue } from "~/game/game-logic";

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  isDisabled: boolean;
  playerXColor: string;
  playerOColor: string;
}

export function Cell({
  value,
  onClick,
  isWinning,
  isDisabled,
  playerXColor,
  playerOColor,
}: CellProps) {
  const isEmpty = value === null;
  const canClick = isEmpty && !isDisabled;

  return (
    <button
      onClick={canClick ? onClick : undefined}
      disabled={!canClick}
      className={[
        "relative w-full aspect-square rounded-lg border transition-all duration-150",
        "flex items-center justify-center",
        isWinning
          ? "border-transparent scale-105"
          : "border-white/10",
        canClick
          ? "hover:border-white/30 hover:scale-[1.03] cursor-pointer bg-white/5 hover:bg-white/10"
          : "cursor-default",
        !canClick && !isWinning ? "bg-white/[0.03]" : "",
        isWinning ? "animate-pulse" : "",
      ].join(" ")}
      style={
        isWinning
          ? {
              backgroundColor:
                value === "X"
                  ? `${playerXColor}22`
                  : `${playerOColor}22`,
              borderColor:
                value === "X" ? playerXColor : playerOColor,
              boxShadow:
                value === "X"
                  ? `0 0 16px ${playerXColor}66`
                  : `0 0 16px ${playerOColor}66`,
            }
          : undefined
      }
      aria-label={`Cell ${value ?? "empty"}`}
    >
      {value === "X" && (
        <XMark color={playerXColor} glow={isWinning} />
      )}
      {value === "O" && (
        <OMark color={playerOColor} glow={isWinning} />
      )}
    </button>
  );
}

function XMark({ color, glow }: { color: string; glow: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[55%] h-[55%]"
      style={{
        filter: glow ? `drop-shadow(0 0 6px ${color})` : undefined,
      }}
    >
      <line
        x1="4" y1="4" x2="20" y2="20"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="20" y1="4" x2="4" y2="20"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OMark({ color, glow }: { color: string; glow: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[55%] h-[55%]"
      style={{
        filter: glow ? `drop-shadow(0 0 6px ${color})` : undefined,
      }}
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke={color}
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
