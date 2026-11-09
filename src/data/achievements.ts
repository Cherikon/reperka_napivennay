import { lyrics } from './lyrics';
import type { Progress } from '../types/game';

export const achievements = [
  { name: 'Первый панч', goal: 'Дай первый верный ответ', earned: (p: Progress) => p.correct >= 1 },
  { name: 'Мастер словесного хаоса', goal: 'Пройди первый уровень', earned: (p: Progress) => p.completed >= 1 },
  { name: 'Память как у слона', goal: 'Пройди четыре уровня', earned: (p: Progress) => p.completed >= 4 },
  { name: 'Гроза микрофонов', goal: 'Набери 500 XP', earned: (p: Progress) => p.xp >= 500 },
  { name: 'Легенда подполья', goal: 'Пройди все восемь уровней', earned: (p: Progress) => p.completed === lyrics.length },
  { name: 'Реперка года', goal: 'Победи в финальном раунде', earned: (p: Progress) => p.finished },
];
