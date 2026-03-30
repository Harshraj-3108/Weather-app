// async function kyunki API call async hota hai
async function getWeather() {

  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  const error = document.getElementById("error");
  const loading = document.getElementById("loading");

  // reset UI
  error.style.display = "none";
  loading.style.display = "block";

  // empty input check (improved)
  if (city === "") {
    loading.style.display = "none";
    error.innerText = "❌ Please enter a city name!";
    error.style.display = "block";
    return;
  }

  try {
    // API call
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();

    // data extract
    const temp = data.current_condition[0].temp_C;
    const desc = data.current_condition[0].weatherDesc[0].value;
    const humidity = data.current_condition[0].humidity;
    const wind = data.current_condition[0].windspeedKmph;
    const feelsLike = data.current_condition[0].FeelsLikeC;

    // city capitalize (improved UX 🔥)
    const formattedCity =
      city.charAt(0).toUpperCase() + city.slice(1);

    // update UI
    document.getElementById("temp").innerText = `${temp}°C`;
    document.getElementById("desc").innerText = desc;
    document.getElementById("cityName").innerText = formattedCity;
    document.getElementById("humidity").innerText = `${humidity}%`;
    document.getElementById("wind").innerText = `${wind} km/h`;
    document.getElementById("feelsLike").innerText = `${feelsLike}°C`;

    // 🔥 Weather Icon Logic (NEW FEATURE)
    const icon = document.getElementById("weatherIcon");
    const condition = data.current_condition[0].weatherDesc[0].value.toLowerCase();

    if (condition.includes("sun") || condition.includes("clear")) {
      icon.innerText = "☀️";
    } else if (condition.includes("cloud")) {
      icon.innerText = "☁️";
    } else if (condition.includes("rain")) {
      icon.innerText = "🌧️";
    } else if (condition.includes("storm") || condition.includes("thunder")) {
      icon.innerText = "⛈️";
    } else if (condition.includes("snow")) {
      icon.innerText = "❄️";
    } else {
      icon.innerText = "🌤️";
    }

  } catch (err) {
    // better error message
    error.innerText = "❌ City not found. Try again!";
    error.style.display = "block";
  } finally {
    // loading hide
    loading.style.display = "none";
  }
}

// Enter key support + blur (UX improved)
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
    this.blur();
  }
});
