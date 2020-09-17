# J054 TODO 리스트
스프린트 3-4주차 웹 프로젝트 - 할일관리

## 프로젝트 설명

**J054 TODO 리스트**는 Github project나 Trello와 유사한 방식으로 프로젝트 관리, 스케줄 관리를 할 수 있게 도와주는 웹 어플리케이션이다.

## Documents

프로젝트를 진행하면서 생성되는 모든 문서는 다음 notion 링크에서 확인할 수 있다.
- [요구사항](https://www.notion.so/kkole3897/dc4fa9c833d3405bb07637bbd9696204)
- [로드맵](https://www.notion.so/kkole3897/b459f2157bce42f99dcb9ff09253767c?v=194ca07169704d90b3c4532bc4b42d0f)
- [테이블 스키마](https://www.notion.so/kkole3897/DB-71cd55ad486b42438c75ba452f723941)

## 프로젝트 진행 과정

### DAY1

- 클라우드 서버
  - Naver Cloud Platform - micro server
  - MySQL 설치 및 외부 접근 설정
  - nodejs 배포 환경 설정
- 개발 환경 구축
  - express-generator로 express 구조 생성

### DAY2

- pm2로 배포 자동화 설정
- 클라우드 서버 mysql 비밀번호 오류로 클라우드 서버 반납 후 다시 설정
- [테이블 스키마](https://www.notion.so/kkole3897/DB-71cd55ad486b42438c75ba452f723941) 설계, 테이블 생성
  - User
  - List
  - Card
  - Log

### DAY3

- 로그인 기능 구현
  - express-session 모듈 사용
- Card 테이블 접근 기능 구현, 모듈화(models/card.js)

### DAY4

- Card 데이터를 조작하는 api 구현
  - Rest 원칙 적용하려고 했지만 업데이트 필요
  - 카드 생성
  - 카드 내용 수정
  - 카드 삭제
  - 카드 이동
- Postman으로 api 테스트
- dotenv 모듈로 DB 접속 정보 별도로 관리

## Author

**김진관**

- GitHub: [@kkole3897](https://github.com/kkole3897)
- email: kkole3897@naver.com
