import { Droplet, Basket, DifficultyLevel, GameResult, LearningStats } from '../types';
import { GAME_CONFIG, DIFFICULTY_TABLES, MULTIPLICATION_TABLES } from '../constants';

/**
 * 랜덤한 곱셈 문제 생성
 */
export const generateMultiplicationProblem = (
  selectedTables?: number[]
): { multiplicand: number; multiplier: number; answer: number; difficulty: DifficultyLevel } => {
  const tables = selectedTables && selectedTables.length > 0 
    ? selectedTables 
    : Array.from(MULTIPLICATION_TABLES);
  
  const multiplicand = tables[Math.floor(Math.random() * tables.length)];
  const multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
  const answer = multiplicand * multiplier;
  
  // 난이도 결정
  let difficulty: DifficultyLevel = 'normal';
  if (DIFFICULTY_TABLES.easy.includes(multiplicand)) {
    difficulty = 'easy';
  } else if (DIFFICULTY_TABLES.hard.includes(multiplicand)) {
    difficulty = 'hard';
  }
  
  return { multiplicand, multiplier, answer, difficulty };
};

/**
 * 새로운 물방울 생성
 */
export const createDroplet = (
  level: number,
  speedMultiplier: number = 1,
  selectedTables?: number[]
): Droplet => {
  const { multiplicand, multiplier, answer, difficulty } = generateMultiplicationProblem(selectedTables);
  
  // 랜덤한 x 위치 (10% ~ 90%)
  const x = Math.random() * 80 + 10;
  
  // 레벨에 따른 속도 증가
  const speed = (GAME_CONFIG.BASE_FALL_SPEED + (level - 1) * GAME_CONFIG.SPEED_INCREASE_PER_LEVEL) * speedMultiplier;
  
  return {
    id: `droplet-${Date.now()}-${Math.random()}`,
    multiplicand,
    multiplier,
    answer,
    x,
    y: -10, // 화면 위에서 시작
    speed,
    difficulty,
  };
};

/**
 * 오답 생성 (정답과 유사하지만 다른 숫자들)
 */
export const generateWrongAnswers = (correctAnswer: number, count: number): number[] => {
  const wrongAnswers = new Set<number>();
  const allPossibleAnswers = MULTIPLICATION_TABLES.flatMap(table => 
    Array.from({ length: 9 }, (_, i) => table * (i + 1))
  );
  
  while (wrongAnswers.size < count) {
    const strategy = Math.random();
    
    if (strategy < 0.4) {
      // 전략 1: 정답 ± 1-10
      const offset = Math.floor(Math.random() * 10) + 1;
      const value = Math.random() > 0.5 ? correctAnswer + offset : correctAnswer - offset;
      if (value > 0 && value !== correctAnswer && value <= 81) {
        wrongAnswers.add(value);
      }
    } else if (strategy < 0.8) {
      // 전략 2: 다른 단의 정답
      const randomAnswer = allPossibleAnswers[Math.floor(Math.random() * allPossibleAnswers.length)];
      if (randomAnswer !== correctAnswer) {
        wrongAnswers.add(randomAnswer);
      }
    } else {
      // 전략 3: 완전 랜덤 (1-81)
      const value = Math.floor(Math.random() * 81) + 1;
      if (value !== correctAnswer) {
        wrongAnswers.add(value);
      }
    }
  }
  
  return Array.from(wrongAnswers);
};

/**
 * 바구니 생성 (정답 1개 + 오답들)
 */
export const createBaskets = (correctAnswer: number): Basket[] => {
  const basketCount = GAME_CONFIG.BASKET_COUNT;
  const wrongAnswers = generateWrongAnswers(correctAnswer, basketCount - 1);
  
  const baskets: Basket[] = [
    { id: `basket-correct`, value: correctAnswer, isCorrect: true },
    ...wrongAnswers.map((value, index) => ({
      id: `basket-wrong-${index}`,
      value,
      isCorrect: false,
    })),
  ];
  
  // 무작위로 섞기
  return baskets.sort(() => Math.random() - 0.5);
};

/**
 * 콤보 보너스 계산
 */
export const calculateComboMultiplier = (combo: number): number => {
  if (combo >= 10) return GAME_CONFIG.COMBO_MULTIPLIER_2;
  if (combo >= 5) return GAME_CONFIG.COMBO_MULTIPLIER_1;
  return 1.0;
};

/**
 * 점수 계산
 */
