const nexusImages = [
  "./Nexus_1.png",
  "./Nexus_2.png",
  "./Nexus_3.png",
  "./Nexus_4.png"
];

let nexusIndex = 0;

function updateNexus() {
  const img = document.getElementById("nexus-slideshow");
  if (!img) return;
  img.src = nexusImages[nexusIndex];
  nexusIndex = (nexusIndex + 1) % nexusImages.length;
}

setInterval(updateNexus, 10000);
updateNexus();

const graficoImages = [
  "./Grafico_1.png",
  "./Grafico_2.png",
  "./Grafico_3.png",
  "./Grafico_4.png",
  "./Grafico_5.png",
  "./Grafico_6.png",
  "./Grafico_7.png",
  "./Grafico_8.png",
  "./Grafico_9.png",
  "./Grafico_10.png"
];

let graficoIndex = 0;

function updateGrafico() {
  const img = document.getElementById("grafico-slideshow");
  if (!img) return;
  img.src = graficoImages[graficoIndex];
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
  if (!container) return;

  container.innerHTML = "";

  cities.forEach((city) => {
    const time = new Date().toLocaleTimeString("it-IT", {
      timeZone: city.tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
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

/* Zoom solo dentro la dashboard embeddeda */
function fitEmbeddedDashboard() {
  const iframe = document.getElementById("dashboard-embed");
  if (!iframe) return;

  const applyZoom = () => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc || !doc.body) return;

      doc.body.style.zoom = "0.50";
      doc.body.style.margin = "0";
      doc.body.style.overflow = "hidden";
    } catch (err) {
      console.log("Zoom iframe non applicato:", err);
    }
  };

  iframe.addEventListener("load", () => {
    applyZoom();
    setTimeout(applyZoom, 300);
    setTimeout(applyZoom, 1000);
  });
}

fitEmbeddedDashboard();

/* Crawl minimale sicuro */
function loadCrawlFallback() {
  const crawlContent = document.getElementById("crawl-content");
  const crawlClone = document.getElementById("crawl-content-clone");
  if (!crawlContent || !crawlClone) return;

  const html = `
    <span class="crawl-item">
      <span class="source">SPORT</span>
      <a href="https://www.bbc.com/sport" target="_blank" rel="noopener noreferrer">
        Latest international sports headlines
      </a>
      <span class="crawl-sep">•</span>
    </span>
  `;

  crawlContent.innerHTML = html;
  crawlClone.innerHTML = html;
}

loadCrawlFallback();
