import React, { useState } from 'react';
import { GameMode } from './types';
import { MainMenu } from './components/MainMenu';
import { ModeSelector } from './components/ModeSelector';
import { GameScreen } from './components/GameScreen';
import { GameResult } from './components/GameResult';
import { StatsView } from './components/StatsView';
import { useGameState } from './hooks/useGameState';
import './App.css';

type AppScreen = 'menu' | 'modeSelect' | 'game' | 'result' | 'stats';

function App() {
  const [screen, setScreen] = useState<AppScreen>('menu');
  const [selectedMode, setSelectedMode] = useState<GameMode>(null);
  
  const {
    gameState,
    droplets,
    baskets,
    currentDroplet,
    soundEnabled,
    setSoundEnabled,
    startGame,
    checkAnswer,
    togglePause,
  } = useGameState();

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
    
    if (mode === 'challenge') {
      // 도전 모드는 바로 시작
      startGame('challenge');
      setScreen('game');
    } else {
      // 연습/시간도전 모드는 설정 화면으로
      setScreen('modeSelect');
    }
  };

  const handleGameStart = (config: {
    selectedTables?: number[];
    speed?: 'slow' | 'normal' | 'fast';
    timeLimit?: 60 | 120;
  }) => {
    if (selectedMode === 'practice') {
      startGame('practice', config.selectedTables, config.speed);
    } else if (selectedMode === 'timeAttack') {
      startGame('timeAttack', undefined, undefined, config.timeLimit);
    }
    setScreen('game');
  };

  const handleGameEnd = React.useCallback(() => {
    setScreen('result');
  }, []);

  const handleRestart = React.useCallback(() => {
    // 같은 모드로 다시 시작
    if (selectedMode === 'challenge') {
      startGame('challenge');
      setScreen('game');
    } else {
      setScreen('modeSelect');
    }
  }, [selectedMode, startGame]);

  const handleMainMenu = React.useCallback(() => {
    setScreen('menu');
    setSelectedMode(null);
  }, []);

  const handleViewStats = React.useCallback(() => {
    setScreen('stats');
  }, []);

  // 게임 오버 처리
  React.useEffect(() => {
    if (gameState.isGameOver && screen === 'game') {
      setTimeout(handleGameEnd, 500);
    }
  }, [gameState.isGameOver, screen, handleGameEnd]);

  return (
    <div className="app">
      {screen === 'menu' && (
        <MainMenu
          onSelectMode={handleModeSelect}
          onViewStats={handleViewStats}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
      )}

      {screen === 'modeSelect' && (
        <ModeSelector
          mode={selectedMode as 'practice' | 'timeAttack'}
          onStart={handleGameStart}
          onBack={handleMainMenu}
          soundEnabled={soundEnabled}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          gameState={gameState}
          droplets={droplets}
          baskets={baskets}
          currentDroplet={currentDroplet}
          onAnswerSelect={checkAnswer}
          onPause={togglePause}
        />
      )}

      {screen === 'result' && (
        <GameResult
          score={gameState.score}
          correctAnswers={gameState.correctAnswers}
          wrongAnswers={gameState.wrongAnswers}
          maxCombo={gameState.maxCombo}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
          soundEnabled={soundEnabled}
        />
      )}

      {screen === 'stats' && (
        <StatsView
          onBack={handleMainMenu}
          soundEnabled={soundEnabled}
        />
      )}
    </div>
  );
}

export default App;

