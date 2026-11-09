import { useEffect, useState } from 'react';
import { nextCompliment } from '../data/compliments';
import { lyrics } from '../data/lyrics';
import { finalReward, stepRewards } from '../types/game';
import { initialProgress, readProgress, saveProgress } from '../utils/storage';

export function useGameProgress() {
  const [progress, setProgress] = useState(readProgress);
  useEffect(() => saveProgress(progress), [progress]);

  function selectLevel(level: number) {
    setProgress((p) => {
      if (level > p.completed || level >= lyrics.length || p.run?.level === level) return p;
      return { ...p, run: { level, step: 0, won: false } };
    });
  }

  function advance() {
    setProgress((p) => {
      const run = p.run;
      if (!run || (run.step !== 0 && !run.won)) return p;
      return {
        ...p,
        run: run.step + 1 === stepRewards.length ? null : { ...run, step: run.step + 1, won: false },
      };
    });
  }

  function answer(correct: boolean) {
    const compliment = nextCompliment(progress.compliment);
    setProgress((p) => {
      const run = p.run;
      if (!run || run.step === 0 || run.won) return p;
      if (!correct) return { ...p, attempts: p.attempts + 1 };

      const completed = run.step + 1 === stepRewards.length ? Math.max(p.completed, run.level + 1) : p.completed;
      return {
        ...p, completed, compliment, attempts: p.attempts + 1, correct: p.correct + 1,
        xp: p.xp + stepRewards[run.step], run: { ...run, won: true },
      };
    });
  }

  function answerFinal(correct: boolean) {
    const compliment = nextCompliment(progress.compliment);
    setProgress((p) => {
      if (p.completed !== lyrics.length) return p;
      if (!correct) return { ...p, attempts: p.attempts + 1 };
      return {
        ...p, finished: true, compliment, attempts: p.attempts + 1, correct: p.correct + 1,
        xp: p.xp + (p.finished ? 0 : finalReward),
      };
    });
  }

  function moreRespect() {
    const compliment = nextCompliment(progress.compliment);
    setProgress((p) => ({ ...p, compliment }));
  }

  return {
    progress, selectLevel, advance, answer, answerFinal, moreRespect,
    reset: () => setProgress(initialProgress),
  };
}
