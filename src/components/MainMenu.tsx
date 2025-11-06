import React from 'react';
import { GameMode } from '../types';
import { playClickSound } from '../utils/sound';

interface MainMenuProps {
  onSelectMode: (mode: GameMode) => void;
  onViewStats: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onSelectMode,
  onViewStats,
  soundEnabled,
  onToggleSound,
}) => {
  const handleModeSelect = (mode: GameMode) => {
    if (soundEnabled) playClickSound();
    onSelectMode(mode);
  };

  const handleStatsClick = () => {
    if (soundEnabled) playClickSound();
    onViewStats();
  };

  const handleSoundToggle = () => {
    playClickSound();
    onToggleSound();
  };

  return (
    <div className="main-menu">
      <div className="main-menu-container">
        <h1 className="game-title">
          <span className="title-emoji">💧</span>
          <span className="title-text">구구단 산성비</span>
          <span className="title-emoji">💧</span>
        </h1>
        
        <p className="game-subtitle">재미있게 배우는 곱셈구구!</p>

        <div className="menu-buttons">
          <button
            className="menu-button practice"
            onClick={() => handleModeSelect('practice')}
          >
            <div className="button-icon">📚</div>
            <div className="button-content">
              <div className="button-title">연습 모드</div>
              <div className="button-description">원하는 단을 골라서 연습해요</div>
            </div>
          </button>

          <button
            className="menu-button challenge"
            onClick={() => handleModeSelect('challenge')}
          >
            <div className="button-icon">🎯</div>
            <div className="button-content">
              <div className="button-title">도전 모드</div>
              <div className="button-description">모든 단을 섞어서 도전!</div>
            </div>
          </button>

          <button
            className="menu-button time-attack"
            onClick={() => handleModeSelect('timeAttack')}
          >
            <div className="button-icon">⏱️</div>
            <div className="button-content">
              <div className="button-title">시간 도전</div>
              <div className="button-description">제한 시간 안에 최대한 많이!</div>
            </div>
          </button>

          <button
            className="menu-button stats"
            onClick={handleStatsClick}
          >
            <div className="button-icon">📊</div>
            <div className="button-content">
              <div className="button-title">학습 현황</div>
              <div className="button-description">내 실력을 확인해요</div>
            </div>
          </button>
        </div>

        <div className="menu-footer">
          <button
            className={`sound-toggle ${soundEnabled ? 'enabled' : 'disabled'}`}
            onClick={handleSoundToggle}
            title={soundEnabled ? '소리 끄기' : '소리 켜기'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>

        <div className="character-animation">
          <div className="character">🎈</div>
        </div>
      </div>
    </div>
  );
};

