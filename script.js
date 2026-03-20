function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").innerText =
    now.toLocaleString("it-IT");
}

setInterval(updateDateTime, 1000);
updateDateTime();


async function loadEvents() {
  const response = await fetch("eventi.csv");
  const text = await response.text();

  const rows = text.split("\n").slice(1);
  const events = rows.map(row => {
    const [date, title] = row.split(",");
    return {
      date: new Date(date),
      title: title
    };
  });

  const now = new Date();

  const nextEvent = events
    .filter(e => e.date > now)
    .sort((a, b) => a.date - b.date)[0];

  if (nextEvent) {
    document.getElementById("next-event").innerText =
      "Prossimo evento: " +
      nextEvent.title +
      " (" +
      nextEvent.date.toLocaleDateString("it-IT") +
      ")";
  } else {
    document.getElementById("next-event").innerText =
      "Nessun evento futuro";
  }
}

loadEvents();