export const calculateScore = (basePoints: number, combo: number, speedBonus: number = 0): number => {
  const comboMultiplier = calculateComboMultiplier(combo);
  return Math.floor(basePoints * comboMultiplier + speedBonus);
};

/**
 * 게임 결과의 별점 계산 (1-3)
 */
export const calculateStars = (accuracy: number): number => {
  if (accuracy >= 90) return 3;
  if (accuracy >= 70) return 2;
  return 1;
};

/**
 * 정답률 계산
 */
export const calculateAccuracy = (correct: number, wrong: number): number => {
  const total = correct + wrong;
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

/**
 * 게임 결과 생성
 */
export const createGameResult = (
  score: number,
  correctAnswers: number,
  wrongAnswers: number,
  maxCombo: number,
  highScore: number
): GameResult => {
  const accuracy = calculateAccuracy(correctAnswers, wrongAnswers);
  const stars = calculateStars(accuracy);
  const isNewHighScore = score > highScore;
  
  return {
    score,
    correctAnswers,
    wrongAnswers,
    maxCombo,
    accuracy,
    stars,
    newBadges: [], // 배지는 별도로 체크
    isNewHighScore,
  };
};

/**
 * 로컬 스토리지에서 통계 로드
 */
export const loadStats = (storageKey: string): LearningStats => {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
  
  // 기본 통계
  return {
    totalGames: 0,
    totalCorrect: 0,
    totalWrong: 0,
    highScore: 0,
    tableStats: {},
    badges: [],
    lastPlayedDate: new Date().toISOString(),
  };
};

/**
 * 로컬 스토리지에 통계 저장
 */
export const saveStats = (storageKey: string, stats: LearningStats): void => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save stats:', error);
  }
};

/**
 * 통계 업데이트
 */
export const updateStats = (
  currentStats: LearningStats,
  gameResult: GameResult,
  problems: Array<{ table: number; correct: boolean }>
): LearningStats => {
  const newStats = { ...currentStats };
  
  newStats.totalGames += 1;
  newStats.totalCorrect += gameResult.correctAnswers;
  newStats.totalWrong += gameResult.wrongAnswers;
  newStats.highScore = Math.max(newStats.highScore, gameResult.score);
  newStats.lastPlayedDate = new Date().toISOString();
  
  // 단별 통계 업데이트
  problems.forEach(({ table, correct }) => {
    if (!newStats.tableStats[table]) {
      newStats.tableStats[table] = { correct: 0, wrong: 0, accuracy: 0 };
    }
    
    if (correct) {
      newStats.tableStats[table].correct += 1;
    } else {
      newStats.tableStats[table].wrong += 1;
    }
    
    const total = newStats.tableStats[table].correct + newStats.tableStats[table].wrong;
    newStats.tableStats[table].accuracy = Math.round((newStats.tableStats[table].correct / total) * 100);
  });
  
  return newStats;
};

/**
 * 속도 설정에 따른 배수 반환
 */
export const getSpeedMultiplier = (speed: 'slow' | 'normal' | 'fast'): number => {
  switch (speed) {
    case 'slow':
      return GAME_CONFIG.SPEED_MULTIPLIER_SLOW;
    case 'fast':
      return GAME_CONFIG.SPEED_MULTIPLIER_FAST;
    default:
      return GAME_CONFIG.SPEED_MULTIPLIER_NORMAL;
  }
};

/**
 * 배지 체크 (새로 획득한 배지 반환)
 */
export const checkNewBadges = (
  currentBadges: string[],
  stats: LearningStats,
  gameResult: GameResult
): string[] => {
  const newBadges: string[] = [];
  
  // 고득점자
  if (!currentBadges.includes('high_scorer') && gameResult.score >= 1000) {
    newBadges.push('high_scorer');
  }
  
  // 콤보왕
  if (!currentBadges.includes('combo_king') && gameResult.maxCombo >= 15) {
    newBadges.push('combo_king');
  }
  
  // 완벽한 게임
  if (!currentBadges.includes('perfect_game') && gameResult.wrongAnswers === 0 && gameResult.correctAnswers >= 10) {
    newBadges.push('perfect_game');
  }
  
  // 백점 클럽
  if (!currentBadges.includes('hundred_club') && stats.totalCorrect >= 100) {
    newBadges.push('hundred_club');
  }
  
  // 각 단 마스터 체크
  MULTIPLICATION_TABLES.forEach(table => {
    const badgeId = `master_${table}`;
    if (!currentBadges.includes(badgeId) && stats.tableStats[table]?.correct >= 20) {
      newBadges.push(badgeId);
    }
  });
  
  return newBadges;
};

