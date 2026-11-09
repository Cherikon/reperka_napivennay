import { css } from '@emotion/react';

export const theme = {
  colors: {
    background: '#101014', surface: '#18181e', raised: '#202027', border: '#35353f',
    lime: '#C6FF00', purple: '#9B5CFF', orange: '#FF7538', text: '#F5F5F5', muted: '#b0adb8',
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    display: '"Arial Black", "Arial Bold", system-ui, sans-serif',
    mono: 'ui-monospace, "Cascadia Mono", Consolas, monospace',
  },
  space: { sm: 12, md: 20, lg: 32 },
  layout: { width: 1280, radius: 14 },
};

type GameTheme = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends GameTheme {}
}

export const globalStyles = css({
  '*': { boxSizing: 'border-box' },
  ':root': { colorScheme: 'dark' },
  body: {
    margin: 0, minWidth: 280, minHeight: '100vh', backgroundColor: theme.colors.background,
    color: theme.colors.text, fontFamily: theme.fonts.body, lineHeight: 1.5,
  },
  'button, input, textarea': { font: 'inherit' },
  button: { WebkitTapHighlightColor: 'transparent' },
  'button, a, input, textarea': { touchAction: 'manipulation' },
  'button:focus-visible, a:focus-visible, input:focus-visible, textarea:focus-visible': {
    outline: `2px solid ${theme.colors.purple}`, outlineOffset: 4,
  },
  'h1, h2, h3, p': { margin: 0 },
  '::selection': { background: theme.colors.lime, color: theme.colors.background },
  '@media (prefers-reduced-motion: reduce)': {
    '*, *::before, *::after': { animationDuration: '0.01ms !important', transitionDuration: '0.01ms !important' },
  },
});
