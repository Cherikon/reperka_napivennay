import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const appear = keyframes({ from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'translateY(0)' } });

export const Eyebrow = styled.span(({ theme }) => ({
  display: 'inline-flex', alignItems: 'center', gap: 8,
  color: theme.colors.lime, fontFamily: theme.fonts.mono, fontSize: 11,
  lineHeight: 1.4, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase',
}));

export const Title = styled.h1(({ theme }) => ({
  fontFamily: theme.fonts.display, fontWeight: 950, letterSpacing: '-.055em',
  fontSize: 'clamp(32px, 5.5vw, 68px)', lineHeight: 1.02, textTransform: 'uppercase',
  margin: '10px 0 14px', textWrap: 'balance',
}));

export const Intro = styled.p(({ theme }) => ({
  color: theme.colors.muted, fontSize: 'clamp(14px, 2.1vw, 17px)', maxWidth: '64ch',
}));

export const Panel = styled.section(({ theme }) => ({
  background: theme.colors.surface, border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.layout.radius, padding: 'clamp(18px, 4vw, 36px)', minWidth: 0,
  animation: `${appear} .28s both`,
}));

export const Actions = styled.div(({ theme }) => ({
  display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: theme.space.sm, marginTop: theme.space.md,
  '@media (max-width: 520px)': { '& > button': { width: '100%' } },
}));

export const TextArea = styled.textarea(({ theme }) => ({
  display: 'block', width: '100%', resize: 'vertical', minHeight: 126, marginTop: 8,
  padding: '14px 16px', border: `1px solid ${theme.colors.border}`, borderRadius: 8,
  background: theme.colors.background, color: theme.colors.text, fontSize: 16,
  '&::placeholder': { color: theme.colors.muted },
  '&[aria-invalid=true]': { borderColor: theme.colors.orange },
}));

export const FieldLabel = styled.label(({ theme }) => ({
  color: theme.colors.muted, fontFamily: theme.fonts.mono, fontSize: 12, fontWeight: 800,
}));

export const Feedback = styled.div(({ theme }) => ({
  border: `1px solid ${theme.colors.border}`, borderLeft: `3px solid ${theme.colors.orange}`,
  borderRadius: 8, background: theme.colors.background, padding: '12px 14px', marginTop: 16,
  color: theme.colors.text,
}));
