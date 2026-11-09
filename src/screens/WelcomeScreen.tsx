import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { ArrowUpRight, AudioLines, Brain, Flame, Layers3, MicVocal, Zap } from 'lucide-react';
import { theme } from '../app/theme';
import { Button } from '../components/Button';
import { StageArt } from '../components/StageArt';
import { Eyebrow } from '../components/ui';

const enter = keyframes({
  from: { opacity: 0, transform: 'translateY(16px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const glow = keyframes({
  '0%, 100%': { backgroundPosition: '0% 30%' },
  '50%': { backgroundPosition: '95% 60%' },
});

const Hero = styled.section(({ theme }) => ({
  position: 'relative', display: 'grid', gridTemplateColumns: '1.11fr 1fr', overflow: 'hidden',
  border: `1px solid ${theme.colors.border}`, borderRadius: theme.layout.radius,
  background: 'radial-gradient(ellipse at bottom left, #222019, #17171c 65%)',
  '@media (max-width: 780px)': { gridTemplateColumns: '1fr' },
}));

const Stage = styled.div({
  display: 'grid', alignItems: 'center', minHeight: 360, overflow: 'hidden',
  background: 'linear-gradient(125deg, #2d1360, #4d2088 43%, #291051)',
  backgroundSize: '180% 180%', animation: `${glow} 9s ease infinite`,
  '@media (max-width: 780px)': { minHeight: 0, maxHeight: 340, aspectRatio: '1.35', borderTop: '1px solid #64469b' },
});

const Headline = styled.h1(({ theme }) => ({
  color: theme.colors.text, font: `950 clamp(36px, 5.7vw, 86px)/.91 ${theme.fonts.display}`,
  letterSpacing: '-.079em', margin: '24px 0 18px', animation: `${enter} .5s both`,
  '& span': { color: theme.colors.lime, display: 'block' },
  '@media (min-width: 781px) and (max-width: 1000px)': { fontSize: '5.15vw' },
  '@media (max-width: 780px)': { fontSize: 'clamp(31px, 8.9vw, 65px)', marginTop: 20 },
}));

const features = [
  { number: '01', icon: Layers3, color: theme.colors.lime, title: 'ВОСЕМЬ УРОВНЕЙ', text: 'По одной строке за выход.' },
  { number: '02', icon: Brain, color: theme.colors.purple, title: 'ПЯТЬ ИСПЫТАНИЙ', text: 'От первого пропуска до читки по памяти.' },
  { number: '03', icon: Flame, color: theme.colors.orange, title: 'ФИНАЛЬНЫЙ БОСС', text: 'Весь текст и легендарное «Раунд!».' },
];

export function WelcomeScreen({ hasProgress, start }: { hasProgress: boolean; start: () => void }) {
  return (
    <>
      <Hero>
        <div css={css({
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          padding: 'clamp(18px, 3.8vw, 54px)', minWidth: 0, minHeight: 464,
          '@media (max-width: 780px)': { minHeight: 0, paddingBlock: 28 },
        })}>
          <Eyebrow css={css({
            background: '#252a17', border: '1px solid #4b551e', borderRadius: 4, padding: '5px 8px',
            letterSpacing: '.08em', fontSize: 10,
          })}><AudioLines size={14} /> 8 СТРОК ДО ЛЕГЕНДАРНОГО РАУНДА</Eyebrow>
          <Headline>РЕПЕРКА <span>НАПИВЕННАЯ</span><span css={css({ position: 'absolute', clipPath: 'inset(50%)', width: 1, height: 1, overflow: 'hidden' })}> 🎤</span></Headline>
          <p css={css({ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 780, lineHeight: 1.23, maxWidth: '30ch' })}>
            Твой путь от забытых панчей до легендарного РАУНДА
          </p>
          <p css={css({ color: theme.colors.muted, maxWidth: '46ch', margin: '14px 0 26px', fontSize: 14 })}>
            Восемь строк. Никакой пощады. Один микрофон. Сможешь запомнить весь этот шедевр человеческой мысли?
          </p>
          <Button type="button" onClick={start} css={css({ minHeight: 55, '@media (max-width: 520px)': { width: '100%' } })}>
            <MicVocal size={19} /> {hasProgress ? 'ПРОДОЛЖИТЬ РАЗНОС' : 'ВЫЙТИ НА БАТТЛ'} <ArrowUpRight size={18} />
          </Button>
        </div>
        <Stage><StageArt /></Stage>
      </Hero>
      <div css={css({
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        margin: '25px 0 13px', font: `800 10px ${theme.fonts.mono}`, letterSpacing: '.13em', color: theme.colors.muted,
      })}>
        <span css={css({ display: 'inline-flex', alignItems: 'center', gap: 7 })}><Zap size={13} color={theme.colors.lime} /> ПРОГРАММА БАТТЛА</span>
        <span>СЦЕНА 01 / UNDERGROUND</span>
      </div>
      <div css={css({ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, '@media (max-width: 680px)': { gridTemplateColumns: '1fr' } })}>
        {features.map(({ number, icon: Icon, color, title, text }) => (
          <article key={number} css={css({
            display: 'flex', alignItems: 'center', gap: 13, padding: '14px 15px',
            border: `1px solid ${theme.colors.border}`, borderRadius: 9, background: theme.colors.surface,
          })}>
            <span css={css({ display: 'grid', placeItems: 'center', width: 42, height: 42, flexShrink: 0, color, background: `${color}17`, borderRadius: 7 })}><Icon size={21} /></span>
            <div css={css({ flex: 1 })}>
              <h2 css={css({ fontSize: 12, letterSpacing: '.045em', fontWeight: 900 })}>{title}</h2>
              <p css={css({ color: theme.colors.muted, fontSize: 12, marginTop: 2 })}>{text}</p>
            </div>
            <span aria-hidden="true" css={css({ color: theme.colors.muted, font: `700 10px ${theme.fonts.mono}` })}>/{number}</span>
          </article>
        ))}
      </div>
    </>
  );
}
