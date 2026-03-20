/* =========================
   SLIDESHOW NEXUS
========================= */
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
  img.onerror = () => console.log("Nexus non trovata:", img.src);
  nexusIndex = (nexusIndex + 1) % nexusImages.length;
}

setInterval(updateNexus, 10000);
updateNexus();

/* =========================
   SLIDESHOW GRAFICO
========================= */
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

function updateNexus() {
  const img = document.getElementById("nexus-slideshow");
  if (!img) return;
  img.src = nexusImages[nexusIndex];
  img.onerror = () => console.log("Nexus non trovata:", img.src);
  nexusIndex = (nexusIndex + 1) % nexusImages.length;
}

setInterval(updateGrafico, 5000);
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
const FEEDS = [
  "https://feeds.bbci.co.uk/sport/rss.xml",
  "https://www.skysports.com/rss/12040"
];

async function fetchFeed(url) {
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxy);
  if (!res.ok) throw new Error("Feed error");
  return await res.text();
}

async function loadCrawl() {
  const crawlContent = document.getElementById("crawl-content");
  const crawlClone = document.getElementById("crawl-content-clone");

  if (!crawlContent || !crawlClone) return;

  let xmlText = null;

  // prova i feed uno alla volta
  for (let feed of FEEDS) {
    try {
      xmlText = await fetchFeed(feed);
      if (xmlText) break;
    } catch (e) {}
  }

  if (!xmlText) {
    crawlContent.innerHTML = "⚠️ Feed non disponibile";
    crawlClone.innerHTML = "⚠️ Feed non disponibile";
    return;
  }

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const items = [...xmlDoc.querySelectorAll("item")].slice(0, 12);

  const html = items.map(item => {
    const title = item.querySelector("title")?.textContent || "";
    const link = item.querySelector("link")?.textContent || "#";

    return `
      <span class="crawl-item">
        <span class="source">SPORT</span>
        <a href="${link}" target="_blank">${title}</a>
        <span class="crawl-sep">•</span>
      </span>
    `;
  }).join("");

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
