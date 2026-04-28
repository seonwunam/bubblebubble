# TETRIS · PERI Edition

> 모던 테트리스를 PERI Design DNA v2 기반으로 재해석한 단일 페이지 PWA(Progressive Web App).

## 패키지 구성

| 파일 | 역할 |
|---|---|
| `index.html` | 게임 본체 — HTML/CSS/JS 단일 파일, 외부 의존성 없음 |
| `manifest.json` | PWA 매니페스트 — 설치형 웹앱 메타데이터 |
| `sw.js` | Service Worker — 첫 방문 후 완전 오프라인 플레이 지원 |
| `icon.svg` | 벡터 앱 아이콘 (PERI 트리컬러) |
| `icon-192.png` | PWA 아이콘 192×192 |
| `icon-512.png` | PWA 아이콘 512×512 (홈 추가·앱 마켓 표시용) |

## 로컬 실행 — 가장 빠른 방법

가벼운 정적 서버로 띄우면 PWA 기능까지 모두 동작합니다.

**Python 3 (사전설치 불필요)**
```bash
cd tetris-peri-edition
python3 -m http.server 8080
# 브라우저에서 http://localhost:8080 접속
```

**Node.js**
```bash
npx serve tetris-peri-edition
```

> ⚠️ `index.html`을 더블클릭(file://)해도 게임은 실행되지만, Service Worker는 보안상 비활성화됩니다. 오프라인 PWA 기능까지 테스트하려면 반드시 HTTP 서버를 사용하세요.

## 모바일 홈 화면 추가 (앱처럼 사용)

1. 모바일 브라우저(iOS Safari · Android Chrome)에서 배포 URL 접속
2. **공유 → 홈 화면에 추가** 선택
3. PERI 아이콘으로 설치된 앱 실행 → 풀스크린 게임 모드

## 배포 옵션

정적 파일만으로 구성되어 있어 어떤 정적 호스팅에도 그대로 업로드 가능합니다.

| 호스트 | 명령 / 절차 |
|---|---|
| **Netlify Drop** | `tetris-peri-edition` 폴더를 [app.netlify.com/drop](https://app.netlify.com/drop)에 드래그 |
| **Vercel** | `vercel --prod` (해당 폴더에서) |
| **GitHub Pages** | 폴더 커밋 후 Settings → Pages → 브랜치 선택 |
| **Cloudflare Pages** | 폴더 업로드 또는 Git 연동 |
| **사내 정적 서버** | nginx / apache 의 document root에 그대로 복사 |

배포 시 **HTTPS 필수** (Service Worker · 모바일 PWA 설치 요건).

## 컨트롤

| 동작 | 키 |
|---|---|
| 좌·우 이동 | `←` `→` |
| 회전 (시계방향) | `SPACE` `↑` `X` |
| 회전 (반시계방향) | `Z` |
| 소프트 드롭 ×12 | `↓` (홀드) |
| 하드 드롭 | `Shift` |
| Hold | `C` |
| Pause | `P` `ESC` |
| Start / Resume | `Enter` |

모바일은 화면 하단 터치 패드로 동일 조작.

## 게임 사양

- **플레이필드**: 표준 10 × 20
- **랜덤화**: 7-bag (한 사이클 내 7종 모두 정확히 1회 등장)
- **회전**: SRS (Super Rotation System) + 월킥
- **점수 체계** (가이드라인): 1줄 100 · 2줄 300 · 3줄 500 · **테트리스 800** × 레벨
- **레벨 상승**: 10라인마다 1레벨 (속도 가속)
- **고급 기능**: Hold · Ghost Piece · Next 3 Preview
- **사운드**: Web Audio API 합성 — BGM(Korobeiniki, Public Domain) + 효과음 9종
- **저장**: localStorage 기반 최고점수 영구 보존

## 디자인

PERI Design DNA v2 100% 준수:

- 화이트 도미넌트 배경 (55%+)
- 0px radius · 무 그림자 · 무 그라디언트
- L-bracket 모티브 (10px PERI Yellow 좌측 바) 패널 7곳
- 보드 트리컬러 프레임: 좌 Yellow / 우 Red / 상하 Grey
- PERI Yellow `#FFC300` · PERI Red `#DC0032` · Grey `#333333` 시그니처
- 보드 중앙 흐릿한 PERI 워터마크 (브랜드 존재감)
- Univers LT CYR (display) + Roboto (body) 폰트 페어

## 라이선스 / 출처

- 게임 코드: 자체 제작
- BGM 멜로디: Korobeiniki (러시아 민요, Public Domain)
- PERI 로고 · 컬러: PERI 본사 공식 브랜드 자산
- Tetris® 상표: The Tetris Company 소유 — 본 프로젝트는 학습·내부 데모 용도

---

**Build**: 2026-04-27 · PERI Korea Internal
