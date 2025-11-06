import React, { useEffect, useState } from 'react';
import { GameResult as GameResultType } from '../types';
import { STORAGE_KEYS, BADGES } from '../constants';
import { loadStats, checkNewBadges } from '../utils/gameLogic';
import { playClickSound } from '../utils/sound';

interface GameResultProps {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  maxCombo: number;
  onRestart: () => void;
  onMainMenu: () => void;
  soundEnabled: boolean;
}

export const GameResult: React.FC<GameResultProps> = ({
  score,
  correctAnswers,
  wrongAnswers,
  maxCombo,
  onRestart,
  onMainMenu,
  soundEnabled,
}) => {
  const [result, setResult] = useState<GameResultType | null>(null);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    const stats = loadStats(STORAGE_KEYS.STATS);
    const accuracy = correctAnswers + wrongAnswers > 0
      ? Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100)
      : 0;
    
    const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;
    const isNewHighScore = score > stats.highScore;
    
    // 새 배지 체크
    const currentBadges = stats.badges || [];
    const resultData: GameResultType = {
      score,
      correctAnswers,
      wrongAnswers,
      maxCombo,
      accuracy,
      stars,
      isNewHighScore,
      newBadges: [],
    };
    
    const newBadges = checkNewBadges(currentBadges, stats, resultData);
    resultData.newBadges = newBadges;
    
    setResult(resultData);
    
    if (newBadges.length > 0) {
      setTimeout(() => setShowBadges(true), 1000);
    }
  }, [score, correctAnswers, wrongAnswers, maxCombo]);

  const handleRestart = () => {
    if (soundEnabled) playClickSound();
    onRestart();
  };

  const handleMainMenu = () => {
    if (soundEnabled) playClickSound();
    onMainMenu();
  };

  if (!result) return null;

  return (
    <div className="game-result">
      <div className="result-container">
        <h2 className="result-title">게임 종료!</h2>

        {result.isNewHighScore && (
          <div className="new-record">
            <span className="crown">👑</span>
            <span>신기록 달성!</span>
            <span className="crown">👑</span>
          </div>
        )}

        <div className="stars">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={`star ${i < result.stars ? 'filled' : ''}`}>
              ⭐
            </span>
          ))}
        </div>

        <div className="result-score">
          <div className="score-value">{result.score}</div>
          <div className="score-label">점수</div>
        </div>

        <div className="result-stats">
          <div className="result-stat">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-value">{result.correctAnswers}</div>
              <div className="stat-label">정답</div>
            </div>
          </div>

          <div className="result-stat">
            <div className="stat-icon">❌</div>
            <div className="stat-info">
              <div className="stat-value">{result.wrongAnswers}</div>
              <div className="stat-label">오답</div>
            </div>
          </div>

          <div className="result-stat">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <div className="stat-value">{result.maxCombo}</div>
              <div className="stat-label">최대 콤보</div>
            </div>
          </div>

          <div className="result-stat">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-value">{result.accuracy}%</div>
              <div className="stat-label">정답률</div>
            </div>
          </div>
        </div>

        {showBadges && result.newBadges.length > 0 && (
          <div className="new-badges">
            <h3>🎉 새로운 배지를 획득했어요!</h3>
            <div className="badges-list">
              {result.newBadges.map(badgeId => {
                const badge = BADGES.find(b => b.id === badgeId);
                return badge ? (
                  <div key={badgeId} className="new-badge">
                    <div className="badge-icon-large">{badge.icon}</div>
                    <div className="badge-name">{badge.name}</div>
                    <div className="badge-description">{badge.description}</div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div className="result-actions">
          <button className="result-button secondary" onClick={handleMainMenu}>
            메인 메뉴
          </button>
          <button className="result-button primary" onClick={handleRestart}>
            다시 하기 🔄
          </button>
        </div>

        <div className="encouragement">
          {result.accuracy >= 90 && <p>완벽해요! 정말 잘했어요! 🎉</p>}
          {result.accuracy >= 70 && result.accuracy < 90 && <p>잘했어요! 조금만 더 연습하면 완벽해질 거예요! 💪</p>}
          {result.accuracy < 70 && <p>좋아요! 계속 연습하면 더 잘할 수 있어요! 화이팅! 🌟</p>}
        </div>
      </div>
    </div>
  );
};

