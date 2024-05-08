let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let nalssi = data["temp"];
    /*$("#Weather").text(nalssi);*/
    /*document.querySelector("#Weather").textContent = nalssi;*/
    console.log(document.querySelector("#Weather").src);
    if (nalssi < 20) {
      document.querySelector("#Weather").src = "../img/main/cloud_weather.PNG";
    } else if (nalssi > 30) {
      document.querySelector("#Weather").src = "../img/main/windy_weather.PNG";
    } else {
      document.querySelector("#Weather").src =
        "../img/main/sunnyday_weather.PNG";
    }
  });
/* 15도 이하면 구름그림으로 할당. 이상이면 해그림으로 할당*/
