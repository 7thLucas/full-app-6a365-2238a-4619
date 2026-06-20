# TacTox

## What It Is
A solo browser-based 3D tic-tac-toe game on a 3×3×3 grid. The player competes against a bot AI; winning requires three in a row along any axis — horizontal, vertical, pillar, or space diagonal. Sessions run 1–3 minutes. No backend, no accounts.

## Users
Solo casual players seeking low-friction, short-burst entertainment. No multiplayer, no social layer — pure single-player focus.

## Problem
Classic tic-tac-toe is trivially solvable and loses novelty within seconds. Players want something familiar but with enough strategic depth to sustain genuine replay interest without heavy time commitment.

## Solution
A full 3D 3×3×3 board against a minimax AI opponent (alpha-beta pruning). Same simple rules — win three in a row — but across 49 possible winning lines. Three difficulty tiers (Easy / Medium / Hard) let the player calibrate challenge. Score is tracked across sessions. Every game feels genuinely different in under 3 minutes.

## Positioning
Futuristic, visual, addictive. A go-to idle game for spatial thinkers — the 3D board is the hook, the AI keeps it interesting.

## Brand & Tone
- Dark, neon-lit, cyberpunk aesthetic — glowing cyan/indigo/magenta on deep charcoal
- Premium futuristic feel; not childish, not corporate
- "One more game" loop mentality
- Wordmark: **TacTox** — sharp, modern, memorable

## Core Capabilities (Day One)
- Interactive 3×3×3 board rendered in the browser (three stacked layers with depth connectors)
- Minimax AI with alpha-beta pruning — Easy (random), Medium (depth 2), Hard (depth 4)
- Win detection across all 49 winning lines: rows, columns, pillars, face diagonals, space diagonals
- Score tracking across sessions (persistent within session, visible scoreboard)
- Instant restart — zero friction between games
- Configurable via portal: difficulty, player colors, scoreboard visibility, title, tagline

## Scope & Constraints
- Single-player vs AI only at launch
- Browser-based; no backend required
- No accounts or online multiplayer at launch
- Planned next: local 2-player mode, leaderboard/history, sound FX + win animations

## Strategic Principles
- Simplicity first: zero onboarding friction
- Visual impact: the 3D neon board is the product hook
- Short session design: complete a game in under 3 minutes
- Configurable without code changes via portal configurables
