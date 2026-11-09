import { useState } from 'react';
import { css } from '@emotion/react';
import { Check, RotateCcw } from 'lucide-react';
import { theme } from '../app/theme';
import { Button } from '../components/Button';
import { Actions, Feedback, FieldLabel } from '../components/ui';
import { errorReaction } from '../data/compliments';
import { shuffle, words } from '../utils/textComparison';

const row = css({ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 10, minHeight: 68, alignItems: 'center' });
const chip = css({
  minHeight: 44, background: theme.colors.raised, color: theme.colors.text,
  border: `1px solid ${theme.colors.border}`, borderRadius: 6, padding: '5px 10px',
  fontSize: 16, fontWeight: 700, cursor: 'pointer',
  '&:hover': { borderColor: theme.colors.lime },
});

export function WordOrdering({ line, onAnswer }: { line: string; onAnswer: (correct: boolean) => void }) {
  const [pool] = useState(() => {
    const tokens = words(line).map((word, id) => ({ word, id }));
    const mixed = shuffle(tokens);
    return mixed.every((token, index) => token.word === tokens[index].word) ? [...mixed.slice(1), mixed[0]] : mixed;
  });
  const [chosen, setChosen] = useState<typeof pool>([]);
  const [attempt, setAttempt] = useState(0);
  const [invalid, setInvalid] = useState(false);

  function update(next: typeof pool) {
    setChosen(next);
    setInvalid(false);
  }

  function check() {
    const expected = words(line);
    const correct = chosen.length === expected.length && chosen.every((token, index) => token.word === expected[index]);
    setAttempt(attempt + 1);
    setInvalid(!correct);
    onAnswer(correct);
  }

  return (
    <>
      <p css={css({ color: theme.colors.muted, marginBottom: 17 })}>Нажимай на слова по порядку. Нажми на добавленное слово, чтобы вернуть его в набор.</p>
      <FieldLabel as="span" id="chosen-label">ТВОЯ СТРОКА · {chosen.length}/{pool.length}</FieldLabel>
      <div role="group" aria-labelledby="chosen-label" css={[row, css({
        background: theme.colors.background, borderRadius: 8, border: `1px dashed ${invalid ? theme.colors.orange : theme.colors.border}`, margin: '6px 0 16px',
      })]}>
        {chosen.length === 0 && <span css={css({ color: theme.colors.muted, fontSize: 13 })}>Тут появятся выбранные слова</span>}
        {chosen.map((token) => <button type="button" key={token.id} css={[chip, css({ color: theme.colors.lime })]}
          onClick={() => update(chosen.filter(({ id }) => id !== token.id))}>{token.word}</button>)}
      </div>
      <FieldLabel as="span" id="pool-label">СЛОВА НА ВЫБОР</FieldLabel>
      <div role="group" aria-labelledby="pool-label" css={[row, css({ paddingInline: 0 })]}>
        {pool.filter((token) => !chosen.some(({ id }) => id === token.id)).map((token) => (
          <button type="button" key={token.id} css={chip} onClick={() => update([...chosen, token])}>{token.word}</button>
        ))}
        {chosen.length === pool.length && <span css={css({ color: theme.colors.muted, fontSize: 13 })}>Все слова в строке</span>}
      </div>
      {invalid && <Feedback role="status">{errorReaction(attempt - 1)} Проверь порядок слов.</Feedback>}
      <Actions>
        <Button type="button" disabled={chosen.length !== pool.length} onClick={check}><Check size={18} /> ПРОВЕРИТЬ ПОРЯДОК</Button>
        <Button type="button" variant="secondary" disabled={chosen.length === 0} onClick={() => update([])}><RotateCcw size={16} /> СОБРАТЬ ЗАНОВО</Button>
      </Actions>
    </>
  );
}
