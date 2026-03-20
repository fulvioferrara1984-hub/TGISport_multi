<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2685.4">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">function updateDateTime() {</p>
<p class="p1"><span class="Apple-converted-space">  </span>const now = new Date();</p>
<p class="p1"><span class="Apple-converted-space">  </span>document.getElementById("datetime").innerText =</p>
<p class="p1"><span class="Apple-converted-space">    </span>now.toLocaleString("it-IT");</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">setInterval(updateDateTime, 1000);</p>
<p class="p1">updateDateTime();</p>
<p class="p2"><br></p>
<p class="p1">async function loadEvents() {</p>
<p class="p1"><span class="Apple-converted-space">  </span>const response = await fetch("eventi.csv");</p>
<p class="p1"><span class="Apple-converted-space">  </span>const text = await response.text();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const rows = text.split("\n").slice(1);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const events = rows.map(row =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const [date, title] = row.split(",");</p>
<p class="p1"><span class="Apple-converted-space">    </span>return {</p>
<p class="p1"><span class="Apple-converted-space">      </span>date: new Date(date),</p>
<p class="p1"><span class="Apple-converted-space">      </span>title: title</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const now = new Date();</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>const nextEvent = events</p>
<p class="p1"><span class="Apple-converted-space">    </span>.filter(e =&gt; e.date &gt; now)</p>
<p class="p1"><span class="Apple-converted-space">    </span>.sort((a, b) =&gt; a.date - b.date)[0];</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>if (nextEvent) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById("next-event").innerText =</p>
<p class="p1"><span class="Apple-converted-space">      </span>"Prossimo evento: " +</p>
<p class="p1"><span class="Apple-converted-space">      </span>nextEvent.title +</p>
<p class="p1"><span class="Apple-converted-space">      </span>" (" +</p>
<p class="p1"><span class="Apple-converted-space">      </span>nextEvent.date.toLocaleDateString("it-IT") +</p>
<p class="p1"><span class="Apple-converted-space">      </span>")";</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else {</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById("next-event").innerText =</p>
<p class="p1"><span class="Apple-converted-space">      </span>"Nessun evento futuro";</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1">}</p>
<p class="p2"><br></p>
<p class="p1">loadEvents();</p>
</body>
</html>
