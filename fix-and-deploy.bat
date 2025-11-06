@echo off
chcp 65001 >nul
echo ========================================
echo 🔧 빌드 에러 수정 및 재배포
echo ========================================
echo.

echo [1/4] 로컬 빌드 테스트 중...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ❌ 빌드 실패! 에러를 확인하세요.
    pause
    exit /b 1
)

echo.
echo ✅ 로컬 빌드 성공!
echo.

echo [2/4] Git 변경사항 추가...
git add .

echo [3/4] 커밋 생성...
git commit -m "fix: TypeScript 빌드 에러 수정"

echo [4/4] GitHub에 푸시 (자동 재배포 시작)...
git push

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo ✅ 재배포 시작!
    echo ========================================
    echo.
    echo Actions 탭에서 진행 상황 확인:
    echo https://github.com/tlsdydwns20513-dot/cusor1/actions
    echo.
    echo 2-3분 후 배포 URL 확인:
    echo https://tlsdydwns20513-dot.github.io/cusor1/
    echo.
) else (
    echo.
    echo ❌ 푸시 실패
    echo.
)

pause

