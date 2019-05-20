# 도로시(Dorothy)

제2회 미림소프트웨어 대회 최우수상 : Dorothy(도로시) - 동아리 홍보부터 신청까지 한 번에 해결해주는 미림의 동아리 종합 관리 솔루션

## Website

http://15.164.96.117/

## Features

* 동아리 웹 사이트 제작 및 조회
    * 각 동아리별로 간단한 `동아리 소개`, `활동 사진` 및 `내용`, `목표`, `면접 날짜`, 그리고 `동아리 신청 폼` 등을 보여주는 전용 웹사이트를 제작해줍니다.
* 동아리 신청하기 및 신청 정보 조회하기
    * 신입생들이 원하는 동아리에 `신청서`를 내고 동아리 부장들은 신청한 학생들의 신청 정보를 열람할 수 있는 기능을 제공합니다.
* 동아리 면접 캘린더
    * 이중지원을 사전에 방지하고 동아리별 면접 날짜 및 시간을 보다 쉽게 확인할 수 있게 면접 날짜를 표시한 `캘린더 기능`을 제공합니다.
* 반응형 구현
    * 반응형으로 구현되어 모바일 화면을 지원합니다.

## 실행 화면

> ![메인화면](https://user-images.githubusercontent.com/32327475/57597609-079acc00-758b-11e9-8e19-c1ec8c880a91.png)
**메인화면**

> ![로그인](https://user-images.githubusercontent.com/32327475/57597624-11bcca80-758b-11e9-8bf5-39b81f44f7c9.png)
**로그인**

> ![회원가입](https://user-images.githubusercontent.com/32327475/57597628-17b2ab80-758b-11e9-98ef-7437f05a6cfc.png)
**회원가입**

> ![동아리소개](https://user-images.githubusercontent.com/32327475/57661216-da9af780-7624-11e9-8e60-af999d873423.png)
**동아리소개**

> ![면접날짜캘린더](https://user-images.githubusercontent.com/32327475/57597640-2c8f3f00-758b-11e9-8965-5b7cd6ead0b0.png)
**면접날짜캘린더**

> ![신청폼](https://user-images.githubusercontent.com/32327475/57597657-403aa580-758b-11e9-9cda-7d62b291d7f3.png)
**신청폼**

> ![신청자조회](https://user-images.githubusercontent.com/32327475/57597651-39ac2e00-758b-11e9-80b1-c8633bff8dd7.png)
**신청자조회**


## Development setup

* you need to create `config.js` file.

```sh
npm install
npm start
```

## Deploying

```sh
git push heroku master
```

## Built With

* [Heroku](https://www.heroku.com/) - Server Hosting
* [Node.js/Express framework](https://expressjs.com/ko/) - Back-end Development
* [Bootstrap](https://getbootstrap.com/) - Front-end Development
* [MongoDB](https://www.mongodb.com/) - Database
* [mlab](https://mlab.com/) - MongoDB Hosting
* [Cloudinary](https://cloudinary.com/) - Image Hosting

## Contributing

1. Fork it (<https://github.com/wisemuji/Dorothy_server/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Authors

* **Suhyeon Kim** - *PM, Back-end Development* - [wisemuji](https://github.com/wisemuji)
* **Yebin Kim** - *Front-end Development* - [girincute](https://github.com/girincute)

See also the list of [contributors](https://github.com/wisemuji/Dorothy_server/contributors) who participated in this project.

