// 게임 모드
export type GameMode = 'practice' | 'challenge' | 'timeAttack' | null;

// 난이도 레벨
export type DifficultyLevel = 'easy' | 'normal' | 'hard';

// 물방울 (떨어지는 문제)
export interface Droplet {
  id: string;
  multiplicand: number; // 피승수
  multiplier: number; // 승수
  answer: number; // 정답
  x: number; // x 좌표 (%)
  y: number; // y 좌표 (%)
  speed: number; // 낙하 속도
  difficulty: DifficultyLevel;
}

// 정답 바구니
export interface Basket {
  id: string;
  value: number;
  isCorrect: boolean;
}

// 게임 상태
export interface GameState {
  mode: GameMode;
  score: number;
  lives: number;
  level: number;
  combo: number;
  maxCombo: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeRemaining?: number; // 시간 도전 모드용
  selectedTables: number[]; // 연습 모드용 (선택된 구구단)
  isPaused: boolean;
  isGameOver: boolean;
}

// 게임 설정
export interface GameSettings {
  mode: GameMode;
  selectedTables?: number[]; // 연습 모드: 선택된 단
  speed?: 'slow' | 'normal' | 'fast'; // 연습 모드: 속도 조절
  timeLimit?: 60 | 120; // 시간 도전 모드: 제한 시간
  soundEnabled: boolean;
  musicEnabled: boolean;
}

// 학습 통계
export interface LearningStats {
  totalGames: number;
  totalCorrect: number;
  totalWrong: number;
  highScore: number;
  tableStats: {
    [key: number]: {
      correct: number;
      wrong: number;
      accuracy: number;
    };
  };
  badges: string[];
  lastPlayedDate: string;
}

// 배지
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

// 게임 결과
export interface GameResult {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  maxCombo: number;
  accuracy: number;
  stars: number; // 1-3
  newBadges: string[];
  isNewHighScore: boolean;
}

