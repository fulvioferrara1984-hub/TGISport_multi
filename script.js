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
/*function fitEmbeddedDashboard() {
  const iframe = document.getElementById("dashboard-embed");
  if (!iframe) return;

  const applyZoom = () => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc || !doc.body) return;

      doc.body.style.zoom = "1.00";
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
}*/

fitEmbeddedDashboard();

function resizeDashboardFont() {
  const iframe = document.getElementById("dashboard-embed");
  if (!iframe) return;

  iframe.addEventListener("load", () => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      if (!doc) return;

      // 🔥 RIDUCE SOLO IL FONT
      // doc.body.style.fontSize = "90%";

      // oppure più aggressivo:
      doc.body.style.transform = "scale(0.8)";
      doc.body.style.transformOrigin = "top left";

      // opzionale: riduce leggermente padding/margini
      doc.body.style.padding = "0";
      doc.body.style.margin = "0";

    } catch (e) {
      console.log("Non posso modificare iframe:", e);
    }
  });
}

resizeDashboardFont();

/* =========================
   CRAWL MULTI-SOURCE
========================= */
const FEEDS = [
  { name: "BBC Sport", url: "https://feeds.bbci.co.uk/sport/rss.xml" },
  { name: "Guardian Sport", url: "https://www.theguardian.com/uk/sport/rss" }
];

function getProxyUrl(url) {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
}

async function fetchFeed(feed) {
  const res = await fetch(getProxyUrl(feed.url), { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`${feed.name}: HTTP ${res.status}`);
  }

  const xmlText = await res.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  const items = [...xmlDoc.querySelectorAll("item")].map((item) => ({
    source: feed.name,
    title: item.querySelector("title")?.textContent?.trim() || "",
    link: item.querySelector("link")?.textContent?.trim() || "#"
  }));

  return items.filter((x) => x.title && x.link);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function resetCrawlAnimation() {
  const track = document.getElementById("crawl-track");
  if (!track) return;

  track.style.animation = "none";
  void track.offsetWidth;
  track.style.animation = "";
}

async function loadCrawl() {
  const crawlContent = document.getElementById("crawl-content");
  const crawlClone = document.getElementById("crawl-content-clone");

  if (!crawlContent || !crawlClone) return;

  try {
    const results = await Promise.allSettled(FEEDS.map(fetchFeed));

    const allItems = results
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value);

    if (!allItems.length) {
      throw new Error("Nessun feed disponibile");
    }

    // deduplica per titolo
    const seen = new Set();
    const uniqueItems = allItems.filter((item) => {
      const key = item.title.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const selectedItems = uniqueItems.slice(0, 20);

    const html = selectedItems.map((item) => `
      <span class="crawl-item">
        <span class="source">${escapeHtml(item.source)}</span>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(item.title)}
        </a>
        <span class="crawl-sep">•</span>
      </span>
    `).join("");

    crawlContent.innerHTML = html;
    crawlClone.innerHTML = html;
    resetCrawlAnimation();
  } catch (error) {
    console.error("Errore crawl:", error);

    const fallback = `
      <span class="crawl-item">
        <span class="source">SPORT</span>
        <a href="https://www.bbc.com/sport" target="_blank" rel="noopener noreferrer">
          News feed momentaneamente non disponibile
        </a>
        <span class="crawl-sep">•</span>
      </span>
    `;

    crawlContent.innerHTML = fallback;
    crawlClone.innerHTML = fallback;
    resetCrawlAnimation();
  }
}

loadCrawl();
setInterval(loadCrawl, 300000);
