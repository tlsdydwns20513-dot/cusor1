@echo off
chcp 65001 >nul
echo ========================================
echo 구구단 산성비 게임 GitHub 업로드
echo ========================================
echo.

REM Git 설치 확인
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [오류] Git이 설치되어 있지 않습니다.
    echo Git을 먼저 설치해주세요: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/7] Git 저장소 초기화...
git init
if %errorlevel% neq 0 (
    echo Git 초기화 실패
    pause
    exit /b 1
)

echo [2/7] Git 사용자 설정...
git config user.email "tlsdydwns20513@gmail.com"
git config user.name "tlsdydwns20513-dot"

echo [3/7] 파일 추가 중...
git add .
if %errorlevel% neq 0 (
    echo 파일 추가 실패
    pause
    exit /b 1
)

echo [4/7] 커밋 생성 중...
git commit -m "feat: 구구단 산성비 게임 초기 커밋 with CI/CD"
if %errorlevel% neq 0 (
    echo 커밋 실패
    pause
    exit /b 1
)

echo [5/7] 브랜치 이름 변경...
git branch -M main

echo [6/7] GitHub 저장소 연결...
git remote add origin https://github.com/tlsdydwns20513-dot/cusor1.git
if %errorlevel% neq 0 (
    echo 원격 저장소가 이미 연결되어 있습니다.
    git remote set-url origin https://github.com/tlsdydwns20513-dot/cusor1.git
)

echo [7/7] GitHub에 업로드 중...
echo.
echo ========================================
echo 로그인 창이 나타나면:
echo 1. GitHub 계정으로 로그인
echo 2. 권한 승인
echo ========================================
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ 업로드 성공!
    echo ========================================
    echo.
    echo 저장소 URL: https://github.com/tlsdydwns20513-dot/cusor1
    echo.
    echo 다음 단계:
    echo 1. GitHub 저장소 페이지로 이동
    echo 2. Settings - Pages - Source를 'GitHub Actions'로 설정
    echo 3. 자동 배포 시작!
    echo.
    echo 배포 URL: https://tlsdydwns20513-dot.github.io/cusor1/
    echo.
) else (
    echo.
    echo [오류] 업로드 실패
    echo 로그인 또는 권한 문제일 수 있습니다.
    echo.
)

pause

