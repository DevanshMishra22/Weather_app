let weather = {
  apiKey: "87926940df59d9180da8c4e25ab00e12",
  unsplashAccessKey: "KL87XtOohcDJVX1AgwXBNYlCSiVhCcDHT-ovg0JPPmk", 
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    this.fetchBackgroundImage(name, description);
  },
  fetchBackgroundImage: function (city, description) {
    fetch(
      `https://api.unsplash.com/photos/random?query=${city} ${description}&client_id=${this.unsplashAccessKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No image found.");
          throw new Error("No image found.");
        }
        return response.json();
      })
      .then((data) => {
        const imageUrl = data.urls.regular;
        document.body.style.backgroundImage = `url(${imageUrl})`;
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`;
      });
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("lucknow");
