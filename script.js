// async function use kiya kyunki hum API call kar rahe hain (asynchronous operation)
async function getWeather() {

  // user input 
  const city = document.getElementById("cityInput").value;

  const error = document.getElementById("error");
  const loading = document.getElementById("loading");

  // UI reset 
  error.style.display = "none";
  loading.style.display = "block";

  if (city === "") {
    loading.style.display = "none";
    error.innerText = "Please enter a city!";
    error.style.display = "block";
    return;
  }

  try {
    // await use kiya kyunki fetch ko time lagta hai (server se data aata hai)
    const response = await fetch(`https://wttr.in/${city}?format=j1`);

    // response ko JSON me convert 
    const data = await response.json();

    // data extract 
    const temp = data.current_condition[0].temp_C;
    const desc = data.current_condition[0].weatherDesc[0].value;
    const humidity = data.current_condition[0].humidity;
    const wind = data.current_condition[0].windspeedKmph;
    const feelsLike = data.current_condition[0].FeelsLikeC;

    // DOM update 
    document.getElementById("temp").innerText = `${temp}°C`;
    document.getElementById("desc").innerText = desc;
    document.getElementById("cityName").innerText = city;
    document.getElementById("humidity").innerText = `${humidity}%`;
    document.getElementById("wind").innerText = `${wind} km/h`;
    document.getElementById("feelsLike").innerText = `${feelsLike}°C`;

  } catch (err) {
    // agar API fail 
    error.innerText = "City not found!";
    error.style.display = "block";
  } finally {
    
    loading.style.display = "none";
  }
}

// Enter key press function
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
    this.blur(); 
  }
});