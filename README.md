# Bubble Dragons — 서연 & 아빠 (PWA)

안드로이드(또는 아이폰/PC)에 **앱처럼 설치해서 즐기는** 2인 협동 보글보글 스타일 게임.

## 📦 포함 파일
| 파일 | 역할 |
|------|------|
| `index.html` | 게임 본체 (단일 파일, 모든 로직 포함) |
| `manifest.json` | PWA 매니페스트 (앱 이름·아이콘·전체화면 설정) |
| `sw.js` | 서비스 워커 (오프라인 캐시) |
| `icon-192.png` / `icon-512.png` | 홈 화면 아이콘 |

## 📱 안드로이드 설치 방법 (권장: 무료 호스팅 2분 셋업)

### 방법 A — Netlify Drop (가장 간단, 계정 불필요)
1. 이 zip을 푼 폴더 전체를 [https://app.netlify.com/drop](https://app.netlify.com/drop) 에 드래그 앤 드롭
2. 생성된 `https://xxxxx.netlify.app` 주소를 **안드로이드 Chrome**으로 연다
3. 우상단 ⋮ 메뉴 → **"앱 설치"** 또는 **"홈 화면에 추가"** 선택
4. 홈 화면 아이콘 탭 → 전체화면 앱처럼 실행

### 방법 B — GitHub Pages
1. GitHub 저장소 만들고 파일 업로드
2. Settings → Pages → main 브랜치 루트 배포
3. 생성된 주소를 안드로이드 Chrome에서 열고 "홈 화면에 추가"

### 방법 C — 로컬 네트워크 테스트 (같은 Wi-Fi)
```bash
cd bubble-dragons-pwa
python3 -m http.server 8080
```
안드로이드 Chrome에서 `http://[PC의 IP]:8080` 접속. ⚠️ 서비스 워커는 HTTPS에서만 동작하므로 오프라인 캐시는 제한됨.

## 🎮 조작법
- **서연 (초록)**: 방향키 이동 / ↑ 점프 / SPACE 방울 (안드로이드는 좌측 패드)
- **아빠 (파랑)**: WASD 이동 / W 점프 / F 방울 (안드로이드는 우측 패드)
- 모바일은 화면 하단에 자동으로 가상 패드가 나타남

## ⏰ 특별 규칙
- 스테이지별로 적군 색상 변화 (보라 → 주황 → 파랑 → 빨강 → 녹색 → 황금)
- 적 처치 시 음식 드롭 (🍎🍉🍰🍔🍦🍬 중 랜덤)
- **플레이 5분 경과 시 무적 유령 등장 — 물리칠 수 없으니 도망만!**

## 🛠 요구 사항
- HTTPS 환경 (PWA 설치 및 서비스 워커 동작을 위해)
- 안드로이드 Chrome 67+ / iOS Safari 11.3+ / 데스크톱 최신 브라우저

## 🎵 BGM 커스터마이징
- 기본: Web Audio API로 생성하는 치원 멜로디 (C-Am-F-G 해피 루프, 0.035 볼륨)
- 커스텀 음악: `bgm.mp3` 파일을 `index.html`과 같은 폴더에 넣으면 자동 재생
- 추천 BGM 후보 (~/Desktop/claude/BG/):
  - `MP_시작하는 즐거움.mp3` ⭐ 가장 권장
  - `Feel-Good.mp3`
  - `MP_긍정의 에너지.mp3`
  - `희망찬 느낌/Feel-Good.mp3`
