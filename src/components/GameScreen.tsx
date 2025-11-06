import React from 'react';
import { GameState, Droplet, Basket } from '../types';
import { COLORS } from '../constants';

interface GameScreenProps {
  gameState: GameState;
  droplets: Droplet[];
  baskets: Basket[];
  currentDroplet: Droplet | null;
  onAnswerSelect: (value: number) => void;
  onPause: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  gameState,
  droplets,
  baskets,
  currentDroplet,
  onAnswerSelect,
  onPause,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-screen">
      {/* 상단 UI */}
      <div className="game-header">
        <button className="pause-button" onClick={onPause} title="일시정지">
          {gameState.isPaused ? '▶️' : '⏸️'}
        </button>
        
        <div className="game-info">
          <div className="info-item score">
            <span className="info-label">점수</span>
            <span className="info-value">{gameState.score}</span>
          </div>
          
          {gameState.mode === 'challenge' && (
            <div className="info-item level">
              <span className="info-label">레벨</span>
              <span className="info-value">{gameState.level}</span>
            </div>
          )}
          
          <div className="info-item combo">
            <span className="info-label">콤보</span>
            <span className="info-value combo-value">{gameState.combo} 🔥</span>
          </div>

          {gameState.mode === 'timeAttack' && (
            <div className="info-item timer">
              <span className="info-label">⏱️</span>
              <span className="info-value">{formatTime(gameState.timeRemaining || 0)}</span>
            </div>
          )}
        </div>

        {gameState.mode !== 'practice' && gameState.mode !== 'timeAttack' && (
          <div className="lives">
            {Array.from({ length: gameState.lives }).map((_, i) => (
              <span key={i} className="heart">❤️</span>
            ))}
          </div>
        )}
      </div>

      {/* 게임 영역 */}
      <div className="game-area">
        {/* 물방울들 */}
        {droplets.map(droplet => (
          <div
            key={droplet.id}
            className={`droplet ${droplet.difficulty}`}
            style={{
              left: `${droplet.x}%`,
              top: `${droplet.y}%`,
              backgroundColor: COLORS[droplet.difficulty],
            }}
          >
            <div className="droplet-content">
              {droplet.multiplicand} × {droplet.multiplier}
            </div>
          </div>
        ))}

        {/* 현재 문제 강조 표시 */}
        {currentDroplet && (
          <div className="current-problem">
            <div className="problem-text">
              {currentDroplet.multiplicand} × {currentDroplet.multiplier} = ?
            </div>
          </div>
        )}
      </div>

      {/* 바구니들 */}
      <div className="baskets-container">
        {baskets.map(basket => (
          <button
            key={basket.id}
            className="basket"
            onClick={() => onAnswerSelect(basket.value)}
            disabled={gameState.isPaused}
          >
            <div className="basket-icon">🧺</div>
            <div className="basket-value">{basket.value}</div>
          </button>
        ))}
      </div>

      {/* 일시정지 오버레이 */}
      {gameState.isPaused && !gameState.isGameOver && (
        <div className="pause-overlay">
          <div className="pause-content">
            <h2>⏸️ 일시정지</h2>
            <p>계속하려면 일시정지 버튼을 누르세요</p>
          </div>
        </div>
      )}
    </div>
  );
};

