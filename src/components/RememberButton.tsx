import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import { theme } from '../app/theme';
import { Button } from './Button';

const springMs = 360;
const spring = keyframes({
  '0%, 100%': { transform: 'scale(1)' },
  '35%': { transform: 'scale(1.065)' },
  '65%': { transform: 'scale(.985)' },
  '83%': { transform: 'scale(1.018)' },
});

export function RememberButton({ onConfirm, announcement }: { onConfirm: () => void; announcement?: string }) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!pressed) return;
    const timer = window.setTimeout(onConfirm, announcement ? 950 : springMs);
    return () => window.clearTimeout(timer);
  }, [pressed, onConfirm, announcement]);

  return (
    <>
      <Button type="button" aria-disabled={pressed} onClick={() => setPressed(true)} css={css({
        minHeight: 58, minWidth: 'min(100%, 230px)', fontSize: 18, letterSpacing: '-.015em',
        borderRadius: 10, boxShadow: '0 4px 0 #7850bc',
        '& span': { display: 'inline-block', fontSize: 24, lineHeight: 1 },
        '&:hover:not([aria-disabled=true]) span': { transform: 'rotate(-9deg)', transition: 'transform .18s' },
        '&[aria-disabled=true]': { animation: `${spring} ${springMs}ms ease-out both`, cursor: 'default' },
      })}>
        Я запомнила <span>💅</span>
      </Button>
      {announcement && (
        <p role="status" css={css({
          color: theme.colors.orange, font: `900 14px ${theme.fonts.mono}`,
          '@media (max-width: 520px)': { textAlign: 'center', width: '100%' },
        })}>{pressed && announcement}</p>
      )}
    </>
  );
}
