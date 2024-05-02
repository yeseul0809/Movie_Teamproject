// 상단 구조
const url = new URLSearchParams(window.location.search);
const movieId = url.get("id");

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
  .then((response) => response.json())
  .then((data) => {
    document.querySelector(
      "#movie-poster"
    ).style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`;
    document.getElementById("movie-title").textContent = data.title;
    document.getElementById("movie-description").textContent = data.overview;
    document.getElementById(
      "movie-rating"
    ).textContent = `Rating : ${data.vote_average}`;
  })
  .catch((err) => console.error(err));

// 리뷰 관련 기능
const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");

// 로컬 스토리지에서 리뷰 데이터 가져오기
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
displayReviews();

// 리뷰 작성 및 저장
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reviewText = document.getElementById("review-text").value.trim();
  if (reviewText) {
    const newReview = {
      text: reviewText,
      timestamp: new Date().toLocaleString(),
    };
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    document.getElementById("review-text").value = "";
    displayReviews();
  }
});

// 리뷰 목록 표시
function displayReviews() {
  reviewList.innerHTML = "";
  reviews.forEach((review, index) => {
    const reviewItem = document.createElement("li");
    reviewItem.textContent = `${review.text} (${review.timestamp})`;

    //수정 버튼 추가
    const editButton = document.createElement("button");
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => editReview(index, review));
    reviewItem.appendChild(editButton);

    //삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteReview(index));
    reviewItem.appendChild(deleteButton);

    reviewList.appendChild(reviewItem);
  });
}
