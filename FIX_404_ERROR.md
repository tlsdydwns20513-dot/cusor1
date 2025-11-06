# 🔧 404 오류 해결 가이드

## 🚨 404 오류 원인

GitHub Pages에서 404 오류가 발생하는 주요 원인:

1. ❌ GitHub Pages가 활성화되지 않음
2. ❌ Source 설정이 잘못됨
3. ❌ 배포가 아직 진행 중
4. ❌ base 경로 설정 오류

## ✅ 해결 방법

### 1단계: GitHub Pages 설정 확인

1. **저장소로 이동**: https://github.com/tlsdydwns20513-dot/cusor1

2. **Settings 클릭** (상단 탭)

3. **왼쪽 메뉴에서 Pages 클릭**

4. **Source 확인**:
   - ✅ `GitHub Actions` 선택되어 있어야 함
   - ❌ `Deploy from a branch` 선택되어 있으면 **변경 필요**

5. **Source를 GitHub Actions로 변경**:
   ```
   Source: [GitHub Actions 선택]
   ```

### 2단계: Actions 배포 상태 확인

1. **Actions 탭으로 이동**: https://github.com/tlsdydwns20513-dot/cusor1/actions

2. **워크플로우 실행 확인**:
   - 🟢 초록색 체크: 배포 성공
   - 🔴 빨간색 X: 배포 실패 (로그 확인 필요)
   - 🟡 노란색 원: 진행 중 (기다리세요)

3. **배포가 실패했다면**:
   - 워크플로우 클릭 → 로그 확인
   - 에러 메시지 읽고 수정

### 3단계: 권한 설정 확인

1. **Settings** → **Actions** → **General**으로 이동

2. **Workflow permissions** 확인:
   - ✅ `Read and write permissions` 선택
   - ❌ `Read repository contents and packages permissions`는 안 됨

3. 변경 후 **Save** 클릭

### 4단계: 수동으로 배포 트리거

Actions 탭에서:

1. **"Deploy to GitHub Pages"** 워크플로우 선택
2. **Run workflow** 버튼 클릭
3. **Run workflow** 확인

### 5단계: 코드 재푸시

로컬에서:

```bash
# 파일 수정 (공백 추가 등 간단한 수정)
git add .
git commit -m "fix: GitHub Pages 배포 설정 수정"
git push
```

## 🔍 문제별 해결 방법

### 문제 1: "There isn't a GitHub Pages site here"

**해결:**
1. Settings → Pages → Source를 `GitHub Actions`로 변경
2. Actions 탭에서 배포 완료 대기 (2-3분)
3. 새로고침

### 문제 2: 배포는 성공했는데 404

**원인**: base 경로 문제

**해결:**
`vite.config.ts` 파일 확인:
```typescript
base: '/cusor1/',  // 저장소 이름과 정확히 일치해야 함
```

### 문제 3: CSS/JS 파일이 로드되지 않음

**원인**: 경로 문제

**해결:**
1. 브라우저 개발자 도구 (F12) 열기
2. Console 탭에서 에러 확인
3. 404 에러 나는 파일 경로 확인

### 문제 4: Actions 권한 오류

**해결:**
```
Settings → Actions → General
→ Workflow permissions
→ "Read and write permissions" 선택
→ Save
```

## 🎯 단계별 체크리스트

### 저장소 설정
- [ ] Settings → Pages → Source가 `GitHub Actions`인가?
- [ ] Settings → Actions → Workflow permissions가 `Read and write`인가?
- [ ] 저장소가 Public인가? (Private이면 Pro 계정 필요)

### 배포 확인
- [ ] Actions 탭에서 "Deploy to GitHub Pages" 성공했는가?
- [ ] 초록색 체크 표시가 있는가?
- [ ] 배포 완료 후 5분 정도 기다렸는가?

### 코드 설정
- [ ] `vite.config.ts`의 base가 `/cusor1/`인가?
- [ ] `.github/workflows/deploy.yml` 파일이 있는가?
- [ ] `package.json`에 빌드 스크립트가 있는가?

## 🚀 빠른 재배포

모든 설정을 다시 하려면:

```bash
# 1. 변경 사항 커밋
git add .
git commit -m "fix: 배포 설정 수정"

# 2. 강제 푸시 (주의!)
git push -f origin main
```

## 🔄 대체 방법: 직접 빌드 업로드

자동 배포가 안 되면 수동으로:

1. **로컬에서 빌드**:
```bash
npm run build
```

2. **gh-pages 브랜치로 배포**:
```bash
npm install -g gh-pages
gh-pages -d dist
```

3. **Settings → Pages에서**:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` 선택
   - Save

## 📊 배포 상태 확인

### URL 테스트
```
https://tlsdydwns20513-dot.github.io/cusor1/
```

### 다음도 확인:
- https://github.com/tlsdydwns20513-dot/cusor1 (저장소)
- https://github.com/tlsdydwns20513-dot/cusor1/actions (배포 로그)
- https://github.com/tlsdydwns20513-dot/cusor1/settings/pages (설정)

## 💡 추가 팁

### 배포 시간
- 첫 배포: 2-5분
- 이후 배포: 1-3분
- 캐시 문제로 보이지 않으면 시크릿 모드로 확인

### 캐시 삭제
- **Ctrl + Shift + R** (강력 새로고침)
- 또는 시크릿/프라이빗 창에서 접속

### 로그 확인
Actions 탭에서 실패한 워크플로우 클릭:
```
build → 빌드 로그 확인
deploy → 배포 로그 확인
```

## 🆘 여전히 안 되면?

1. **이슈 생성**: https://github.com/tlsdydwns20513-dot/cusor1/issues
2. **로그 첨부**: Actions 탭의 에러 로그
3. **스크린샷**: Settings → Pages 화면

---

**대부분의 경우 Settings → Pages → Source를 "GitHub Actions"로 변경하면 해결됩니다!** ✅

