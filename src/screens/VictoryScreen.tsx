import { useRef } from 'react';
import { css, keyframes } from '@emotion/react';
import { RotateCcw, Sparkles, Trophy } from 'lucide-react';
import { theme } from '../app/theme';
import { Button } from '../components/Button';
import { Actions, Eyebrow, Intro, Panel, Title } from '../components/ui';
import type { Progress } from '../types/game';

const sweep = keyframes({
  from: { transform: 'rotate(-28deg)' },
  to: { transform: 'rotate(28deg)' },
});

const fall = keyframes({
  '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
  '12%': { opacity: 1 },
  '80%': { opacity: 1 },
  '100%': { transform: 'translateY(680px) rotate(540deg)', opacity: 0 },
});

const confetti = [theme.colors.lime, theme.colors.purple, theme.colors.orange, theme.colors.text];

export function VictoryScreen({ progress, onRespect, onReset }: {
  progress: Progress; onRespect: () => void; onReset: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <Panel css={css({
      position: 'relative', overflow: 'hidden', isolation: 'isolate', textAlign: 'center', borderColor: '#694c93',
      background: 'radial-gradient(ellipse at top, #36204b, #19171f 65%)', paddingBlock: 'clamp(28px, 6vw, 72px)',
    })}>
      <div aria-hidden="true" css={css({ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none' })}>
        {[15, 85].map((left, index) => <span key={left} css={css({
          position: 'absolute', top: -45, left: `${left}%`, width: '28%', height: 610, transformOrigin: 'top center',
          clipPath: 'polygon(47% 0, 53% 0, 100% 100%, 0 100%)',
          background: 'linear-gradient(#bb86ff99, #b96dff00)', filter: 'blur(9px)',
          animation: `${sweep} 4s ease-in-out ${index === 0 ? 'alternate' : 'alternate-reverse'} infinite`,
        })} />)}
        {Array.from({ length: 32 }, (_, index) => <span key={index} css={css({
          position: 'absolute', top: -14, left: `${(index * 41) % 100}%`, width: index % 2 === 0 ? 8 : 5, height: 10,
          background: confetti[index % confetti.length], animation: `${fall} ${2.8 + (index % 5) / 5}s ${(index % 9) / 7}s both`,
        })} />)}
      </div>
      <Trophy size={86} strokeWidth={1.65} color={theme.colors.lime} />
      <div><Eyebrow>РАУНД ЗАСЧИТАН · 100%</Eyebrow></div>
      <Title css={css({ maxWidth: '20ch', marginInline: 'auto', '& span': { color: theme.colors.lime } })}>Реперка Напивенная <span>— легенда! 🏆</span></Title>
      <Intro css={css({ marginInline: 'auto' })}>Восемь строк уничтожены. Микрофон выжил не полностью.</Intro>
      <div css={css({ maxWidth: '58ch', margin: '22px auto', '& p + p': { marginTop: 10 } })}>
        <p>Ты прошла все испытания, запомнила этот великий образец словесного искусства и официально заслужила титул главной угрозы рэп-баттлов.</p>
        <p>Эминем, освобождай сцену.</p>
        <p><strong>РЕПЕРКА НАПИВЕННАЯ В ЗДАНИИ.<br />РАУНД! 🎤</strong></p>
      </div>
      <dl css={css({ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBlock: 22 })}>
        {[
          { label: 'ОПЫТ', value: `${progress.xp} XP` },
          { label: 'ВЕРНЫЕ ОТВЕТЫ', value: progress.correct },
          { label: 'ПОПЫТКИ', value: progress.attempts },
          { label: 'УРОВНИ', value: `${progress.completed}/8` },
        ].map(({ label, value }) => (
          <div key={label} css={css({
            minWidth: 98, padding: '9px 11px', border: `1px solid ${theme.colors.border}`, borderRadius: 7,
            background: theme.colors.background, fontFamily: theme.fonts.mono,
          })}>
            <dt css={css({ color: theme.colors.muted, fontSize: 10, fontWeight: 800 })}>{label}</dt>
            <dd css={css({ margin: 0, color: theme.colors.lime, fontWeight: 900, fontSize: 17 })}>{value}</dd>
          </div>
        ))}
      </dl>
      <p role="status" css={css({ fontWeight: 750, minHeight: '1.5em' })}>{progress.compliment}</p>
      <Actions css={css({ justifyContent: 'center' })}>
        <Button type="button" onClick={onRespect}><Sparkles size={18} /> ПОЛУЧИТЬ ЕЩЁ РЕСПЕКТА</Button>
        <Button type="button" variant="secondary" onClick={() => dialog.current?.showModal()}><RotateCcw size={18} /> НОВЫЙ БАТТЛ</Button>
      </Actions>
      <dialog ref={dialog} aria-labelledby="reset-title" css={css({
        maxWidth: 'min(90vw, 420px)', padding: 22, borderRadius: 12, textAlign: 'left',
        border: `1px solid ${theme.colors.border}`, background: theme.colors.surface, color: theme.colors.text,
        '&::backdrop': { background: '#08080bd9' },
      })}>
        <h2 id="reset-title">Начать новый баттл?</h2>
        <Intro>Уровни, XP, достижения и статистика начнутся с нуля.</Intro>
        <Actions>
          <Button type="button" variant="secondary" autoFocus onClick={() => dialog.current?.close()}>ОСТАТЬСЯ</Button>
          <Button type="button" onClick={() => { dialog.current?.close(); onReset(); }}>НАЧАТЬ С НУЛЯ</Button>
        </Actions>
      </dialog>
    </Panel>
  );
}
