# 🚀 GitHub 업로드 가이드

이 프로젝트를 GitHub에 업로드하는 방법을 단계별로 안내합니다.

## 📋 사전 준비

### 1. Git 설치
먼저 Git이 설치되어 있어야 합니다.

**다운로드**: [Git 공식 웹사이트](https://git-scm.com/download/win)
- Windows용 Git 다운로드 및 설치
- 설치 후 컴퓨터 재시작 권장

### 2. GitHub 계정
GitHub 계정이 필요합니다.
- 계정이 없다면: [GitHub 가입](https://github.com/join)

## 🔧 GitHub 저장소 생성

### 1단계: GitHub에서 새 저장소 만들기

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 `+` 버튼 클릭 → `New repository` 선택
3. 저장소 설정:
   - **Repository name**: `multiplication-rain` (또는 원하는 이름)
   - **Description**: `구구단 산성비 게임 - 초등학생을 위한 곱셈 학습 게임`
   - **Public** 또는 **Private** 선택
   - ⚠️ **"Initialize this repository with a README" 체크 해제** (이미 README가 있음)
4. `Create repository` 클릭

## 💻 로컬에서 Git 설정 및 업로드

### 2단계: 명령 프롬프트/PowerShell 열기

프로젝트 폴더에서:
1. 폴더 내에서 Shift + 우클릭
2. "PowerShell 여기에 열기" 또는 "터미널 열기" 선택

또는:
```bash
cd "C:\Users\신용준\Desktop\folder.c"
```

### 3단계: Git 초기화 및 커밋

다음 명령어를 **순서대로** 실행하세요:

```bash
# 1. Git 초기화
git init

# 2. Git 사용자 설정 (최초 1회만)
git config --global user.name "당신의 이름"
git config --global user.email "당신의이메일@example.com"

# 3. 모든 파일 추가
git add .

# 4. 첫 커밋
git commit -m "Initial commit: 구구단 산성비 게임 프로젝트"

# 5. 기본 브랜치를 main으로 변경
git branch -M main

# 6. GitHub 저장소 연결 (YOUR-USERNAME을 실제 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR-USERNAME/multiplication-rain.git

# 7. GitHub에 업로드
git push -u origin main
```

### 4단계: GitHub 로그인

`git push` 명령 실행 시:
- 브라우저가 자동으로 열리면서 GitHub 로그인 요청
- 로그인 후 권한 승인

## ✅ 업로드 확인

1. GitHub 저장소 페이지로 이동
2. 파일들이 업로드되었는지 확인
3. README.md가 자동으로 표시됨

## 🔄 이후 코드 수정 시 업로드 방법

코드를 수정한 후 GitHub에 다시 업로드하려면:

```bash
# 1. 변경된 파일 추가
git add .

# 2. 커밋 (메시지는 변경 내용을 설명)
git commit -m "게임 로직 개선 및 버그 수정"

# 3. GitHub에 푸시
git push
```

## 🌐 GitHub Pages로 배포 (선택사항)

웹사이트로 공개하고 싶다면:

### 방법 1: GitHub Actions 사용 (권장)

1. 프로젝트에 `.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist
      
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

2. GitHub 저장소 Settings → Pages 설정:
   - Source: `GitHub Actions` 선택
   - 저장

3. 코드를 푸시하면 자동으로 빌드 및 배포됨

4. 배포 URL: `https://YOUR-USERNAME.github.io/multiplication-rain/`

### 방법 2: 수동 배포

```bash
# 1. 빌드
npm run build

# 2. gh-pages 패키지 설치
npm install --save-dev gh-pages

# 3. package.json에 추가
"homepage": "https://YOUR-USERNAME.github.io/multiplication-rain",
"scripts": {
  ...
  "deploy": "npm run build && gh-pages -d dist"
}

# 4. 배포
npm run deploy
```

## 📝 저장소 설명 추가

GitHub 저장소 페이지에서:
1. `About` 섹션의 ⚙️ 아이콘 클릭
2. Description 추가: "구구단 산성비 게임 - 초등학생을 위한 곱셈 학습 게임"
3. Topics 추가: `react`, `typescript`, `education`, `game`, `vite`
4. Website 추가 (GitHub Pages URL)

## 🔒 .gitignore 확인

이미 `.gitignore` 파일이 생성되어 있어 다음 파일들은 자동으로 제외됩니다:
- `node_modules/` (의존성 패키지)
- `dist/` (빌드 결과물)
- `.env` (환경 변수)

## 🤝 협업하기

다른 사람을 초대하려면:
1. 저장소 Settings → Collaborators
2. Add people 클릭
3. GitHub 아이디 입력

## 📊 README 배지 추가 (선택)

README.md 상단에 멋진 배지를 추가할 수 있습니다:

```markdown
![GitHub stars](https://img.shields.io/github/stars/YOUR-USERNAME/multiplication-rain?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR-USERNAME/multiplication-rain?style=social)
![License](https://img.shields.io/github/license/YOUR-USERNAME/multiplication-rain)
```

## 🆘 문제 해결

### Git 설치 확인
```bash
git --version
```
버전이 표시되면 정상 설치됨

### 권한 오류
```bash
git config credential.helper store
```

### 푸시 오류 (rejected)
```bash
git pull origin main --rebase
git push origin main
```

## 🎉 완료!

성공적으로 GitHub에 업로드되었습니다! 
이제 다른 사람들과 프로젝트를 공유할 수 있습니다.

저장소 URL: `https://github.com/YOUR-USERNAME/multiplication-rain`

