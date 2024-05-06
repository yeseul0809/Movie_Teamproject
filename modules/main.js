import { displayMatchingMovies, displayMovies } from './display.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjVhY2I0YWI1YjY1MzRlYjlhMTY5MmI5MWFlNjQ5MiIsInN1YiI6IjY2Mjc1N2Q3MTk3ZGU0MDE3ZDJkNTU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._21B2bQFep_OOlQFiZX23F8LcMguJbtnrZLuaRRFMbc',
  },
};

// 영화 데이터 가져오기
fetch(
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  options
)
  .then((response) => response.json())
  .then((response) => {
    const movies = response.results;
    displayMovies(movies); // 영화 목록을 먼저 보여주는 함수 호출

    let searchButton = document.getElementById('searchButton'); // 검색 버튼
    searchButton.addEventListener('click', () => {
      let searchInput = document
        .getElementById('movieSearch')
        .value.toLowerCase(); // 사용자 입력값 알파벳 소문자순으로
      displayMatchingMovies(movies, searchInput); // 입력값과 일치하는 영화만 보여주는 함수 호출

      // form 요소에 keypress 이벤트 리스너 추가
      let searchForm = document.getElementById('searchForm');
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let searchInput = document
          .getElementById('movieSearch')
          .value.toLowerCase();
        displayMatchingMovies(movies, searchInput);
      });
    });
  })
  .catch((err) => console.error(err));
