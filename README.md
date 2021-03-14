# J054 TODO 리스트

스프린트 3-4주차 웹 프로젝트 - 할일관리

## 프로젝트 설명

**J054 TODO 리스트**는 Github project나 Trello와 유사한 방식으로 프로젝트 관리, 스케줄 관리를 할 수 있게 도와주는 웹 어플리케이션입니다.

**Express.js**로 백엔드 서버를 구현했고, 프론트엔드는 **Vanilla JS**만을 이용해서 SPA 구현을 했습니다.

## Documents

프로젝트를 진행하면서 생성되는 모든 문서는 다음 notion 링크에서 확인할 수 있습니다.
- [요구사항](https://www.notion.so/kkole3897/dc4fa9c833d3405bb07637bbd9696204)
- [로드맵](https://www.notion.so/kkole3897/b459f2157bce42f99dcb9ff09253767c?v=194ca07169704d90b3c4532bc4b42d0f)
- [테이블 스키마](https://www.notion.so/kkole3897/DB-71cd55ad486b42438c75ba452f723941)

## 구현 기능

- [x] 로그인
- [ ] 로그아웃
- [ ] 회원가입
- [x] 새로운 보드 생성
- [x] 새로운 카드 생성
- [x] 보드 이름 업데이트
- [x] 카드 내용 업데이트
- [x] 보드 삭제
- [x] 카드 삭제
- [x] 보드 이동
- [x] 카드 이동
- [ ] 페이지 라우팅

## Getting Started

- 시작하기 전에 client, server 디렉토리 최상단에 sample.env에 맞게 .env 파일 작성
- MySQL 8.0 이상 설정 필요
- 백엔드 서버 시작하기
```bash
cd server
npm i
npm start
```
- 프론트엔드 Dev 서버 시작하기
```bash
cd client
npm i
npm start
```
- 프론트엔드 파일 번들링
```bash
cd client
npm i
npm run build
```

## Demo

1. 보드 추가

![add_board](https://user-images.githubusercontent.com/47937211/111083645-e70a7700-8551-11eb-88f4-563865ade0cd.gif)

2. 카드 추가

![add_card](https://user-images.githubusercontent.com/47937211/111083738-53857600-8552-11eb-9910-d865fb7910c0.gif)

3. 카드 이동

![move_card](https://user-images.githubusercontent.com/47937211/111083996-cb07d500-8553-11eb-82c1-119549bce380.gif)

4. 카드 수정

![edit_card](https://user-images.githubusercontent.com/47937211/111084048-ed015780-8553-11eb-807d-7be2d9559353.gif)

5. 카드 삭제

![delete_card](https://user-images.githubusercontent.com/47937211/111084079-02768180-8554-11eb-9b9d-17519cc182f7.gif)

6. 보드 수정

![edit_board](https://user-images.githubusercontent.com/47937211/111084098-1a4e0580-8554-11eb-8686-70b6355fed59.gif)

7. 보드 이동

![move_board](https://user-images.githubusercontent.com/47937211/111084117-33ef4d00-8554-11eb-9c52-19555cf485e3.gif)

8. 보드 삭제

![delete_board](https://user-images.githubusercontent.com/47937211/111084133-45d0f000-8554-11eb-96e1-d45a51cee6cc.gif)

## Author

**김진관**

- GitHub: [@kkole3897](https://github.com/kkole3897)
- email: kkole3897@naver.com
