// 게임 상수
export const GAME_CONFIG = {
  INITIAL_LIVES: 5,
  POINTS_PER_ANSWER: 10,
  COMBO_MULTIPLIER_1: 1.5, // 5연속 이상
  COMBO_MULTIPLIER_2: 2.0, // 10연속 이상
  SPEED_MULTIPLIER_SLOW: 0.6,
  SPEED_MULTIPLIER_NORMAL: 1.0,
  SPEED_MULTIPLIER_FAST: 1.5,
  BASE_FALL_SPEED: 1, // 초당 픽셀
  SPEED_INCREASE_PER_LEVEL: 0.2,
  DROPLET_SPAWN_INTERVAL: 2000, // ms
  MAX_DROPLETS_ON_SCREEN: 5,
  BASKET_COUNT: 5,
  LEVEL_UP_THRESHOLD: 10, // 10문제마다 레벨업
} as const;

// 구구단 범위
export const MULTIPLICATION_TABLES = [2, 3, 4, 5, 6, 7, 8, 9] as const;

// 난이도별 단 분류
export const DIFFICULTY_TABLES = {
  easy: [2, 3, 4],
  normal: [5, 6, 7],
  hard: [8, 9],
} as const;

// 색상 테마
export const COLORS = {
  easy: '#81C784', // 초록색
  normal: '#64B5F6', // 파란색
  hard: '#BA68C8', // 보라색
  primary: '#FF6B9D',
  secondary: '#FEC5BB',
  background: '#FFF8F3',
  text: '#333333',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
} as const;

// 배지 정의
export const BADGES = [
  { id: 'master_2', name: '2단 마스터', description: '2단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'master_3', name: '3단 마스터', description: '3단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'master_4', name: '4단 마스터', description: '4단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'master_5', name: '5단 마스터', description: '5단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'master_6', name: '6단 마스터', description: '6단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'master_7', name: '7단 마스터', description: '7단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'master_8', name: '8단 마스터', description: '8단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'master_9', name: '9단 마스터', description: '9단 문제 20개 연속 정답', icon: '🏅' },
  { id: 'combo_king', name: '콤보왕', description: '15 콤보 달성', icon: '🔥' },
  { id: 'perfect_game', name: '완벽한 게임', description: '한 게임에서 실수 없이 완료', icon: '⭐' },
  { id: 'speed_demon', name: '빠른 손가락', description: '60초에 30문제 정답', icon: '⚡' },
  { id: 'hundred_club', name: '백점 클럽', description: '100문제 정답 달성', icon: '💯' },
  { id: 'persistent', name: '꾸준한 학습자', description: '7일 연속 플레이', icon: '📚' },
  { id: 'high_scorer', name: '고득점자', description: '1000점 이상 획득', icon: '👑' },
  { id: 'all_rounder', name: '올라운더', description: '모든 단에서 90% 이상 정답률', icon: '🌟' },
] as const;

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  HIGH_SCORE: 'multiplicationRain_highScore',
  STATS: 'multiplicationRain_stats',
  SETTINGS: 'multiplicationRain_settings',
  BADGES: 'multiplicationRain_badges',
} as const;

