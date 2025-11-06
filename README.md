# 🌧️ 구구단 산성비 게임 (Multiplication Rain)

초등학교 2학년 학생들이 재미있게 곱셈구구를 학습할 수 있는 교육용 게임입니다.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=flat-square&logo=vite)

## 📋 목차

- [게임 소개](#게임-소개)
- [주요 기능](#주요-기능)
- [설치 및 실행](#설치-및-실행)
- [게임 방법](#게임-방법)
- [프로젝트 구조](#프로젝트-구조)
- [기술 스택](#기술-스택)
- [개발 가이드](#개발-가이드)

## 🎮 게임 소개

구구단 산성비는 하늘에서 떨어지는 곱셈 문제를 풀어가며 구구단을 학습하는 교육용 게임입니다. 
타이핑 산성비 게임의 방식을 곱셈 학습에 적용하여 아이들이 자연스럽게 구구단을 암기할 수 있도록 돕습니다.

### 특징
- 🎯 세 가지 게임 모드 (연습, 도전, 시간 도전)
- 📊 학습 현황 분석 및 통계
- 🏅 다양한 배지 시스템
- 🎨 아동 친화적인 UI/UX
- 🔊 효과음 및 피드백
- 💾 로컬 스토리지 기반 진도 저장

## ✨ 주요 기능

### 1. 연습 모드 📚
- 원하는 구구단(2-9단) 선택
- 낙하 속도 조절 (느림/보통/빠름)
- 생명 무제한으로 부담 없이 연습
- 틀린 문제 반복 학습

### 2. 도전 모드 🎯
- 2단부터 9단까지 랜덤 출제
- 레벨 시스템 (10문제마다 레벨 상승)
- 5개의 생명
- 최고 점수 기록

### 3. 시간 도전 모드 ⏱️
- 60초 또는 120초 선택
- 제한 시간 내 최대한 많은 문제 풀기
- 빠른 반응 속도 훈련

### 4. 학습 현황 📊
- 전체 정답률 및 점수 확인
- 단별 학습 진도 분석
- 취약한 부분 파악
- 학습 통계 시각화

### 5. 배지 시스템 🏅
15가지 다양한 배지:
- 단별 마스터 배지 (2-9단)
- 콤보왕, 완벽한 게임
- 빠른 손가락, 백점 클럽
- 꾸준한 학습자, 고득점자
- 올라운더

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 16.x 이상
- npm 또는 yarn

### 설치 방법

1. **저장소 클론**
```bash
git clone <repository-url>
cd multiplication-rain
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

브라우저에서 자동으로 `http://localhost:3000`이 열립니다.

### 빌드

프로덕션 빌드를 생성하려면:
```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 프리뷰

빌드된 앱을 미리보려면:
```bash
npm run preview
```

## 🎲 게임 방법

### 기본 플레이
1. 메인 메뉴에서 원하는 모드를 선택합니다
2. 화면 상단에서 곱셈 문제가 적힌 물방울이 떨어집니다
3. 화면 하단의 바구니 중 정답을 클릭하거나 키보드로 선택합니다
4. 정답을 맞추면 점수를 획득하고 콤보가 증가합니다
5. 오답을 선택하거나 물방울이 바닥에 닿으면 생명이 감소합니다

### 점수 시스템
- 기본 점수: 10점
- 콤보 보너스:
  - 5연속 이상: 1.5배
  - 10연속 이상: 2.0배

### 난이도
- 🟢 **쉬움** (초록색): 2, 3, 4단
- 🔵 **보통** (파란색): 5, 6, 7단
- 🟣 **어려움** (보라색): 8, 9단

## 📁 프로젝트 구조

```
multiplication-rain/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── MainMenu.tsx    # 메인 메뉴
│   │   ├── ModeSelector.tsx # 모드 설정
│   │   ├── GameScreen.tsx   # 게임 화면
│   │   ├── GameResult.tsx   # 결과 화면
│   │   └── StatsView.tsx    # 통계 화면
│   ├── hooks/               # 커스텀 훅
│   │   └── useGameState.ts  # 게임 상태 관리
│   ├── utils/               # 유틸리티 함수
│   │   ├── gameLogic.ts    # 게임 로직
│   │   └── sound.ts        # 사운드 효과
│   ├── types/               # TypeScript 타입 정의
│   │   └── index.ts
│   ├── constants/           # 상수
│   │   └── index.ts
│   ├── App.tsx              # 메인 앱 컴포넌트
│   ├── App.css              # 스타일시트
│   ├── main.tsx             # 앱 엔트리포인트
│   └── index.css            # 글로벌 스타일
├── index.html               # HTML 템플릿
├── package.json             # 프로젝트 설정
├── tsconfig.json            # TypeScript 설정
├── vite.config.ts           # Vite 설정
└── README.md                # 이 파일
```

## 🛠️ 기술 스택

### 프론트엔드
- **React 18.2**: UI 라이브러리
- **TypeScript 5.2**: 타입 안정성
- **Vite 5.0**: 빌드 도구 및 개발 서버

### 주요 기능
- **Web Audio API**: 효과음 생성
- **LocalStorage**: 진도 및 통계 저장
- **CSS Animations**: 부드러운 애니메이션

### 개발 도구
- **ESLint**: 코드 품질 관리
- **TypeScript Compiler**: 타입 체크

## 💻 개발 가이드

### 새로운 게임 모드 추가

1. `src/types/index.ts`에 타입 추가:
```typescript
export type GameMode = 'practice' | 'challenge' | 'timeAttack' | 'newMode';
```

2. `src/hooks/useGameState.ts`에 로직 추가:
```typescript
const startGame = useCallback((mode: GameMode, ...) => {
  if (mode === 'newMode') {
    // 새로운 모드 로직
  }
}, []);
```

3. 컴포넌트에서 UI 추가

### 새로운 배지 추가

`src/constants/index.ts`의 `BADGES` 배열에 추가:
```typescript
{ 
  id: 'new_badge', 
  name: '배지 이름', 
  description: '획득 조건', 
  icon: '🎖️' 
}
```

`src/utils/gameLogic.ts`의 `checkNewBadges` 함수에 로직 추가

### 스타일 커스터마이징

- 색상 테마: `src/constants/index.ts`의 `COLORS`
- 컴포넌트 스타일: `src/App.css`
- 글로벌 스타일: `src/index.css`

## 📝 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 🤝 기여

버그 리포트, 기능 제안, Pull Request를 환영합니다!

## 📧 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

**즐거운 학습 되세요! 📚✨**

