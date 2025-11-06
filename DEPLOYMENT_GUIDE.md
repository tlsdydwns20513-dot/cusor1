# 🚀 자동 배포 환경 설정 가이드

이 프로젝트는 **GitHub Actions**를 통한 자동 배포가 설정되어 있습니다!

## ✨ 설정된 기능

### 1. 자동 빌드 및 배포 (deploy.yml)
- `main` 브랜치에 코드를 푸시하면 **자동으로 빌드 및 배포**
- GitHub Pages에 자동 배포
- 배포 URL: `https://YOUR-USERNAME.github.io/multiplication-rain/`

### 2. 코드 품질 검증 (ci.yml)
- 모든 푸시와 Pull Request에서 자동 실행
- TypeScript 타입 체크
- ESLint 코드 검사
- 빌드 테스트
- Node.js 18, 20 버전에서 테스트

## 📋 GitHub에서 해야 할 설정

### 1단계: 저장소를 GitHub에 업로드

```bash
# Git 초기화 (아직 안 했다면)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "feat: 구구단 산성비 게임 초기 커밋 with CI/CD"

# 브랜치 이름 변경
git branch -M main

# GitHub 저장소 연결 (YOUR-USERNAME을 본인 GitHub 아이디로 변경!)
git remote add origin https://github.com/YOUR-USERNAME/multiplication-rain.git

# 푸시
git push -u origin main
```

### 2단계: GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. **Settings** (설정) 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - **GitHub Actions** 선택 (기본값은 "Deploy from a branch")
5. 저장 (자동 저장됨)

### 3단계: 배포 확인

1. GitHub 저장소의 **Actions** 탭으로 이동
2. "Deploy to GitHub Pages" 워크플로우 실행 확인
3. 초록색 체크 표시가 나타나면 배포 완료!
4. 배포 URL로 접속: `https://YOUR-USERNAME.github.io/multiplication-rain/`

## 🔄 이후 업데이트 방법

코드를 수정한 후:

```bash
# 변경사항 추가
git add .

# 커밋 (의미있는 메시지 작성)
git commit -m "fix: 게임 로직 버그 수정"

# 푸시 (자동으로 배포 시작!)
git push
```

**그게 전부입니다!** 푸시하면 자동으로:
1. ✅ 코드 검증 (타입 체크, 린트)
2. ✅ 빌드
3. ✅ GitHub Pages에 배포

## 📊 배포 상태 확인

### Actions 탭에서 확인
- 🟢 초록색: 성공
- 🔴 빨간색: 실패 (로그 확인 필요)
- 🟡 노란색: 진행 중

### 배포 시간
- 일반적으로 2-3분 소요
- 빌드 → 업로드 → 배포 순서로 진행

## 🛠️ vite.config.ts 수정 필요

배포 후 페이지가 제대로 로드되지 않는다면:

1. `vite.config.ts` 파일 열기
2. `base` 설정 확인:

```typescript
export default defineConfig({
  base: '/multiplication-rain/',  // 저장소 이름과 일치해야 함
  // ...
})
```

3. 저장소 이름과 일치하도록 수정
4. 다시 커밋 & 푸시

## 🎯 워크플로우 파일 설명

### `.github/workflows/deploy.yml`
**자동 배포 워크플로우**
- `main` 브랜치 푸시 시 실행
- Node.js 18 설치
- 의존성 설치 (`npm ci`)
- 빌드 (`npm run build`)
- GitHub Pages에 배포

### `.github/workflows/ci.yml`
**코드 품질 검증 워크플로우**
- 모든 브랜치에서 실행
- TypeScript 타입 체크
- ESLint 검사
- 빌드 테스트
- Node.js 18, 20 버전에서 테스트

## 🔧 고급 설정

### 배포 브랜치 변경
다른 브랜치에서 배포하려면 `deploy.yml` 수정:

```yaml
on:
  push:
    branches: [ production ]  # 원하는 브랜치 이름
```

### 환경 변수 추가
GitHub Secrets에 환경 변수 추가:

1. Settings → Secrets and variables → Actions
2. **New repository secret** 클릭
3. 이름과 값 입력
4. 워크플로우에서 사용:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### 배포 전 테스트 추가
`deploy.yml`에 테스트 단계 추가:

```yaml
- name: 테스트 실행
  run: npm test
```

## 🐛 문제 해결

### 1. 배포가 실패하는 경우
- Actions 탭에서 로그 확인
- 빌드 에러 메시지 읽기
- 로컬에서 `npm run build` 테스트

### 2. 페이지가 404 에러
- GitHub Pages 설정 확인
- `vite.config.ts`의 `base` 경로 확인
- 저장소가 Public인지 확인

### 3. CSS/JS 파일이 로드되지 않음
- `base` 설정이 잘못됨
- 브라우저 콘솔에서 에러 확인
- 상대 경로 확인

### 4. 권한 오류 (Permission denied)
Settings → Actions → General에서:
- **Workflow permissions**를 "Read and write permissions"로 변경

## 🎨 배지 추가 (선택사항)

README.md에 배포 상태 배지 추가:

```markdown
![Deploy Status](https://github.com/YOUR-USERNAME/multiplication-rain/actions/workflows/deploy.yml/badge.svg)
![CI Status](https://github.com/YOUR-USERNAME/multiplication-rain/actions/workflows/ci.yml/badge.svg)
```

## 📱 모바일에서 테스트

배포 후 모바일 브라우저에서:
1. 배포 URL 접속
2. 홈 화면에 추가 (PWA처럼 사용)

## 🔐 보안

### GitHub Actions 보안 팁
- Secrets에 민감한 정보 저장
- 외부 Actions 사용 시 버전 고정 (`@v4`)
- 권한은 최소한으로 설정

## 📈 성능 모니터링

배포 후 확인할 사항:
- [ ] 페이지 로드 속도
- [ ] 모바일 반응성
- [ ] 브라우저 콘솔 에러
- [ ] 게임 기능 동작

## 🎉 완료!

설정이 완료되었습니다! 이제:
- ✅ 코드 푸시하면 자동 배포
- ✅ 코드 품질 자동 검증
- ✅ 실시간 배포 상태 확인
- ✅ 누구나 접속 가능한 웹사이트

**배포 URL을 친구들과 공유하세요!** 🚀

---

## 📞 추가 도움이 필요하신가요?

문제가 발생하면:
1. Actions 탭의 로그 확인
2. Issues에 질문 등록
3. GitHub Docs 참고: [GitHub Pages 문서](https://docs.github.com/pages)

