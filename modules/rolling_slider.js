const rollingMovieSlides = document.querySelector(".rolling_movie_slides");
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
