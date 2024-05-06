const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjVhY2I0YWI1YjY1MzRlYjlhMTY5MmI5MWFlNjQ5MiIsInN1YiI6IjY2Mjc1N2Q3MTk3ZGU0MDE3ZDJkNTU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._21B2bQFep_OOlQFiZX23F8LcMguJbtnrZLuaRRFMbc",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    // 영화 데이터 처리
    displayMoviePosters(data.results);
  });

const rollingMovieSlides = document.querySelector(".rolling_movie_slides");

// 포스터 생성
function displayMoviePosters(movies) {
  movies.forEach((movie) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const movieSlide = document.createElement("li");
    const movieLink = document.createElement("a");
    const movieImage = document.createElement("img");

    movieLink.href = `review.html?id=${movie.id}`; // URL 파라미터로 영화 ID 전달
    movieLink.target = "_blank";

    movieImage.src = moviePosterUrl;
    movieImage.alt = `${movie.title} 포스터`;

    movieLink.appendChild(movieImage);
    movieSlide.appendChild(movieLink);
    rollingMovieSlides.appendChild(movieSlide);
  });
}

// all로 해서 배열로 선택하기
const rmPlayBtn = document.querySelector(".rm_stop_btn");
const rmStopBtn = document.querySelector(".rm_play_btn");

// rolling_movie_slides를 한번 더 복사하는 기능
function clone() {
  const clone = rollingMovieSlides.cloneNode(true);
  const rollingMovieWrap = document.querySelector(
    ".rolling_movie_slides_wrapper"
  );
  rollingMovieWrap.appendChild(clone);

  rollingMovieSlides.offsetWidth + "px";

  rollingMovieSlides.classList.add("original");
  clone.classList.add("clone");
}

clone();

// 애니메이션 재생 시키는 기능
function animationRunning(yyy) {
  // 변수 추가해서 넣기
  const rmOriginal = document.querySelector(".rolling_movie_slides.original");
  const rmClone = document.querySelector(".rolling_movie_slides.clone");
  rmOriginal.style.WebkitAnimationPlayState = `${yyy}`;
  rmClone.style.WebkitAnimationPlayState = `${yyy}`;
}

// 애니메이션 정지 시키는 기능
function animationPaused() {
  const rmOriginal = document.querySelector(".rolling_movie_slides.original");
  const rmClone = document.querySelector(".rolling_movie_slides.clone");
  rmOriginal.style.WebkitAnimationPlayState = "paused";
  rmClone.style.WebkitAnimationPlayState = "paused";
}

//클릭했을때 재생, 정지 이벤트
rmStopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationRunning();
  rmStopBtn.classList.remove("active");
  rmPlayBtn.classList.add("active");
});

rmPlayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationPaused();
  rmPlayBtn.classList.remove("active");
  rmStopBtn.classList.add("active");
});

const ddd = document.querySelector(".rolling_movie_slides_wrapper");
//마우스 오버했을때 재생, 정지 이벤트
ddd.addEventListener("mouseenter", () => {
  animationPaused();
});

ddd.addEventListener("mouseleave", () => {
  if (rmPlayBtn.classList.contains("active")) {
    animationRunning();
  }
});
