# 4주차 과제: React - Mashup

<br>

# 서론

안녕하세요 🙌🏻 24기 프론트엔드 운영진 **권오진**입니다.

다들 지난 3주 동안 미션을 진행하시느라 정말 수고 많으셨습니다. 지금까지 미션을 통해 **Vanilla JS**로 직접 서비스를 구현하며 느낀 불편함을 바탕으로, **React로 전환**하였습니다. 컴포넌트 기반의 개발 방식과 React Hooks 및 Zustand를 활용한 상태 관리, API 연동을 통해 클라이언트와 서버가 요청·응답을 주고 받는 과정과 데이터 처리 방식에 대해 경험해보셨을 거라 생각합니다.

이번 미션은 지금까지 학습한 내용을 종합하여, 전체 세션에서 팀별로 진행하고 있는 **Mashup 구현**을 진행합니다

프로젝트의 규모가 커질수록 컴포넌트 수가 많아지고, 컴포넌트 간의 전달되는 props와 API에서 주고받는 데이터 구조 역시 복잡해집니다. 이때 **TypeScript를 활용하면** props, 상태, API 요청·응답 데이터 등의 타입을 명확하게 정의할 수 있어 코드 의도를 쉽게 파악할 수 있습니다. 또한 개발 과정에서 잘못된 타입 사용으로 발생할 수 있는 오류를 미리 발견할 수 있으며, 자동 완성과 안전한 리팩터링 등의 도움을 받을 수 있어 **프로젝트 규모가 커질수록 코드의 안정성과 유지보수성을 높이는 데 큰 도움이 됩니다.** 이번 미션에서는 실제 프로젝트에서 TypeScript를 어떻게 활용할 수 있을지도 함께 고민해보시면 좋겠습니다.

아울러 이번 미션은 **중간고사 휴회 기간을 포함하여 긴 기간 동안 진행되는 팀 단위 미션**입니다. 개인 과제와 달리 한 사람의 일정이 팀 전체의 개발 일정에도 영향을 줄 수 있으니 중간고사 준비 및 개인 일정을 고려하여 **팀원들과 작업 범위와 일정을 공유하고 조율해주세요.** 적지 않은 시간이 주어진 만큼 서로의 진행 상황을 꾸준히 공유하고, 필요한 부분에 대해 함께 의견을 나누며 완성해보시길 바랍니다.

과제를 진행하다가 막히는 부분이 있더라도, 우선은 스스로 공부하고 찾아보며 해결해보는 과정을 권장드립니다. 다만 미션과 관련해 운영진의 도움이 필요하다면, 언제든 프론트엔드 카카오톡 및 팀별 멘토에게 질문을 남겨주세요!

<br>

# 과제

## 🎯 목표

- 협업을 통해 **효율적인 역할 분담**을 고민하고 적용합니다.
- API 문서를 바탕으로 백엔드와 소통하는 방법을 학습합니다.
- Tailwind CSS로 스타일링하여 **일관된 디자인 시스템**을 구축합니다.
- React Router를 사용해 **페이지 간 라우팅을 구현**하고, 동적 경로와 URL 파라미터를 이해합니다.
- TypeScript를 적극적으로 활용하여 **코드의 타입 안정성**을 확보합니다.

## 📅 기한

- **2026년 10월 30일 일요일 14:00까지**

## 💬 Review Questions

