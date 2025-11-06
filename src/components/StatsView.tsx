import React, { useEffect, useState } from 'react';
import { LearningStats } from '../types';
import { STORAGE_KEYS, BADGES, MULTIPLICATION_TABLES } from '../constants';
import { loadStats } from '../utils/gameLogic';
import { playClickSound } from '../utils/sound';

interface StatsViewProps {
  onBack: () => void;
  soundEnabled: boolean;
}

export const StatsView: React.FC<StatsViewProps> = ({ onBack, soundEnabled }) => {
  const [stats, setStats] = useState<LearningStats | null>(null);

  useEffect(() => {
    const loadedStats = loadStats(STORAGE_KEYS.STATS);
    setStats(loadedStats);
  }, []);

  const handleBack = () => {
    if (soundEnabled) playClickSound();
    onBack();
  };

  if (!stats) return null;

  const totalProblems = stats.totalCorrect + stats.totalWrong;
  const overallAccuracy = totalProblems > 0
    ? Math.round((stats.totalCorrect / totalProblems) * 100)
    : 0;

  const unlockedBadges = BADGES.filter(badge => stats.badges?.includes(badge.id));

  return (
    <div className="stats-view">
      <div className="stats-container">
        <h2 className="stats-title">📊 학습 현황</h2>

        <div className="stats-grid">
          <div className="stat-card highlight">
            <div className="stat-value">{stats.highScore}</div>
            <div className="stat-label">최고 점수</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalGames}</div>
            <div className="stat-label">총 게임 수</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalCorrect}</div>
            <div className="stat-label">정답 개수</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{overallAccuracy}%</div>
            <div className="stat-label">전체 정답률</div>
          </div>
        </div>

        <div className="stats-section">
          <h3>단별 정답률</h3>
          <div className="table-stats">
            {Array.from(MULTIPLICATION_TABLES).map(table => {
              const tableStat = stats.tableStats[table];
              const accuracy = tableStat?.accuracy || 0;
              const total = tableStat ? tableStat.correct + tableStat.wrong : 0;
              
              return (
                <div key={table} className="table-stat-item">
                  <div className="table-stat-header">
                    <span className="table-stat-name">{table}단</span>
                    <span className="table-stat-accuracy">{accuracy}%</span>
                  </div>
                  <div className="table-stat-bar">
                    <div
                      className="table-stat-fill"
                      style={{
                        width: `${accuracy}%`,
                        backgroundColor: accuracy >= 80 ? '#4CAF50' : accuracy >= 60 ? '#FF9800' : '#F44336'
                      }}
                    />
                  </div>
                  <div className="table-stat-details">
                    {total > 0 ? (
                      <span>{tableStat.correct}개 정답 / {total}개 풀이</span>
                    ) : (
                      <span className="no-data">아직 풀지 않음</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stats-section">
          <h3>획득한 배지</h3>
          {unlockedBadges.length > 0 ? (
            <div className="badges-grid">
              {unlockedBadges.map(badge => (
                <div key={badge.id} className="badge-item unlocked">
                  <div className="badge-icon">{badge.icon}</div>
                  <div className="badge-name">{badge.name}</div>
                  <div className="badge-description">{badge.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-badges">
              <p>아직 획득한 배지가 없어요!</p>
              <p>게임을 플레이하고 배지를 모아보세요 🏅</p>
            </div>
          )}
          
          {unlockedBadges.length < BADGES.length && (
            <details className="locked-badges">
              <summary>잠긴 배지 보기 ({BADGES.length - unlockedBadges.length}개)</summary>
              <div className="badges-grid">
                {BADGES.filter(badge => !stats.badges?.includes(badge.id)).map(badge => (
                  <div key={badge.id} className="badge-item locked">
                    <div className="badge-icon">🔒</div>
                    <div className="badge-name">{badge.name}</div>
                    <div className="badge-description">{badge.description}</div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>

        <button className="back-button" onClick={handleBack}>
          ← 메인으로 돌아가기
        </button>
      </div>
    </div>
  );
};

