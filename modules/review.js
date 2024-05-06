// 상단 구조
const url = new URLSearchParams(window.location.search);
const movieId = url.get("id");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjVhY2I0YWI1YjY1MzRlYjlhMTY5MmI5MWFlNjQ5MiIsInN1YiI6IjY2Mjc1N2Q3MTk3ZGU0MDE3ZDJkNTU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._21B2bQFep_OOlQFiZX23F8LcMguJbtnrZLuaRRFMbc",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
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
let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
reviews[movieId] = reviews[movieId] || []; //리뷰데이터 초기화

displayReviews(movieId);

// 리뷰 작성 및 저장
reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reviewText = document.getElementById("review-text").value.trim(); //공백 제거 후 입력값 할당.
  const reviewPassword = document
    .getElementById("review-password")
    .value.trim();

  // 비밀번호 입력 확인
  if (!reviewPassword) {
    Swal.fire({
      text: "비밀번호를 작성해주세요.",
      icon: "warning",
      confirmButtonColor: "gray",
    });
    return;
  }

  // 리뷰와 비밀번호 둘다 작성한경우
  if (reviewText && reviewPassword) {
    const newReview = {
      text: reviewText,
      timestamp: new Date().toLocaleString(),
      password: reviewPassword,
    };
    reviews[movieId].push(newReview); //ID별 새로운 리뷰데이터 추가
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("review-text").value = "";
    document.getElementById("review-password").value = "";
    displayReviews(movieId);
  }
});

// 리뷰 목록 표시
function displayReviews(movieId) {
  reviewList.innerHTML = "";
  reviews[movieId].forEach((review, index) => {
    const reviewItem = document.createElement("li");
    reviewItem.textContent = `${review.text} (${review.timestamp})`;

    //수정 버튼 추가
    const editButton = document.createElement("button");
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => editReview(movieId, index)); // 클릭시 리뷰 수정 함수 호출
    reviewItem.appendChild(editButton);

    //삭제 버튼 추가
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteReview(movieId, index)); // 클릭시 리뷰 삭제 함수 호출
    reviewItem.appendChild(deleteButton);

    reviewList.appendChild(reviewItem);
  });
}

// 리뷰 수정
function editReview(movieId, index) {
  Swal.fire({
    title: "비밀번호를 입력하세요",
    input: "password",
    showCancelButton: true,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    cancelButtonColor: "gray",

    //확인 버튼 클릭시 실행
    preConfirm: (password) => {
      if (password === reviews[movieId][index].password) {
        return Swal.fire({
          title: "수정할 리뷰를 입력하세요",
          input: "textarea",
          inputValue: reviews[movieId][index].text,
          showCancelButton: true,
          confirmButtonText: "저장",
          cancelButtonText: "취소",
          preConfirm: (newText) => {
            if (newText != null) {
              reviews[movieId][index].text = newText;
              localStorage.setItem("reviews", JSON.stringify(reviews));
              displayReviews(movieId);
              Swal.fire("수정완료", "리뷰가 수정되었습니다.", "success");
            }
          },
        });
      } else {
        Swal.fire({
          text: "비밀번호가 일치하지 않습니다.",
          icon: "error",
          confirmButtonColor: "gray",
        });
      }
    },
  });
}

// 리뷰 삭제
function deleteReview(movieId, index) {
  Swal.fire({
    title: "비밀번호를 입력하세요",
    input: "password",
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "gray",
    cancelButtonText: "취소",
    confirmButtonText: "확인",
    preConfirm: (password) => {
      if (password === reviews[movieId][index].password) {
        reviews[movieId].splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        displayReviews(movieId);
        Swal.fire("삭제완료", "리뷰가 삭제되었습니다.", "success");
      } else {
        Swal.fire({
          text: "비밀번호가 일치하지 않습니다.",
          icon: "error",
          confirmButtonColor: "gray",
        });
      }
    },
  });
}
