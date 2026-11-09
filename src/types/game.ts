export const stepRewards = [0, 10, 15, 20, 25, 40] as const;
export const finalReward = 150;

export interface Run {
  level: number;
  step: number;
  won: boolean;
}

export interface Progress {
  xp: number;
  attempts: number;
  correct: number;
  completed: number;
  finished: boolean;
  compliment: string;
  run: Run | null;
}
