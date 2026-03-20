// NEXUS
const nexusImages = ["Nexus_1.png", "Nexus_2.png", "Nexus_3.png", "Nexus_4.png"];
let nexusIndex = 0;

function updateNexus() {
  document.getElementById("nexus-slideshow").src = nexusImages[nexusIndex];
  nexusIndex = (nexusIndex + 1) % nexusImages.length;
}

setInterval(updateNexus, 10000);
updateNexus();


// GRAFICO
const graficoImages = ["Grafico_1.png", "Grafico_2.png", "Grafico_3.png"];
let graficoIndex = 0;

function updateGrafico() {
  document.getElementById("grafico-slideshow").src = graficoImages[graficoIndex];
  graficoIndex = (graficoIndex + 1) % graficoImages.length;
}

setInterval(updateGrafico, 10000);
updateGrafico();

const cities = [
  { name: "Roma", tz: "Europe/Rome" },
  { name: "Londra", tz: "Europe/London" },
  { name: "New York", tz: "America/New_York" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Dubai", tz: "Asia/Dubai" }
];

function updateClocks() {
  const container = document.getElementById("clocks");
  container.innerHTML = "";

  cities.forEach(city => {
    const time = new Date().toLocaleTimeString("it-IT", {
      timeZone: city.tz
    });

    const div = document.createElement("div");
    div.className = "clock";
    div.innerHTML = `
      <div class="city">${city.name}</div>
      <div class="time">${time}</div>
    `;

    container.appendChild(div);
  });
}

setInterval(updateClocks, 1000);
updateClocks();

function updateDateTime() {
  const now = new Date();

  const formatted = now.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("datetime").innerText = formatted;
}

setInterval(updateDateTime, 1000);
updateDateTime();
