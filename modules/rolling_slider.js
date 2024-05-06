const rollingMovieSlides = document.querySelector(".rolling_movie_slides");
// all로 해서
const rmPlayBtn = document.querySelector(".rm_stop_btn");
const rmStopBtn = document.querySelector(".rm_play_btn");
const rollingMovieWrap = document.querySelector(
  ".rolling_movie_slides_wrapper"
);

// rolling_movie_slides를 한번 더 복사하는 기능
function clone() {
  const clone = rollingMovieSlides.cloneNode(true);
  rollingMovieWrap.appendChild(clone);

  rollingMovieSlides.offsetWidth + "px";

  rollingMovieSlides.classList.add("original");
  clone.classList.add("clone");
}

clone();

// 애니메이션 재생 시키는 기능
function animationRunning(stp) {
  // 변수 추가해서 넣기
  const rmOriginal = document.querySelector(".rolling_movie_slides.original");
  const rmClone = document.querySelector(".rolling_movie_slides.clone");
  rmOriginal.style.WebkitAnimationPlayState = `${stp}`;
  rmClone.style.WebkitAnimationPlayState = `${stp}`;
}

// 애니메이션 정지 시키는 기능
function animationPaused(run) {
  const rmOriginal = document.querySelector(".rolling_movie_slides.original");
  const rmClone = document.querySelector(".rolling_movie_slides.clone");
  rmOriginal.style.WebkitAnimationPlayState = `${run}`;
  rmClone.style.WebkitAnimationPlayState = `${run}`;
}

//클릭했을때 재생, 정지 이벤트
rmStopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationRunning("running");
  rmStopBtn.classList.remove("active");
  rmPlayBtn.classList.add("active");
});

rmPlayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationPaused("paused");
  rmPlayBtn.classList.remove("active");
  rmStopBtn.classList.add("active");
});

//마우스 오버했을때 재생, 정지 이벤트
rollingMovieWrap.addEventListener("mouseenter", () => {
  animationPaused();
});

rollingMovieWrap.addEventListener("mouseleave", () => {
  if (rmPlayBtn.classList.contains("active")) {
    animationRunning();
  }
});
