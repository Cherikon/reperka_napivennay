import { css } from '@emotion/react';
import { theme } from '../app/theme';
import type { compareWords } from '../utils/textComparison';

export function AnswerDiff({ edits }: { edits: ReturnType<typeof compareWords>['edits'] }) {
  return (
    <div css={css({ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 7 })}>
      {edits.map(({ kind, value }, index) => {
        const bad = kind !== 'correct';
        const label = kind === 'missing' ? 'Пропущено слово' : kind === 'extra' ? 'Лишнее слово' : 'Ошибка в слове';
        return <span key={index} aria-label={bad ? `${label}: ${value}` : undefined} css={css({
          padding: '1px 6px', borderRadius: 4, overflowWrap: 'anywhere', maxWidth: '100%',
          fontSize: 13, color: bad ? '#ffb195' : theme.colors.text, background: bad ? '#47251c' : theme.colors.raised,
          textDecoration: kind === 'extra' ? 'line-through' : bad ? 'underline' : undefined,
        })}>{value}</span>;
      })}
    </div>
  );
}
