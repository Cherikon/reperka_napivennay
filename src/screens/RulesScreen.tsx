import { css } from '@emotion/react';
import { AudioLines } from 'lucide-react';
import { theme } from '../app/theme';
import { RememberButton } from '../components/RememberButton';
import { Actions, Eyebrow, Panel, Title } from '../components/ui';

export function RulesScreen({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Panel css={css({
      maxWidth: 850, marginInline: 'auto', borderColor: '#65448d',
      background: 'radial-gradient(ellipse at top right, #2b1c40, #18181e 62%)',
    })}>
      <Eyebrow><AudioLines size={15} /> ПРАВИЛА БАТТЛА</Eyebrow>
      <Title>СЛУШАЙ СЮДА, РЕПЕРКА 🎤</Title>
      <div css={css({
        display: 'grid', gap: 14, maxWidth: '64ch', color: theme.colors.muted,
        fontSize: 'clamp(15px, 2.1vw, 17px)',
      })}>
        <p>Перед тобой 8 строк величайшего произведения словесного хаоса.</p>
        <p>Твоя задача — запомнить их все, не перепутать слова и дойти до легендарного РАУНДА.</p>
        <p css={css({
          padding: '12px 16px', background: theme.colors.background, color: theme.colors.text,
          borderLeft: `4px solid ${theme.colors.lime}`, borderRadius: 8, lineHeight: 1.65,
        })}>
          Сначала читаешь строку.<br />
          Потом восстанавливаешь пропущенные слова.<br />
          Затем собираешь их в правильном порядке.<br />
          И наконец выдаёшь весь панч по памяти.
        </p>
        <p>За успехи получаешь респект и комплименты.</p>
        <p>За ошибки — ещё одну попытку. Мы тут не звери.</p>
        <p css={css({ color: theme.colors.text, fontWeight: 800 })}>Ну что, Реперка Напивенная, правила усвоила?</p>
      </div>
      <Actions><RememberButton onConfirm={onConfirm} announcement="НУ ТОГДА ПОГНАЛИ! 🔥" /></Actions>
    </Panel>
  );
}
