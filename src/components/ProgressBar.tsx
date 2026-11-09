import { css } from '@emotion/react';
import { theme } from '../app/theme';

export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}
      css={css({ display: 'flex', gap: 4, width: '100%' })}>
      {Array.from({ length: max }, (_, index) => (
        <span key={index} aria-hidden="true" css={css({
          flex: 1, height: 5, borderRadius: 4,
          background: index < value ? theme.colors.lime : theme.colors.border,
          transition: 'background .22s',
        })} />
      ))}
    </div>
  );
}
