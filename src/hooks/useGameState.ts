import { useState, useCallback, useRef, useEffect } from 'react';
import { GameState, GameMode, Droplet, Basket } from '../types';
import { GAME_CONFIG, STORAGE_KEYS } from '../constants';
import {
  createDroplet,
  createBaskets,
  calculateScore,
  loadStats,
  saveStats,
  updateStats,
  createGameResult,
  checkNewBadges,
  getSpeedMultiplier,
} from '../utils/gameLogic';
import {
  playCorrectSound,
  playWrongSound,
  playLevelUpSound,
  playGameOverSound,
} from '../utils/sound';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    mode: null,
    score: 0,
    lives: GAME_CONFIG.INITIAL_LIVES,
    level: 1,
    combo: 0,
    maxCombo: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    selectedTables: [],
    isPaused: false,
    isGameOver: false,
  });

  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [currentDroplet, setCurrentDroplet] = useState<Droplet | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const problemHistoryRef = useRef<Array<{ table: number; correct: boolean }>>([]);

  /**
   * 게임 시작
   */
  const startGame = useCallback((
    mode: GameMode,
    selectedTables?: number[],
    speed?: 'slow' | 'normal' | 'fast',
    timeLimit?: number
  ) => {
    const speedMultiplier = speed ? getSpeedMultiplier(speed) : 1;
    
    setGameState({
      mode,
      score: 0,
      lives: mode === 'practice' || mode === 'timeAttack' ? 999 : GAME_CONFIG.INITIAL_LIVES,
      level: 1,
      combo: 0,
      maxCombo: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      timeRemaining: timeLimit,
      selectedTables: selectedTables || [],
      isPaused: false,
      isGameOver: false,
    });
    
    setDroplets([]);
    problemHistoryRef.current = [];
    
    // 첫 물방울 생성
    const firstDroplet = createDroplet(1, speedMultiplier, selectedTables);
    setCurrentDroplet(firstDroplet);
    setDroplets([firstDroplet]);
    setBaskets(createBaskets(firstDroplet.answer));
  }, []);

  /**
   * 정답 체크
   */
  const checkAnswer = useCallback((selectedValue: number) => {
    if (!currentDroplet || gameState.isPaused || gameState.isGameOver) return;

    const isCorrect = selectedValue === currentDroplet.answer;
    
    if (isCorrect) {
      // 정답 처리
      if (soundEnabled) playCorrectSound();
      
      const newCombo = gameState.combo + 1;
      const points = calculateScore(GAME_CONFIG.POINTS_PER_ANSWER, newCombo);
      const newCorrectAnswers = gameState.correctAnswers + 1;
      
      // 문제 히스토리 기록
      problemHistoryRef.current.push({
        table: currentDroplet.multiplicand,
        correct: true,
      });
      
      setGameState(prev => ({
        ...prev,
        score: prev.score + points,
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo, newCombo),
        correctAnswers: newCorrectAnswers,
      }));
      
      // 레벨업 체크
      if (newCorrectAnswers % GAME_CONFIG.LEVEL_UP_THRESHOLD === 0 && gameState.mode === 'challenge') {
        if (soundEnabled) playLevelUpSound();
        setGameState(prev => ({ ...prev, level: prev.level + 1 }));
      }
      
      // 현재 물방울 제거
      setDroplets(prev => prev.filter(d => d.id !== currentDroplet.id));
      
      // 다음 물방울 생성
      setTimeout(() => {
        const speedMultiplier = gameState.mode === 'practice' ? 
          getSpeedMultiplier('normal') : 1;
        const newDroplet = createDroplet(
          gameState.level,
          speedMultiplier,
          gameState.selectedTables
        );
        setCurrentDroplet(newDroplet);
        setDroplets(prev => [...prev, newDroplet]);
        setBaskets(createBaskets(newDroplet.answer));
      }, 500);
      
    } else {
      // 오답 처리
      if (soundEnabled) playWrongSound();
      
      problemHistoryRef.current.push({
        table: currentDroplet.multiplicand,
        correct: false,
      });
      
      const newLives = gameState.lives - 1;
      
      setGameState(prev => ({
        ...prev,
        lives: newLives,
        combo: 0,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
      
      // 게임 오버 체크
      if (newLives <= 0 && gameState.mode !== 'practice' && gameState.mode !== 'timeAttack') {
        endGame();
      }
    }
  }, [currentDroplet, gameState, soundEnabled]);

  /**
   * 게임 종료
   */
  const endGame = useCallback(() => {
    if (soundEnabled) playGameOverSound();
    
    setGameState(prev => ({ ...prev, isGameOver: true, isPaused: true }));
    
    // 통계 업데이트
    const stats = loadStats(STORAGE_KEYS.STATS);
    const result = createGameResult(
      gameState.score,
      gameState.correctAnswers,
      gameState.wrongAnswers,
      gameState.maxCombo,
      stats.highScore
    );
    
    const newStats = updateStats(stats, result, problemHistoryRef.current);
    
    // 새 배지 체크
    const currentBadges = loadStats(STORAGE_KEYS.BADGES).badges || [];
    const newBadges = checkNewBadges(currentBadges, newStats, result);
    
    if (newBadges.length > 0) {
      newStats.badges = [...currentBadges, ...newBadges];
    }
    
    saveStats(STORAGE_KEYS.STATS, newStats);
    
    return { ...result, newBadges };
  }, [gameState, soundEnabled]);

  /**
   * 일시정지 토글
   */
  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  /**
   * 물방울 업데이트 (애니메이션)
   */
  const updateDroplets = useCallback(() => {
    if (gameState.isPaused || gameState.isGameOver) return;
    
    const now = Date.now();
    const deltaTime = (now - lastUpdateTimeRef.current) / 1000; // 초 단위
    lastUpdateTimeRef.current = now;
    
    setDroplets(prev => {
      const updated = prev.map(droplet => ({
        ...droplet,
        y: droplet.y + droplet.speed * deltaTime * 10, // 픽셀 단위로 변환
      }));
      
      // 바닥에 닿은 물방울 체크
      const hitBottom = updated.find(d => d.y >= 100);
      if (hitBottom && hitBottom.id === currentDroplet?.id) {
        // 생명 감소
        const newLives = gameState.lives - 1;
        setGameState(prev => ({
          ...prev,
          lives: newLives,
          combo: 0,
          wrongAnswers: prev.wrongAnswers + 1,
        }));
        
        problemHistoryRef.current.push({
          table: hitBottom.multiplicand,
          correct: false,
        });
        
        if (soundEnabled) playWrongSound();
        
        // 게임 오버 체크
        if (newLives <= 0 && gameState.mode !== 'practice' && gameState.mode !== 'timeAttack') {
          endGame();
          return [];
        }
        
        // 다음 물방울 생성
        setTimeout(() => {
          const speedMultiplier = gameState.mode === 'practice' ? 
            getSpeedMultiplier('normal') : 1;
          const newDroplet = createDroplet(
            gameState.level,
            speedMultiplier,
            gameState.selectedTables
          );
          setCurrentDroplet(newDroplet);
          setDroplets([newDroplet]);
          setBaskets(createBaskets(newDroplet.answer));
        }, 500);
        
        return updated.filter(d => d.id !== hitBottom.id);
      }
      
      return updated;
    });
    
    animationFrameRef.current = requestAnimationFrame(updateDroplets);
  }, [gameState, currentDroplet, soundEnabled, endGame]);

  /**
   * 게임 루프 시작
   */
  useEffect(() => {
    if (gameState.mode && !gameState.isGameOver && !gameState.isPaused) {
      lastUpdateTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateDroplets);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.mode, gameState.isGameOver, gameState.isPaused, updateDroplets]);

  /**
   * 시간 도전 모드 타이머
   */
  useEffect(() => {
    if (gameState.mode === 'timeAttack' && !gameState.isPaused && !gameState.isGameOver) {
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.timeRemaining && prev.timeRemaining > 0) {
            const newTime = prev.timeRemaining - 1;
            if (newTime <= 0) {
              setTimeout(endGame, 100);
              return { ...prev, timeRemaining: 0 };
            }
            return { ...prev, timeRemaining: newTime };
          }
          return prev;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameState.mode, gameState.isPaused, gameState.isGameOver, endGame]);

  return {
    gameState,
    droplets,
    baskets,
    currentDroplet,
    soundEnabled,
    setSoundEnabled,
    startGame,
    checkAnswer,
    endGame,
    togglePause,
  };
};

