import { useEffect, useState } from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { GameLayout } from '../components/GameLayout';
import { lyrics } from '../data/lyrics';
import { useGameProgress } from '../hooks/useGameProgress';
import { FinalBossScreen } from '../screens/FinalBossScreen';
import { LearningScreen } from '../screens/LearningScreen';
import { LevelMap } from '../screens/LevelMap';
import { RulesScreen } from '../screens/RulesScreen';
import { VictoryScreen } from '../screens/VictoryScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { stepRewards } from '../types/game';
import { globalStyles, theme } from './theme';

type Screen = 'welcome' | 'rules' | 'map' | 'level' | 'final' | 'victory';

export function App() {
  const game = useGameProgress();
  const { progress } = game;
  const [screen, setScreen] = useState<Screen>('welcome');
  const [visited, setVisited] = useState(false);
  const hasProgress = Boolean(progress.run || progress.completed || progress.attempts);

  function navigate(next: Screen) {
    setScreen(next);
    setVisited(true);
  }

  useEffect(() => {
    if (!visited) return;
    document.getElementById('main')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [screen, visited]);

  function enterLevel(index: number) {
    game.selectLevel(index);
    navigate('level');
  }

  function openLevel(index: number) {
    if (index === 0 && !hasProgress) navigate('rules');
    else enterLevel(index);
  }

  function start() {
    if (progress.run) openLevel(progress.run.level);
    else if (progress.finished) navigate('victory');
    else if (progress.completed === lyrics.length) navigate('final');
    else openLevel(progress.completed);
  }

  function nextStep() {
    const lastStep = progress.run?.step === stepRewards.length - 1;
    game.advance();
    if (lastStep) navigate('map');
  }

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <GameLayout xp={progress.xp} home={() => navigate('welcome')} showMap={() => navigate('map')}>
        {screen === 'welcome' && <WelcomeScreen hasProgress={hasProgress} start={start} />}
        {screen === 'rules' && <RulesScreen onConfirm={() => enterLevel(0)} />}
        {screen === 'map' && <LevelMap progress={progress} openLevel={openLevel} openFinal={() => navigate('final')} openVictory={() => navigate('victory')} />}
        {screen === 'level' && progress.run && <LearningScreen key={progress.run.level} run={progress.run} compliment={progress.compliment}
          onAnswer={game.answer} next={nextStep} map={() => navigate('map')} />}
        {screen === 'final' && <FinalBossScreen alreadyWon={progress.finished} compliment={progress.compliment} onAnswer={game.answerFinal} onVictory={() => navigate('victory')} />}
        {screen === 'victory' && <VictoryScreen progress={progress} onRespect={game.moreRespect} onReset={() => { game.reset(); navigate('welcome'); }} />}
      </GameLayout>
    </ThemeProvider>
  );
}
