@echo off
chcp 65001 >nul
echo ========================================
echo 🔍 GitHub Pages 배포 상태 확인
echo ========================================
echo.

echo 📋 확인할 URL들:
echo.
echo 1. 저장소: https://github.com/tlsdydwns20513-dot/cusor1
echo 2. Actions: https://github.com/tlsdydwns20513-dot/cusor1/actions
echo 3. Settings: https://github.com/tlsdydwns20513-dot/cusor1/settings/pages
echo 4. 배포 URL: https://tlsdydwns20513-dot.github.io/cusor1/
echo.

echo ========================================
echo ✅ 체크리스트
echo ========================================
echo.
echo [ ] Settings - Pages에서 Source가 "GitHub Actions"인가?
echo [ ] Actions 탭에서 배포가 성공했는가? (초록색 체크)
echo [ ] 배포 후 5분 정도 기다렸는가?
echo [ ] 시크릿 모드에서도 404인가? (캐시 문제 확인)
echo.

echo ========================================
echo 🔧 해결 방법
echo ========================================
echo.
echo 1. Settings - Pages - Source를 'GitHub Actions'로 변경
echo 2. Actions 탭에서 'Run workflow' 버튼 클릭
echo 3. 배포 완료 대기 (2-3분)
echo 4. Ctrl+Shift+R로 강력 새로고침
echo.

echo 브라우저에서 URL을 여시겠습니까?
echo.
echo [1] 저장소 열기
echo [2] Actions 열기  
echo [3] Settings (Pages) 열기
echo [4] 배포 URL 열기
echo [5] 모두 열기
echo [0] 닫기
echo.

set /p choice="선택 (0-5): "

if "%choice%"=="1" start https://github.com/tlsdydwns20513-dot/cusor1
if "%choice%"=="2" start https://github.com/tlsdydwns20513-dot/cusor1/actions
if "%choice%"=="3" start https://github.com/tlsdydwns20513-dot/cusor1/settings/pages
if "%choice%"=="4" start https://tlsdydwns20513-dot.github.io/cusor1/
if "%choice%"=="5" (
    start https://github.com/tlsdydwns20513-dot/cusor1
    timeout /t 1 /nobreak >nul
    start https://github.com/tlsdydwns20513-dot/cusor1/actions
    timeout /t 1 /nobreak >nul
    start https://github.com/tlsdydwns20513-dot/cusor1/settings/pages
    timeout /t 1 /nobreak >nul
    start https://tlsdydwns20513-dot.github.io/cusor1/
)

echo.
pause

