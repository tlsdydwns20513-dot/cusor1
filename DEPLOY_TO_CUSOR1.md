# 🚀 cusor1 저장소 배포 가이드

## 📦 저장소 정보
- **저장소**: [https://github.com/tlsdydwns20513-dot/cusor1](https://github.com/tlsdydwns20513-dot/cusor1)
- **배포 URL**: https://tlsdydwns20513-dot.github.io/cusor1/

## ⚡ 빠른 시작

### 방법 1: 자동 스크립트 (추천)

1. **`upload.bat`** 파일을 더블클릭
2. 브라우저가 열리면 GitHub 로그인
3. 권한 승인
4. 완료! 🎉

### 방법 2: 수동 명령어

```bash
# Git 초기화
git init

# 사용자 설정
git config user.email "tlsdydwns20513@gmail.com"
git config user.name "tlsdydwns20513-dot"

# 파일 추가
git add .

# 커밋
git commit -m "feat: 구구단 산성비 게임 배포"

# 브랜치 설정
git branch -M main

# 원격 저장소 연결
git remote add origin https://github.com/tlsdydwns20513-dot/cusor1.git

# 업로드
git push -u origin main
```

## 🌐 GitHub Pages 설정

업로드 후:

1. [Settings → Pages](https://github.com/tlsdydwns20513-dot/cusor1/settings/pages) 이동
2. **Source**: `GitHub Actions` 선택
3. 저장

## ✅ 확인

- **저장소**: https://github.com/tlsdydwns20513-dot/cusor1
- **Actions**: https://github.com/tlsdydwns20513-dot/cusor1/actions
- **배포 URL**: https://tlsdydwns20513-dot.github.io/cusor1/

## 🔄 업데이트

이후 코드 수정 시:

```bash
git add .
git commit -m "fix: 버그 수정"
git push
```

자동으로 재배포됩니다! 🚀

