function fetchcurr(locate){
  var url = `https://api.weatherbit.io/v2.0/current?city=${locate}&key=5b1f1702edbb4a2b92ad74b2fecf65e2`;

  fetch(url)
    .then(resp => resp.json())
    .then(info => {
      var w = info.data[0]; // shorthand
      document.getElementById(`w-icon`).src = `https://cdn.weatherbit.io/static/img/icons/${w.weather.icon}.png`;
      document.getElementById("temp").textContent = `Temp.:${w.temp} C`;

      document.getElementById("aqi").textContent = `AQI: ${w.aqi}`;

      document.getElementById("dewpt").textContent = `Dew Point: ${w.dewpt} C`;

      var [hr, min] = w.sunrise.split(":").map(Number);
      let thr = Math.floor(((hr * 60) + min + (5 * 60) + 30)/60);
      let tmin = (min + 30)%60;
      document.getElementById("sunrise").textContent = `Sunrise: ${thr}:${tmin<10? `0${tmin}`: `${tmin}`}`;

      var [hr, min] = w.sunset.split(":").map(Number);
      thr = Math.floor(((hr * 60) + min + (5 * 60) + 30)/60);
      tmin = (min + 30)%60;
      document.getElementById("sunset").textContent = `Sunset: ${thr}:${tmin<10? `0${tmin}`: `${tmin}`}`;

      document.getElementById("wdesc").textContent = `Weather: ${w.weather.description}`;

      document.getElementById("windd").textContent = `Wind Dir: ${w.wind_cdir}`;

      document.getElementById("winds").textContent = `Wind Speed: ${w.wind_spd} m/s`;

      document.getElementById("city").textContent = `${w.city_name}`;

      document.getElementById("country").textContent = `${w.country_code}`;

      document.getElementById("latitude").textContent = `N:${w.lat}`;

      document.getElementById("longitude").textContent = `E:${w.lon}`;
    })
    .catch(err => console.error("Weather fetch error:", err));

}

function fetchfore(locate){
  var url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${locate}&key=52f8cec380fb4ac0a0535a17a322c0a2`;
  fetch(url)
    .then(resp => resp.json())
    .then(info => {
      w = info;
      for (let i = 0; i < w.data.length; i++) {
        const[yr, mn, dt] = w.data[i].datetime.split("-");
        document.getElementById(`date${i}`).textContent =  `${mn}/${dt}`;
        
        document.getElementById(`icoi${i}`).src = 
        `https://cdn.weatherbit.io/static/img/icons/${w.data[i].weather.icon}.png`;
        
        document.getElementById(`thig${i}`).textContent = `${Math.round(w.data[i].high_temp)}c`;
        
        document.getElementById(`tlow${i}`).textContent = `${Math.round(w.data[i].low_temp)}c`;
        
        document.getElementById(`rhum${i}`).textContent = `${w.data[i].rh}%`;
        
        document.getElementById(`dewp${i}`).textContent = `${Math.round(w.data[i].dewpt)}c`;
        
        document.getElementById(`desc${i}`).textContent = `${w.data[i].weather.description}`;
      }
    })
    .catch(err => console.error("Weather fetch error:", err));
}

var locate = "Delhi"; fetchcurr(locate); fetchfore(locate);

document.getElementById("w-locate").addEventListener("submit", (e) => {
  e.preventDefault();
  let locate = document.getElementById("text-l").value;
  fetchcurr(locate); fetchfore(locate);

});

