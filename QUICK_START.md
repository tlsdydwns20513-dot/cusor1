# 🚀 빠른 시작 가이드

## ⚠️ 보안 경고

**절대 비밀번호를 공개 채팅이나 코드에 포함하지 마세요!**

비밀번호가 노출되었다면 즉시 변경하세요:
1. [GitHub 설정](https://github.com/settings/security) 접속
2. Password → Change password
3. 강력한 새 비밀번호로 변경

## 📦 1. Git 설치 확인

```bash
git --version
```

출력이 없다면: [Git 다운로드](https://git-scm.com/download/win)

## 🚀 2. 자동 업로드 스크립트 실행

**가장 쉬운 방법:**

1. 프로젝트 폴더에서 `upload.bat` 파일을 **더블클릭**
2. 브라우저가 열리면 GitHub 로그인
3. 권한 승인
4. 완료!

## 💻 3. 또는 수동 명령어 실행

PowerShell 또는 CMD에서:

```bash
# 1. Git 초기화
git init

# 2. 사용자 설정
git config user.email "tlsdydwns20513@gmail.com"
git config user.name "tlsdydwns20513-dot"

# 3. 파일 추가
git add .

# 4. 커밋
git commit -m "feat: 구구단 산성비 게임 초기 커밋"

# 5. 브랜치 설정
git branch -M main

# 6. 원격 저장소 연결
git remote add origin https://github.com/tlsdydwns20513-dot/multiplication-rain.git

# 7. 업로드
git push -u origin main
```

## 🌐 4. GitHub Pages 설정

업로드 후:

1. [저장소 Settings](https://github.com/tlsdydwns20513-dot/multiplication-rain/settings/pages) 이동
2. **Source**: `GitHub Actions` 선택
3. 저장 (자동 저장됨)

## ✅ 5. 배포 확인

- **Actions 탭**: [배포 진행 상황 확인](https://github.com/tlsdydwns20513-dot/multiplication-rain/actions)
- **배포 URL**: https://tlsdydwns20513-dot.github.io/multiplication-rain/

## 🔄 이후 업데이트

```bash
git add .
git commit -m "fix: 버그 수정"
git push
```

## 🆘 문제 해결

### Git이 설치되지 않음
- [Git 다운로드](https://git-scm.com/download/win)
- 설치 후 컴퓨터 재시작

### 로그인 실패
- 브라우저에서 GitHub 로그인 확인
- [Personal Access Token](https://github.com/settings/tokens) 생성하여 사용

### Permission denied
```bash
git remote set-url origin https://github.com/tlsdydwns20513-dot/multiplication-rain.git
git push -u origin main
```

### 저장소가 비어있지 않음
```bash
git pull origin main --rebase
git push -u origin main
```

## 📞 추가 도움

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 상세 배포 가이드
- [GITHUB_UPLOAD_GUIDE.md](./GITHUB_UPLOAD_GUIDE.md) - GitHub 업로드 전체 가이드
- [GitHub Docs](https://docs.github.com)

---

**중요:** 비밀번호는 절대 공유하지 마세요! 🔒

