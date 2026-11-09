import styled from '@emotion/styled';

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>(
  ({ theme, variant = 'primary' }) => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    minHeight: 50, padding: '12px 19px', borderRadius: 8, cursor: 'pointer',
    fontWeight: 900, fontSize: 13, letterSpacing: '.055em', textAlign: 'center',
    border: `1px solid ${variant === 'primary' ? theme.colors.lime : theme.colors.border}`,
    background: variant === 'primary' ? theme.colors.lime : theme.colors.surface,
    color: variant === 'primary' ? theme.colors.background : theme.colors.text,
    transition: 'background .18s, transform .18s, border-color .18s',
    '& svg': { flexShrink: 0 },
    '&:hover:not(:disabled)': { transform: 'translateY(-2px)', borderColor: theme.colors.lime },
    '&:active:not(:disabled)': { transform: 'translateY(0)' },
    '&:disabled': { opacity: .46, cursor: 'default' },
  }),
);
