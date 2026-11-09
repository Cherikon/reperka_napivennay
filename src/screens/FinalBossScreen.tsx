import { useState, type FormEvent } from 'react';
import { css } from '@emotion/react';
import { Check, Flame, Lightbulb } from 'lucide-react';
import { theme } from '../app/theme';
import { AnswerDiff } from '../components/AnswerDiff';
import { Button } from '../components/Button';
import { ComplimentPopup } from '../components/ComplimentPopup';
import { Actions, Eyebrow, Feedback, FieldLabel, Intro, Panel, TextArea, Title } from '../components/ui';
import { errorReaction } from '../data/compliments';
import { finalLines } from '../data/lyrics';
import { finalReward } from '../types/game';
import { compareFinal, words } from '../utils/textComparison';

export function FinalBossScreen({ alreadyWon, compliment, onAnswer, onVictory }: {
  alreadyWon: boolean; compliment: string; onAnswer: (correct: boolean) => void; onVictory: () => void;
}) {
  const [input, setInput] = useState('');
  const [hints, setHints] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof compareFinal>>();
  const [reward, setReward] = useState(0);

  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (words(input).length === 0 || result?.correct) return;
    const compared = compareFinal(finalLines, input);
    setResult(compared);
    setAttempt(attempt + 1);
    if (compared.correct && !alreadyWon) setReward(finalReward);
    onAnswer(compared.correct);
  }

  return (
    <div css={css({ maxWidth: 900, marginInline: 'auto' })}>
      <Eyebrow css={css({ color: theme.colors.orange })}><Flame size={16} /> ФИНАЛЬНЫЙ БОСС</Eyebrow>
      <Title>Финальный раунд 🎤🔥</Title>
      <Intro>Ты дошла до финала. Теперь никаких поблажек. Воспроизведи весь легендарный текст по памяти.</Intro>
      <div css={css({ marginTop: 22 })}>
        {result?.correct ? (
          <ComplimentPopup compliment={compliment} reward={reward} levelComplete next={onVictory} />
        ) : (
          <Panel css={css({ borderColor: '#65448d' })}>
            <form onSubmit={check}>
              <FieldLabel htmlFor="final-lyrics">8 СТРОК + ФИНАЛЬНАЯ РЕПЛИКА</FieldLabel>
              <TextArea id="final-lyrics" rows={9} value={input} placeholder="Каждый панч с новой строки. «Раунд!» — отдельной строкой в самом конце."
                spellCheck={false} autoComplete="off" autoCapitalize="off" aria-invalid={result && !result.correct}
                onChange={(event) => { setInput(event.target.value); setResult(undefined); }} />
              <Actions>
                <Button type="submit" disabled={words(input).length === 0}><Check size={18} /> ЗАСЧИТАТЬ РАУНД</Button>
                <Button type="button" variant="secondary" aria-expanded={hints} aria-controls="final-hints" onClick={() => setHints(!hints)}>
                  <Lightbulb size={18} /> {hints ? 'СКРЫТЬ ПОДСКАЗКУ' : 'ПЕРВЫЕ БУКВЫ'}
                </Button>
              </Actions>
            </form>
            <div id="final-hints" hidden={!hints}>
              <ol css={css({ color: '#d5bcff', marginBottom: 0, font: `700 14px/1.65 ${theme.fonts.mono}`, letterSpacing: '.08em' })}>
                {finalLines.map((line) => <li key={line}>{line.split(' ').map((word) => word[0].toUpperCase()).join(' · ')}</li>)}
              </ol>
            </div>
            {result && !result.correct && <Feedback>
              <p role="status"><strong>{result.accuracy}% верно.</strong> {errorReaction(attempt - 1)}</p>
              <ol aria-label="Результаты по строкам" css={css({ margin: '8px 0 0', paddingLeft: 22, '& li + li': { marginTop: 9 } })}>
                {result.lines.map((line, index) => (
                  <li key={index}>
                    <strong css={css({ fontSize: 13, color: line.correct ? theme.colors.lime : '#ffb195' })}>
                      {index === finalLines.length - 1 ? 'Финальная реплика' : index >= finalLines.length ? 'Лишняя строка' : `Строка ${index + 1}`}
                      {' · '}{line.correct ? 'верно' : 'есть ошибки'}
                    </strong>
                    {!line.correct && <AnswerDiff edits={line.edits} />}
                  </li>
                ))}
              </ol>
            </Feedback>}
          </Panel>
        )}
      </div>
    </div>
  );
}
