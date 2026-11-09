import { useState, type FormEvent } from 'react';
import { css } from '@emotion/react';
import { Check } from 'lucide-react';
import { theme } from '../app/theme';
import { Button } from '../components/Button';
import { Actions, Feedback } from '../components/ui';
import { errorReaction } from '../data/compliments';
import { shuffle, words } from '../utils/textComparison';

export function MissingWords({ line, round, onAnswer }: { line: string; round: number; onAnswer: (correct: boolean) => void }) {
  const tokens = line.split(' ');
  const count = [1, 2, Math.ceil(tokens.length / 2)][round - 1];
  const [hidden] = useState(() => new Set(shuffle(tokens.map((_, index) => index)).slice(0, count)));
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [invalid, setInvalid] = useState<number[]>([]);
  const [attempt, setAttempt] = useState(0);
  const ready = Array.from(hidden).every((index) => (inputs[index] ?? '').trim());

  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;
    const wrong = Array.from(hidden).filter((index) => words(inputs[index]).join(' ') !== words(tokens[index]).join(' '));
    setInvalid(wrong);
    setAttempt(attempt + 1);
    onAnswer(wrong.length === 0);
  }

  return (
    <form onSubmit={check}>
      <p css={css({ color: theme.colors.muted, marginBottom: 18 })}>Впиши по одному слову в каждое пустое поле.</p>
      <div css={css({
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px 9px', minHeight: 94,
        padding: 'clamp(10px, 3vw, 22px)', borderRadius: 9, background: theme.colors.background,
        fontSize: 'clamp(16px, 3vw, 25px)', fontWeight: 750,
      })}>
        {tokens.map((token, index) => {
          if (!hidden.has(index)) return <span key={index}>{token}</span>;
          const punctuation = token.match(/[^\p{L}\p{N}]+$/u)?.[0];
          return (
            <span key={index} css={css({ display: 'inline-flex', alignItems: 'center', maxWidth: '100%' })}>
              <input aria-label={`Слово ${index + 1}`} aria-invalid={invalid.includes(index)}
                type="text" autoComplete="off" autoCapitalize="off" spellCheck={false}
                value={inputs[index] ?? ''} placeholder="···"
                onChange={(event) => {
                  setInputs({ ...inputs, [index]: event.target.value });
                  setInvalid(invalid.filter((value) => value !== index));
                }}
                css={css({
                  width: 'clamp(100px, 18vw, 152px)', minHeight: 45, padding: '4px 7px', borderRadius: 5,
                  fontSize: 'max(16px, .8em)', textAlign: 'center', color: theme.colors.lime,
                  border: `1px solid ${theme.colors.border}`, borderBottomColor: theme.colors.lime, background: theme.colors.surface,
                  '&[aria-invalid=true]': { borderColor: theme.colors.orange },
                })} />
              {punctuation}
            </span>
          );
        })}
      </div>
      {invalid.length > 0 && <Feedback role="status">{errorReaction(attempt - 1)} Проверь отмеченные слова.</Feedback>}
      <Actions><Button type="submit" disabled={!ready}><Check size={18} /> ПРОВЕРИТЬ ПАНЧ</Button></Actions>
    </form>
  );
}
