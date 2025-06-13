# 📄 Google Sheets Integration via Google Apps Script

이 프로젝트는 Google Apps Script를 활용하여 Google Sheets를 간단한 RESTful API처럼 사용하는 웹 애플리케이션입니다.
프론트엔드에서 Google Sheets를 데이터베이스처럼 사용할 수 있습니다.

🚀 주요 기능

-   ✅ Google Sheets를 REST API처럼 사용 (GET, POST, PUT, PATCH)

-   ✅ gh-pages로 배포된 프론트엔드

-   ✅ 자동 버전 증가 기능

📁 프로젝트 구조

🛠️ 설치 및 실행

## 의존성 설치

npm ci

## 앱 로컬 실행

npm run dev

## 배포 (버전 자동 증가 + gh-pages)

npm run deploy

## 🧩 Google Apps Script 구성

| Method  | 설명             | 필요 파라미터               |
| ------- | ---------------- | --------------------------- |
| `GET`   | 전체 데이터 조회 | `sheet`                     |
| `POST`  | 새 행 추가       | `sheet`, 필드 전체          |
| `PUT`   | 전체 행 덮어쓰기 | `sheet`, `id`, 필드 전체    |
| `PATCH` | 일부 필드만 수정 | `sheet`, `id` , 필드 일부부 |

## 🧪 프론트엔드 사용 예시

```typescript
const sheet = new GoogleSheet({ url: 'https://script.google.com/macros/s/AKfycb.../exec' });

await sheet.POST({
    sheet: 'Users',
    name: 'Alice',
    email: 'alice@example.com'
});

await sheet.PATCH({
    id: '6',
    name: 'new-name'
});
const data = await sheet.GET({ sheet: 'Users' });

console.log(data);
```

## 🔐 보안 참고

이 스크립트는 누구나 접근 가능한 Web App으로 배포되어야 합니다:

"웹 앱으로 배포" 시 "익명 사용자에게 액세스 허용" 선택

데이터에 민감한 정보가 있다면 인증 처리가 필요합니다

## 📜 라이선스

MIT License

## 🙋‍♀️ 배포 주소

[google-sheet](https://hoonbeom.github.io/google-sheet/)
