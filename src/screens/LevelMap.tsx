import { css } from '@emotion/react';
import { ArrowUpRight, Check, Flame, LockKeyhole, Map, MicVocal, Trophy, Zap } from 'lucide-react';
import { theme } from '../app/theme';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { Eyebrow, Intro, Title } from '../components/ui';
import { achievements } from '../data/achievements';
import { levelNames, lyrics } from '../data/lyrics';
import type { Progress } from '../types/game';

const tiles = css({
  display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10,
  '@media (max-width: 880px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
});

const tile = css({
  minWidth: 0, minHeight: 120, padding: 'clamp(10px, 2vw, 17px)', border: `1px solid ${theme.colors.border}`,
  borderRadius: 9, background: theme.colors.surface, textAlign: 'left', color: theme.colors.text,
});

export function LevelMap({ progress, openLevel, openFinal, openVictory }: {
  progress: Progress; openLevel: (index: number) => void; openFinal: () => void; openVictory: () => void;
}) {
  const { completed, correct, attempts, xp, run, finished } = progress;
  const finalOpen = completed === lyrics.length;
  const earned = achievements.filter((achievement) => achievement.earned(progress)).length;

  return (
    <>
      <Eyebrow><Map size={14} /> ПУТЬ РЕПЕРКИ</Eyebrow>
      <Title>Карта баттла</Title>
      <Intro>Восемь выходов на сцену. Каждый пройденный уровень открывает следующий.</Intro>
      <div css={css({ margin: '24px 0 16px', maxWidth: 480 })}>
        <p css={css({ font: `800 12px ${theme.fonts.mono}`, color: theme.colors.lime, marginBottom: 8 })}>ПРОЙДЕНО {completed} / {lyrics.length}</p>
        <ProgressBar value={completed} max={lyrics.length} label="Пройденные уровни" />
      </div>
      <div css={tiles}>
        {levelNames.map((name, index) => {
          const cleared = index < completed;
          const locked = index > completed;
          const current = run?.level === index;
          const status = current ? 'Продолжить' : cleared ? 'Повторить' : locked ? 'Закрыто' : 'Доступно';
          return (
            <button type="button" key={name} disabled={locked} onClick={() => openLevel(index)} css={[tile, css({
              cursor: locked ? 'default' : 'pointer',
              opacity: locked ? .72 : 1,
              borderColor: current || index === completed ? theme.colors.lime : theme.colors.border,
              '&:hover:not(:disabled)': { background: theme.colors.raised, borderColor: theme.colors.lime },
            })]}>
              <span css={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, color: locked ? theme.colors.muted : theme.colors.lime })}>
                <strong css={css({ font: `900 23px ${theme.fonts.mono}` })}>{String(index + 1).padStart(2, '0')}</strong>
                {cleared ? <Check size={18} /> : locked ? <LockKeyhole size={16} /> : <MicVocal size={18} />}
              </span>
              <strong css={css({ display: 'block', lineHeight: 1.25, marginTop: 8, overflowWrap: 'anywhere' })}>{name}</strong>
              <span css={css({ color: theme.colors.muted, fontSize: 12 })}>{status}</span>
            </button>
          );
        })}
      </div>
      <section css={[tile, css({
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap',
        marginTop: 12, background: 'linear-gradient(110deg, #271939, #18181e 75%)',
        borderColor: finalOpen ? theme.colors.purple : theme.colors.border,
      })]}>
        <div>
          <Eyebrow css={css({ color: '#c5a5ff' })}><Flame size={16} /> ПОСЛЕДНЕЕ ИСПЫТАНИЕ</Eyebrow>
          <h2 css={css({ fontSize: 22, fontWeight: 900 })}>Финальный раунд</h2>
          <p css={css({ color: theme.colors.muted, fontSize: 13 })}>{finalOpen ? 'Восемь строк и последнее слово.' : 'Откроется после восьмого уровня.'}</p>
        </div>
        <div css={css({ display: 'flex', flexWrap: 'wrap', gap: 8 })}>
          <Button type="button" disabled={!finalOpen} onClick={openFinal}>
            {finalOpen ? <ArrowUpRight size={16} /> : <LockKeyhole size={16} />}
            {finished ? 'ПОВТОРИТЬ ФИНАЛ' : 'ОТКРЫТЬ ФИНАЛ'}
          </Button>
          {finished && <Button type="button" variant="secondary" onClick={openVictory}><Trophy size={16} /> ЗАЛ СЛАВЫ</Button>}
        </div>
      </section>
      <section css={css({ marginTop: 34 })}>
        <Eyebrow><Trophy size={14} /> ДОСТИЖЕНИЯ · {earned} / {achievements.length}</Eyebrow>
        <div css={css({ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))', gap: 8, marginTop: 12 })}>
          {achievements.map((achievement) => {
            const unlocked = achievement.earned(progress);
            return (
              <div key={achievement.name} css={[tile, css({ minHeight: 0, display: 'flex', alignItems: 'flex-start', gap: 9 })]}>
                {unlocked ? <Trophy aria-label="Получено" size={16} color={theme.colors.lime} css={css({ flexShrink: 0 })} />
                  : <LockKeyhole aria-label="Закрыто" size={16} color={theme.colors.muted} css={css({ flexShrink: 0 })} />}
                <div><h3 css={css({ fontSize: 13, lineHeight: 1.3 })}>{achievement.name}</h3>
                  <p css={css({ color: theme.colors.muted, fontSize: 11, marginTop: 5 })}>{achievement.goal}</p></div>
              </div>
            );
          })}
        </div>
      </section>
      <div css={css({ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 20, color: theme.colors.muted, font: `800 12px ${theme.fonts.mono}` })}>
        <Zap size={15} color={theme.colors.lime} /> {xp} XP · ВЕРНО {correct} · ПОПЫТОК {attempts}
      </div>
    </>
  );
}