- 전반적인 협업 과정에 대해 알려주세요 ✏️
- 팀에서 중요하게 논의했던 내용과 실제로 적용한 방식을 중심으로 작성해 주세요.
- 협업에 대한 이전 기수(messenger, netflix, vote) PR 및 아래 가이드를 참고하시면 좋습니다!
```
패키지 매니저 선택
- npm, yarn, pnpm 중 무엇을 사용했는지
- 해당 패키지 매니저를 선택한 이유
- 팀 내에서 버전이나 lock 파일을 어떻게 관리했는지

API 통신 방식
- fetch, axios, ky 등 어떤 방식을 사용했는지
- 해당 방식을 선택한 이유
- API 요청 코드를 컴포넌트 내부 혹은 별도의 api, service로 분리했는지

서버 데이터 관리 방식
- 단순 useEffect + useState를 사용했는지
- TanStack Query 같은 서버 상태 관리 라이브러리를 도입했는지
- 도입했다면 캐싱, 로딩 상태, 에러 처리 등을 어떻게 관리했는지

상태 관리 기준
- 어떤 상태를 컴포넌트 내부 상태로 관리했는지
- 어떤 상태를 Zustand와 같은 전역 상태로 관리했는지
- 서버 상태와 클라이언트 상태를 어떻게 구분했는지

라우팅 구조
- React Router 등의 라우팅 라이브러리를 어떻게 구성했는지
- 페이지별 Route 구조를 어떤 기준으로 나눴는지
- 인증 여부에 따른 라우팅이 있다면 어떻게 처리했는지

폴더 / 파일 구조
- components, pages, hooks, api, store, types 등을 어떤 기준으로 나눴는지
- 기능 중심(feature-based)인지 역할 중심인지
- 파일 및 컴포넌트 naming convention은 어떻게 정했는지
- 공통 컴포넌트 및 공통 UI(Button, Input, Modal 등)를 어떻게 구분했는지
- 페이지 전용 컴포넌트와 재사용 컴포넌트를 어떻게 구분했는지

환경변수 관리
- API Base URL 등을 .env로 어떻게 관리했는지
- 개발/배포 환경에 따라 설정을 어떻게 구분했는지
- 에러 / 로딩 처리를 어떻게 처리했는지
- API 요청 중 Loading UI를 어떻게 처리했는지
- 요청 실패 시 사용자에게 어떤 방식으로 안내했는지
- 예외 처리를 어느 위치에서 담당하도록 했는지

Git / GitHub 협업 방식
- branch 전략
- commit convention
- PR 작성 방식
- merge 방식
- Issue를 활용했다면 Issue 관리 방식

팀 내 역할 분담과 작업 공유
- 페이지 기준으로 나눴는지, 기능 기준으로 나눴는지
- 공통 컴포넌트 작업은 누가 담당했는지
- 작업 충돌을 어떻게 방지했는지
- 진행 상황을 어떤 방식으로 공유했는지
```
참고) [README 파일 작성 완벽 가이드](https://javaexpert.tistory.com/1511)

## 💡 필수 요건
### Mashup FE 과제 요건
- 역기획한 요구사항을 충족해야 합니다.
- 백엔드와 합의된 응답형식으로 실제 API가 연동되어 정상적으로 동작해야 합니다.
- 로딩 / 빈 화면 / 에러 상태를 처리해야 합니다.
- 사용자 입력값 검증과 에러 메시지를 구현해야 합니다.
- 인증 및 권한에 따라 올바른 UI가 제공되어야 합니다.
- 중복 요청이 발생하지 않도록 처리해야 합니다.
- 주요 화면 크기에서 레이아웃이 깨지지 않아야 합니다.
- 구현한 코드는 PR 리뷰 후 기본 브랜치에 병합되어야 합니다.

### 📝 README 작성
- 구현한 프로젝트의 내용을 정리하여 **`README.md` 파일**을 작성합니다.
- 실제 프로젝트에서 사용하는 README를 작성한다는 생각으로 프로젝트의 주요 내용을 정리해주세요.
#### README 작성 관련 자료
- [README 작성 템플릿](https://wikidocs.net/367646)
- [README.md 작성하기 - 마크 다운 문법](https://backendcode.tistory.com/165)


### 🚨주의사항🚨
- 5주차 세션 때 팀 별 Mashup 과제를 **모든 팀이 발표할** 예정입니다.
- 과제 PR 작성 및 제출 팀원과 과제 발표 팀원을 **다르게 해주세요**‼️

### ⚠️과제 제출⚠️
- 제출 기한까지 필수 구현 사항이 전부 적용된 최종 결과물을 제출해주세요.
- 과제 제출은 `git remote` 를 활용해서 제출해주세요.
  - [Git의 기초 - 리모트 저장소](https://git-scm.com/book/ko/v2/Git%EC%9D%98-%EA%B8%B0%EC%B4%88-%EB%A6%AC%EB%AA%A8%ED%8A%B8-%EC%A0%80%EC%9E%A5%EC%86%8C)
  - [깃헙 - 원격 저장소 연동 정리 (git remote / push / pull)](https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-%EA%B9%83%ED%97%99-%EC%9B%90%EA%B2%A9-%EC%A0%80%EC%9E%A5%EC%86%8C-%EA%B4%80%EB%A6%AC-git-remote#2._git_remote_remote_repository_%EC%97%B0%EA%B2%B0)
  - [원격 저장소 연결 (git remote)](https://wikidocs.net/332832)

# 링크 및 참고자료

## React & TypeScript

- [빠르게 시작하기 - React](https://ko.react.dev/learn)
- [리액트의 Hooks 완벽 정복하기](https://velog.io/@velopert/react-hooks#1-usestate)
- [useEffect 가이드](https://overreacted.io/a-complete-guide-to-useeffect/)
- [타입스크립트 핸드북](https://joshua1988.github.io/ts/intro.html)

## Design

- [디자인 시스템 구축기](https://yozm.wishket.com/magazine/detail/1830/)
- [(영상)디자인 시스템, 형태를 넘어서](https://www.youtube.com/watch?v=21eiJc90ggo)
- [Tailwind CSS 핵심 패턴](https://www.heropy.dev/p/E67ZHS)

## Social Login

- [카카오 로그인 > 이해하기 - 카카오디벨로퍼](https://developers.kakao.com/docs/ko/kakaologin/common)
- [[ React ] 정말 쉽다! 카카오 소셜 로그인 프론트에서 이해하고 구현하기](https://velog.io/@pakxe/React-%EC%A0%95%EB%A7%90-%EC%89%BD%EB%8B%A4-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B3%A0-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
- [[React] 구글 로그인 구현하기](https://velog.io/@39busy/React-Social-Login)

## 배포

- [프론트엔드 배포 완전 정리 — 웹부터 앱까지](https://velog.io/@mountainstar/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%B0%B0%ED%8F%AC-%EC%99%84%EC%A0%84-%EC%A0%95%EB%A6%AC-%EC%9B%B9%EB%B6%80%ED%84%B0-%EC%95%B1%EA%B9%8C%EC%A7%80)
- [우리는 Vercel로 간다! 프론트엔드 배포 가이드](https://www.yolog.co.kr/post/vercel-deployment/)
- [.env 파일이란? + 생성하기](https://hongssup.tistory.com/entry/%EB%A7%A4%ED%81%AC%EB%A1%9C)

## 성능 측정 및 최적화

- [Lighthouse 소개](https://developer.chrome.com/docs/lighthouse/overview?hl=ko)
- [Lighthouse로 웹 성능 측정하고 개선하기](https://velog.io/@khy226/Lighthouse%EB%A1%9C-%EC%9B%B9-%EC%84%B1%EB%8A%A5-%EC%B8%A1%EC%A0%95%ED%95%98%EA%B3%A0-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)
- [React 성능 최적화 완벽 가이드: Vercel의 45가지 실전 기법](https://velog.io/@jihyeong00/React-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-%EC%99%84%EB%B2%BD-%EA%B0%80%EC%9D%B4%EB%93%9C-Vercel%EC%9D%98-45%EA%B0%80%EC%A7%80-%EC%8B%A4%EC%A0%84-%EA%B8%B0%EB%B2%95)
- [Speed Insights Overview](https://vercel.com/docs/speed-insights)
- [Improved Speed Insights experience](https://vercel.com/changelog/improved-speed-insights-experience)
