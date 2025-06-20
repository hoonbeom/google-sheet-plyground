# 🚀 Google Sheet Playground

구글 시트를 RESTful API처럼 사용할 수 있는 인터랙티브 웹 애플리케이션입니다.
프론트엔드에서 Google Sheets를 데이터베이스처럼 활용할 수 있도록 Google Apps Script를 활용한 playground입니다.

## ✨ 주요 기능

-   📊 **Google Sheets 연동**: Google Apps Script를 통한 실시간 데이터 동기화

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm ci
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저에서 확인

```
http://localhost:5173
```

## 📋 API 사용법

### GET - 데이터 조회

```typescript
// 모든 데이터 조회
await googleSheet.GET({ sheet: 'Sheet1' });
```

### POST - 새 데이터 추가

```typescript
// 필수 필드: name, age, good
await googleSheet.POST({
    sheet: 'Sheet1',
    name: '홍길동',
    age: '25',
    good: '친절함'
});
```

### PUT - 데이터 전체 수정

```typescript
// 필수 필드: id, name, age, good
await googleSheet.PUT({
    sheet: 'Sheet1',
    id: '1',
    name: '김철수',
    age: '30',
    good: '성실함'
});
```

### PATCH - 데이터 부분 수정

```typescript
// 필수 필드: id (나머지는 선택)
await googleSheet.PATCH({
    sheet: 'Sheet1',
    id: '1',
    name: '이영희' // 선택적 수정
});
```

## 🎯 UI 가이드

### 데이터 입력 섹션

1. **POST 요청** (파란색 테마)

    - `name`, `age`, `good` 필드만 표시
    - 모든 필드가 필수

2. **PUT 요청** (노란색 테마)

    - `id`, `name`, `age`, `good` 모든 필드 표시
    - 모든 필드가 필수

3. **PATCH 요청** (보라색 테마)
    - `id` 필드만 필수
    - `name`, `age`, `good`은 선택사항

### API 버튼

-   🟢 **GET**: 모든 데이터 조회
-   🔵 **POST**: 새 데이터 추가 (name, age, good 필요)
-   🟡 **PUT**: 데이터 수정 (id, name, age, good 필요)
-   🟣 **PATCH**: 부분 수정 (id 필요)

## 🔧 Google Apps Script 설정

### 1. Google Apps Script 프로젝트 생성

1. [Google Apps Script](https://script.google.com/) 접속
2. 새 프로젝트 생성
3. `google-app-script.js` 파일의 코드 복사

### 2. 웹 앱으로 배포

1. "배포" → "새 배포" 클릭
2. "유형 선택" → "웹 앱" 선택
3. **중요**: "액세스 권한" → "익명 사용자에게 액세스 허용" 선택
4. 배포 후 생성된 URL을 `GoogleSheet`의 `url`에 등록

## 🚀 배포

## 🔐 보안 고려사항

⚠️ **주의**: 이 프로젝트는 데모 목적으로 제작되었습니다.

-   Google Apps Script는 "익명 사용자에게 액세스 허용"으로 설정되어 있어 누구나 데이터에 접근 가능
-   민감한 데이터가 있다면 인증 처리가 필요
-   프로덕션 환경에서는 적절한 보안 조치 필요

## 📊 Google Sheets 구조

기본적으로 다음 컬럼 구조를 가정합니다:

| ID  | Name   | Age | Good   |
| --- | ------ | --- | ------ |
| 1   | 홍길동 | 25  | 친절함 |

## 🌐 라이브 데모

[Google Sheet Playground](https://hoonbeom.github.io/google-sheet-playground/)

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
