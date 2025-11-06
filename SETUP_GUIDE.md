# 🚀 구구단 산성비 게임 - 설치 및 실행 가이드

이 문서는 구구단 산성비 게임을 설치하고 실행하는 방법을 단계별로 안내합니다.

## 📋 필수 요구사항

게임을 실행하기 전에 다음 소프트웨어가 설치되어 있어야 합니다:

### 1. Node.js 설치
- **권장 버전**: Node.js 16.x 이상
- **다운로드**: [Node.js 공식 웹사이트](https://nodejs.org/)
- LTS(Long Term Support) 버전 권장

### 설치 확인
터미널(명령 프롬프트)에서 다음 명령어로 확인:
```bash
node --version
npm --version
```

## 🔧 설치 단계

### 1단계: 프로젝트 파일 준비

프로젝트 폴더로 이동합니다:
```bash
cd multiplication-rain
```

### 2단계: 의존성 패키지 설치

다음 명령어를 실행하여 필요한 모든 패키지를 설치합니다:

**npm 사용 시:**
```bash
npm install
```

**또는 yarn 사용 시:**
```bash
yarn install
```

설치가 완료되면 `node_modules` 폴더가 생성됩니다.

### 3단계: 개발 서버 실행

**npm 사용 시:**
```bash
npm run dev
```

**또는 yarn 사용 시:**
```bash
yarn dev
```

### 4단계: 브라우저에서 열기

서버가 정상적으로 시작되면 자동으로 브라우저가 열립니다.
자동으로 열리지 않는 경우, 다음 주소로 직접 접속하세요:

```
http://localhost:3000
```

## ✅ 정상 작동 확인

게임이 제대로 실행되면 다음과 같은 화면을 볼 수 있습니다:
- 🌧️ "구구단 산성비" 타이틀
- 📚 연습 모드, 🎯 도전 모드, ⏱️ 시간 도전 버튼
- 📊 학습 현황 버튼

## 🏗️ 프로덕션 빌드

실제 배포용 파일을 생성하려면:

### 빌드 생성
```bash
npm run build
```

생성된 파일은 `dist/` 폴더에 저장됩니다.

### 빌드 미리보기
```bash
npm run preview
```

## 🐛 문제 해결

### 포트가 이미 사용 중인 경우

에러 메시지: `Port 3000 is already in use`

**해결 방법:**
1. `vite.config.ts` 파일을 열고
2. `server.port` 값을 다른 번호로 변경 (예: 3001)
3. 서버를 다시 시작

### 패키지 설치 오류

**해결 방법:**
```bash
# node_modules 및 package-lock.json 삭제
rm -rf node_modules package-lock.json

# 다시 설치
npm install
```

Windows에서는:
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

### TypeScript 오류

개발 중 TypeScript 오류가 발생하면:
```bash
npm run build
```

이 명령어로 정확한 오류 위치를 확인할 수 있습니다.

## 📱 모바일에서 테스트하기

같은 네트워크에 있는 모바일 기기에서 테스트하려면:

1. 개발 서버 실행
2. 터미널에 표시된 네트워크 주소 확인
   ```
   Local:   http://localhost:3000
   Network: http://192.168.x.x:3000
   ```
3. 모바일 브라우저에서 Network 주소로 접속

## 🎮 게임 시작하기

1. **연습 모드**: 특정 구구단을 선택하여 연습
2. **도전 모드**: 모든 구구단을 섞어서 도전
3. **시간 도전**: 제한 시간 내에 최대한 많은 문제 풀기

## 📊 학습 데이터

게임 진행 상황은 브라우저의 LocalStorage에 자동으로 저장됩니다:
- 최고 점수
- 단별 정답률
- 획득한 배지
- 학습 통계

## 💡 개발 팁

### Hot Module Replacement (HMR)
코드를 수정하면 자동으로 브라우저에 반영됩니다. 페이지를 새로고침할 필요가 없습니다.

### 개발자 도구
- Chrome/Edge: F12 키
- 콘솔에서 에러 메시지 확인 가능

### 데이터 초기화
학습 데이터를 초기화하려면:
1. F12 키로 개발자 도구 열기
2. Application 탭 → Storage → Local Storage
3. 해당 항목 삭제

## 🔄 업데이트

프로젝트 업데이트 후:
```bash
npm install  # 새로운 의존성 설치
npm run dev  # 개발 서버 다시 시작
```

## 📞 지원

문제가 계속되면:
1. `README.md` 파일 확인
2. GitHub Issues에서 검색
3. 새로운 이슈 등록

---

**즐거운 개발 되세요! 🎉**

