# Movie_Project
### 🖥️프로젝트 소개
TMDB를 활용하여 바닐라 자바스크립트만으로 영화 리스트 조회 및 검색 UI를 구현하였습니다.

<br> 

### 🕰️개발 기간
- 24.04.23 ~ 24.04.28

<br>

### 📌기능
- 검색창에 영화제목에 포함된 문자를 입력하면 대소문자 상관없이 문자가 포함된 영화 리스트가 나열됩니다.
- 마우스를 카드위에 올려놓으면 카드배경색과 글씨색이 바뀌면서 마우스의 이동이 강조됩니다.
- 카드 클릭시 영화 포스터와 id가 담긴 모달창이 보여집니다.
- 사이트 제목창인 "Top Rated Movie List" 를 클릭시 새로고침됩니다.

  <br> 

### 💠와이어프레임
- 메인페이지
 
<img src="https://github.com/yeseul0809/Movie_Project/assets/166012944/ce15cf1c-0e87-4f48-ac28-440052d72cfd" width="70%"><img >
  ---
- 모달팝업
  
<img src="https://github.com/yeseul0809/Movie_Project/assets/166012944/7d6b73d4-fd86-436c-8d1f-79d7374079c0" width="20%"><img >
 ---
<br>

### 🗂️폴더구조
```
📦MOVIE
┣ 📂modules
┃ ┣📜display.js
┃ ┗📜main.js
┣ 📂style
┃ ┣📜card.css
┃ ┣📜layout.css
┃ ┗📜swal.css
┗ 📜index.html
```
<br>

### 🗄️파일설명
- display.js : 입력받은 문자와 영화제목을 비교하여 동적으로 카드를 생성합니다. 카드 클릭시 이벤트리스너를 통해 모달팝업이 띄워집니다.
- main.js : 영화 데이터 가져오기, 페이지 새로고침 기능, display 함수들을 호출합니다.
- card.css : 각각의 카드와 카드가 모인 그룹의 전체적인 디자인입니다.
- layout.css : header 와 검색창의 디자인입니다.
- swal.css : 모달팝업창의 디자인입니다.
- index.html : 페이지에서 참조하는 링크들과 전체적인 구조가 담겨있습니다.

