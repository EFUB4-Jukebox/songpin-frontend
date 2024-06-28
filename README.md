# 🎶 SONGPIN 🎵

## 💻 프로젝트 소개

장소에는 기억과 소리가 담깁니다.
여러분이 언젠가 여행을 떠났을 때 들었던 음악을 기억하나요?
여행지에서 많이 들은 음악은 곧, 그 장소의 분위기를 상징하고 기억할 수 있는 추억을 지닌 음악이 됩니다.
여행이 끝나도 사람들은 그 음악을 들으면서 행복했던 여행의 순간들을 생생하게 회상합니다.
여기에서 'SongPin'이라는 프로젝트 아이디어가 탄생했습니다.
<br>

## ⏰ 개발 기간

- 24.07.01 - 진행중

## 📝 규칙

- `커밋 컨벤션`
  - gitmoji를 사용하는 것을 원칙으로 함.
  - 깃모지 + 한글 커밋 메시지 형식으로 작성
  - Gitmoji 컨벤션 예시
    - 💄 :lipstick: UI, 스타일 관련 파일 추가 및 수정
    - ✨ :sparkles: 새로운 기능 추가, 구현
    - 💬 :speech_balloon: 텍스트 또는 리터럴 추가 및 수정
    - 🍱 :bento: asset 파일(이미지, 아이콘 등) 추가
    - 📝 :memo: 문서 파일 추가 및 수정
    - ♿️ :wheelchair: 웹 접근성 향상을 위한 코드 추가 및 수정
    - ✏️ :pencil2: 단순 오타 수정
    - 🐛 :bug: 버그 수정
    - 🩹 :adhesive_bandage: 단순한, critical하지 않은 이슈 수정
    - 🚚 :truck: 파일, 경로, route를 옮기거나 이름 변경
    - ♻️ :recycle: 코드 리팩토링
    - 🔥 :fire: 삭제(파일, 코드)
    - 🙈 :see_no_evil: gitignore 추가 및 수정

<br>

- `PR 템플릿`
  ```
  # 구현 기능
    - 구현한 기능을 요약하여 정리합니다.

  # 구현 상태 (선택)
    - img, gif, video...
    - 혹은 내용 정리

  # Resolve
    - 이슈 태그(ex: #7)
  ```

  - PR 체크 리스트
    -  PR 제목 형식 : `[type] PR 제목`
        - ex. `[Chore] 프로젝트 구조 설정`
        - 타입은 대문자로
    -  label 설정
    -  Code Review 요청 / 작업자 Assign
    -  PR 확인한 사람은 확인 코멘트 달기. 2명 이상 확인하면 merge (마지막 사람이 merge)
      
<br>

- `issue 규칙`
  - 각 기능에 맞는 이슈템플릿 작성 (작업 및 변경사항 확인용)
  - to-do에 구현해야할 기능과, 구현이 끝나면 체크표시

<br>

- `branch 규칙`
  - 깃 플로우
      - `feature -> develop -> main(master)`
  - 이슈 생성후, branch에서 추가할 내용(ex. feat, design, refactor, ...)과 이슈번호를 branch 이름으로 생성
    - 예시: feat/#12, design/#27
