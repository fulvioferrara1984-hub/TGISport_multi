/* =========================
   SLIDESHOW NEXUS
========================= */
const nexusImages = ["Nexus_1.png", "Nexus_2.png", "Nexus_3.png"];
let nexusIndex = 0;

function updateNexus() {
  const img = document.getElementById("nexus-slideshow");
  if (!img) return;
  img.src = nexusImages[nexusIndex];
  nexusIndex = (nexusIndex + 1) % nexusImages.length;
}

setInterval(updateNexus, 10000);
updateNexus();

/* =========================
   SLIDESHOW GRAFICO
========================= */
const graficoImages = ["Grafico_1.png", "Grafico_2.png", "Grafico_3.png"];
let graficoIndex = 0;

function updateGrafico() {
  const img = document.getElementById("grafico-slideshow");
  if (!img) return;
  img.src = graficoImages[graficoIndex];
  graficoIndex = (graficoIndex + 1) % graficoImages.length;
}

setInterval(updateGrafico, 10000);
updateGrafico();

/* =========================
   OROLOGI MONDO
========================= */
const cities = [
  { name: "Rome", tz: "Europe/Rome" },
  { name: "London", tz: "Europe/London" },
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

/* =========================
   CRAWL ESPN RSS
   - usa feed ufficiale ESPN
   - fetch via proxy CORS
========================= */
const ESPN_RSS_URL = "https://www.espn.com/espn/rss/news";
const CORS_PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(ESPN_RSS_URL)}`;

async function loadCrawl() {
  const crawlContent = document.getElementById("crawl-content");
  const crawlClone = document.getElementById("crawl-content-clone");

  if (!crawlContent || !crawlClone) return;

  try {
    const response = await fetch(CORS_PROXY_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const items = [...xmlDoc.querySelectorAll("item")].slice(0, 12);

    if (!items.length) {
      throw new Error("No RSS items found");
    }

    const html = items
      .map((item) => {
        const title = item.querySelector("title")?.textContent?.trim() || "";
        const link = item.querySelector("link")?.textContent?.trim() || "#";
        return `
          <span class="crawl-item">
            <span class="source">ESPN</span>
            <a href="${link}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
            <span class="crawl-sep">•</span>
          </span>
        `;
      })
      .join("");

    crawlContent.innerHTML = html;
    crawlClone.innerHTML = html;

    resetCrawlAnimation();
  } catch (error) {
    const fallback = `
      <span class="crawl-item">
        <span class="source">ESPN</span>
        <a href="https://www.espn.com/" target="_blank" rel="noopener noreferrer">
          Top headlines unavailable at the moment — open ESPN for live updates.
        </a>
        <span class="crawl-sep">•</span>
      </span>
    `;

    crawlContent.innerHTML = fallback;
    crawlClone.innerHTML = fallback;

    resetCrawlAnimation();
  }
}

function resetCrawlAnimation() {
  const track = document.getElementById("crawl-track");
  if (!track) return;
  track.style.animation = "none";
  void track.offsetWidth;
  track.style.animation = "";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

loadCrawl();
setInterval(loadCrawl, 300000);
