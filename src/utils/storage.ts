import { lyrics } from '../data/lyrics';
import { stepRewards, type Progress } from '../types/game';

const storageKey = 'reperka-napivennaya.v1';

export const initialProgress: Progress = {
  xp: 0, attempts: 0, correct: 0, completed: 0, finished: false, compliment: '', run: null,
};

function count(value: unknown): number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : 0;
}

export function readProgress(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    if (!saved || typeof saved !== 'object') return initialProgress;

    const completed = Math.min(count(saved.completed), lyrics.length);
    const attempts = count(saved.attempts);
    const run = saved.run;
    const validRun = run && Number.isInteger(run.level) && run.level >= 0 &&
      run.level <= completed && run.level < lyrics.length && Number.isInteger(run.step) &&
      run.step >= 0 && run.step < stepRewards.length;

    return {
      xp: count(saved.xp),
      attempts,
      correct: Math.min(count(saved.correct), attempts),
      completed,
      finished: completed === lyrics.length && saved.finished === true,
      compliment: typeof saved.compliment === 'string' ? saved.compliment : '',
      run: validRun ? { level: run.level, step: run.step, won: run.step > 0 && run.won === true } : null,
    };
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress: Progress) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    // The game remains playable for this session when browser storage is unavailable.
  }
}
