import { css, keyframes } from '@emotion/react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { theme } from '../app/theme';
import { Button } from './Button';
import { Eyebrow, Panel } from './ui';

const burst = keyframes({
  '0%': { transform: 'scale(.2) rotate(-40deg)', opacity: 0 },
  '50%': { transform: 'scale(1.2) rotate(9deg)', opacity: 1 },
  '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
});

export function ComplimentPopup({ compliment, reward, levelComplete, next }: {
  compliment: string; reward: number; levelComplete: boolean; next: () => void;
}) {
  return (
    <Panel aria-label="Победа" css={css({
      textAlign: 'center', borderColor: theme.colors.lime,
      background: 'radial-gradient(ellipse at 50% 0%, #303818, #18181e 70%)',
      paddingBlock: 'clamp(32px, 8vw, 76px)',
    })}>
      <div css={css({
        display: 'inline-flex', alignItems: 'center', gap: 14, color: theme.colors.lime, marginBottom: 18,
        animation: `${burst} .56s both`,
      })}><Sparkles size={25} /><Check size={64} strokeWidth={3} /><Sparkles size={25} /></div>
      <div role="status">
        <Eyebrow>{levelComplete ? 'ИСПЫТАНИЕ ПРОЙДЕНО' : 'ЧИСТОЕ ПОПАДАНИЕ'}{reward > 0 && ` · +${reward} XP`}</Eyebrow>
        <h2 css={css({ fontSize: 'clamp(27px, 6vw, 54px)', fontWeight: 950, letterSpacing: '-.05em' })}>ПАНЧ ЗАСЧИТАН</h2>
        <p css={css({ margin: '6px auto 22px', color: theme.colors.muted })}>{compliment}</p>
      </div>
      <Button autoFocus type="button" onClick={next}>СЛЕДУЮЩИЙ ПАНЧ <ArrowRight size={18} /></Button>
    </Panel>
  );
}
