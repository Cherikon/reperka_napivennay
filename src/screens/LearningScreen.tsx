import { css } from '@emotion/react';
import { ArrowLeft, AudioLines, BookOpen, Keyboard, ListOrdered, MicVocal } from 'lucide-react';
import { theme } from '../app/theme';
import { Button } from '../components/Button';
import { ComplimentPopup } from '../components/ComplimentPopup';
import { ProgressBar } from '../components/ProgressBar';
import { RememberButton } from '../components/RememberButton';
import { Actions, Eyebrow, Intro, Panel, Title } from '../components/ui';
import { levelNames, lyrics } from '../data/lyrics';
import { MemoryTest } from '../games/MemoryTest';
import { MissingWords } from '../games/MissingWords';
import { WordOrdering } from '../games/WordOrdering';
import { stepRewards, type Run } from '../types/game';

const stages = [
  { name: 'Запомни панч', icon: BookOpen, note: 'Разминка' },
  { name: 'Восстанови панч', icon: Keyboard, note: 'Один пропуск' },
  { name: 'Восстанови панч', icon: Keyboard, note: 'Два пропуска' },
  { name: 'Восстанови панч', icon: Keyboard, note: 'Половина строки' },
  { name: 'Собери строку', icon: ListOrdered, note: 'Правильный порядок' },
  { name: 'Читка без подсказок', icon: MicVocal, note: 'Вся строка по памяти' },
];

export function LearningScreen({ run, compliment, onAnswer, next, map }: {
  run: Run; compliment: string; onAnswer: (correct: boolean) => void; next: () => void; map: () => void;
}) {
  const { level, step, won } = run;
  const line = lyrics[level];
  const { name, icon: Icon, note } = stages[step];
  const levelComplete = step === stages.length - 1;
  const progress = won ? step : Math.max(0, step - 1);

  return (
    <div css={css({ maxWidth: 850, marginInline: 'auto' })}>
      <Button type="button" variant="secondary" onClick={map} css={css({ minHeight: 42, marginBottom: 20, fontSize: 11 })}><ArrowLeft size={16} /> К КАРТЕ</Button>
      <header css={css({ marginBottom: 20 })}>
        <Eyebrow><AudioLines size={15} /> УРОВЕНЬ {String(level + 1).padStart(2, '0')} / 08 · {levelNames[level]}</Eyebrow>
        <Title>{name}</Title>
        <div css={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 9, marginBottom: 8, flexWrap: 'wrap', color: theme.colors.muted, font: `800 12px ${theme.fonts.mono}` })}>
          <span>{step === 0 ? 'РАЗМИНКА' : `ИСПЫТАНИЕ ${step} / 5`}</span>
          {step > 0 && <span css={css({ color: theme.colors.lime })}>{stepRewards[step]} XP</span>}
        </div>
        <ProgressBar value={progress} max={stages.length - 1} label="Испытания уровня" />
      </header>
      {won ? <ComplimentPopup compliment={compliment} reward={stepRewards[step]} levelComplete={levelComplete} next={next} /> : (
        <Panel key={step}>
          <Eyebrow css={css({ marginBottom: 14 })}><Icon size={17} /> {note}</Eyebrow>
          {step === 0 && <>
            <Intro>Прочитай строку вслух или про себя. Следом часть слов исчезнет.</Intro>
            <blockquote css={css({
              margin: '18px 0 0', padding: 'clamp(14px, 4vw, 26px)',
              background: theme.colors.background, borderLeft: `4px solid ${theme.colors.lime}`,
              borderRadius: 8, fontSize: 'clamp(19px, 4vw, 33px)', fontWeight: 800, lineHeight: 1.32,
            })}>{line}</blockquote>
            <Actions><RememberButton onConfirm={next} /></Actions>
          </>}
          {step >= 1 && step <= 3 && <MissingWords line={line} round={step} onAnswer={onAnswer} />}
          {step === 4 && <WordOrdering line={line} onAnswer={onAnswer} />}
          {step === 5 && <MemoryTest line={line} onAnswer={onAnswer} />}
        </Panel>
      )}
    </div>
  );
}
