import type { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AudioLines, Map, MicVocal, Zap } from 'lucide-react';
import { theme } from '../app/theme';

const shell = css({ width: `min(100% - clamp(28px, 8vw, 120px), ${theme.layout.width}px)`, marginInline: 'auto' });

const Top = styled.header(({ theme }) => ({
  borderBottom: `1px solid ${theme.colors.border}`, background: theme.colors.background,
}));

const Brand = styled.button(({ theme }) => ({
  display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', cursor: 'pointer',
  padding: 0, border: 0, background: 'none', color: theme.colors.text,
  '& > span:first-of-type': {
    display: 'grid', placeItems: 'center', background: theme.colors.lime, color: theme.colors.background,
    width: 36, height: 36, borderRadius: 7, flexShrink: 0, transform: 'rotate(-6deg)',
  },
  '& strong': { display: 'block', fontSize: 13, fontWeight: 950, letterSpacing: '.035em', lineHeight: 1.1 },
  '& small': { display: 'block', fontFamily: theme.fonts.mono, fontSize: 9, color: theme.colors.muted, letterSpacing: '.1em', marginTop: 4 },
}));

const headerAction = css({
  display: 'inline-flex', gap: 7, alignItems: 'center', justifyContent: 'center',
  minHeight: 42, padding: '0 11px', background: theme.colors.surface, border: `1px solid ${theme.colors.border}`,
  color: theme.colors.text, borderRadius: 7, font: `800 11px ${theme.fonts.mono}`,
  whiteSpace: 'nowrap', '& svg': { flexShrink: 0 },
});

export function GameLayout({ xp, home, showMap, children }: {
  xp: number; home: () => void; showMap: () => void; children: ReactNode;
}) {
  return (
    <>
      <Top>
        <div css={[shell, css({ minHeight: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 })]}>
          <Brand type="button" onClick={home} aria-label="Реперка Напивенная — главная">
            <span><MicVocal size={21} /></span>
            <span><strong>РЕПЕРКА<br />НАПИВЕННАЯ</strong><small>БАТТЛ-ТРЕНАЖЁР</small></span>
          </Brand>
          <nav aria-label="Навигация" css={css({ display: 'flex', gap: 8 })}>
            <button type="button" aria-label="Карта уровней" onClick={showMap} css={[headerAction, css({
              cursor: 'pointer', '&:hover': { borderColor: theme.colors.purple },
              '@media (max-width: 520px)': { '& span': { display: 'none' } },
            })]}><Map size={15} /><span>КАРТА УРОВНЕЙ</span></button>
            <span aria-label={`${xp} очков опыта`} css={[headerAction, css({ color: theme.colors.lime })]}>
              <Zap size={15} fill="currentColor" /> {xp} XP
            </span>
          </nav>
        </div>
      </Top>
      <main id="main" tabIndex={-1} css={[shell, css({ paddingBlock: 'clamp(20px, 4vw, 44px)', minHeight: 'calc(100svh - 136px)', '&:focus': { outline: 0 } })]}>
        {children}
      </main>
      <footer css={css({ borderTop: `1px solid ${theme.colors.border}` })}>
        <div css={[shell, css({
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 64, gap: 12,
          color: theme.colors.muted, font: `700 10px ${theme.fonts.mono}`, letterSpacing: '.09em',
        })]}>
          <span css={css({ display: 'inline-flex', alignItems: 'center', gap: 8 })}><AudioLines size={15} /> ПОДПОЛЬНЫЙ БАТТЛ-КЛУБ</span>
          <span>8 СТРОК · 1 МИКРОФОН</span>
        </div>
      </footer>
    </>
  );
}
