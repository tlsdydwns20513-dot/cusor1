import React, { useState } from 'react';
import { MULTIPLICATION_TABLES } from '../constants';
import { playClickSound } from '../utils/sound';

interface ModeSelectorProps {
  mode: 'practice' | 'timeAttack';
  onStart: (config: {
    selectedTables?: number[];
    speed?: 'slow' | 'normal' | 'fast';
    timeLimit?: 60 | 120;
  }) => void;
  onBack: () => void;
  soundEnabled: boolean;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  onStart,
  onBack,
  soundEnabled,
}) => {
  const [selectedTables, setSelectedTables] = useState<number[]>([2, 3]);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [timeLimit, setTimeLimit] = useState<60 | 120>(60);

  const handleTableToggle = (table: number) => {
    if (soundEnabled) playClickSound();
    setSelectedTables(prev =>
      prev.includes(table)
        ? prev.filter(t => t !== table)
        : [...prev, table]
    );
  };

  const handleSelectAll = () => {
    if (soundEnabled) playClickSound();
    setSelectedTables(Array.from(MULTIPLICATION_TABLES));
  };

  const handleDeselectAll = () => {
    if (soundEnabled) playClickSound();
    setSelectedTables([]);
  };

  const handleStart = () => {
    if (soundEnabled) playClickSound();
    
    if (mode === 'practice') {
      if (selectedTables.length === 0) {
        alert('최소 1개 이상의 단을 선택해주세요!');
        return;
      }
      onStart({ selectedTables, speed });
    } else {
      onStart({ timeLimit });
    }
  };

  const handleBack = () => {
    if (soundEnabled) playClickSound();
    onBack();
  };

  return (
    <div className="mode-selector">
      <div className="mode-selector-container">
        <h2 className="mode-title">
          {mode === 'practice' ? '📚 연습 모드 설정' : '⏱️ 시간 도전 설정'}
        </h2>

        {mode === 'practice' ? (
          <>
            <div className="setting-section">
              <h3>구구단 선택</h3>
              <div className="table-selection">
                {Array.from(MULTIPLICATION_TABLES).map(table => (
                  <button
                    key={table}
                    className={`table-button ${selectedTables.includes(table) ? 'selected' : ''}`}
                    onClick={() => handleTableToggle(table)}
                  >
                    {table}단
                  </button>
                ))}
              </div>
              <div className="table-actions">
                <button className="action-button" onClick={handleSelectAll}>
                  전체 선택
                </button>
                <button className="action-button" onClick={handleDeselectAll}>
                  선택 해제
                </button>
              </div>
            </div>

            <div className="setting-section">
              <h3>낙하 속도</h3>
              <div className="speed-selection">
                <button
                  className={`speed-button ${speed === 'slow' ? 'selected' : ''}`}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setSpeed('slow');
                  }}
                >
                  🐢 느림
                </button>
                <button
                  className={`speed-button ${speed === 'normal' ? 'selected' : ''}`}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setSpeed('normal');
                  }}
                >
                  🚶 보통
                </button>
                <button
                  className={`speed-button ${speed === 'fast' ? 'selected' : ''}`}
                  onClick={() => {
                    if (soundEnabled) playClickSound();
                    setSpeed('fast');
                  }}
                >
                  🏃 빠름
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="setting-section">
            <h3>제한 시간</h3>
            <div className="time-selection">
              <button
                className={`time-button ${timeLimit === 60 ? 'selected' : ''}`}
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setTimeLimit(60);
                }}
              >
                60초
              </button>
              <button
                className={`time-button ${timeLimit === 120 ? 'selected' : ''}`}
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setTimeLimit(120);
                }}
              >
                120초
              </button>
            </div>
          </div>
        )}

        <div className="mode-selector-actions">
          <button className="back-button" onClick={handleBack}>
            ← 뒤로 가기
          </button>
          <button className="start-button" onClick={handleStart}>
            시작하기 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

