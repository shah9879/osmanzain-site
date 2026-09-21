// Portfolio site. Plain JavaScript: fills in the config-driven links and runs the recorded-call demo
// (one <audio> element drives the transcript, the timeline and the job card).
(function () {
  var cfg = window.SITE || {}, demo = window.GARAGEBOT_DEMO;
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function fmt(s) { s = Math.max(0, Math.floor(s)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); }

  // ---------- links from site.config.js: an empty value hides the link, so nothing points nowhere ----------
  $$("[data-email-text]").forEach(function (a) { a.href = "mailto:" + cfg.email; a.textContent = cfg.email; });
  $$("[data-github-text]").forEach(function (a) { a.href = cfg.github; a.textContent = cfg.github.replace("https://", ""); });
  var social = {
    github: cfg.github, linkedin: cfg.linkedin, email: cfg.email && "mailto:" + cfg.email,
    whatsapp: cfg.whatsappNumber && "https://wa.me/" + cfg.whatsappNumber + "?text=" + encodeURIComponent("Hi Osman, I found your portfolio at osmanzain.com.")
  };
  $$("[data-social]").forEach(function (a) {
    var url = social[a.getAttribute("data-social")];
    if (url) a.href = url; else a.hidden = true;   // no value configured: no link
  });
  if (cfg.linkedin) {
    $("[data-linkedin-row]").hidden = false;
    $$("[data-linkedin-link]").forEach(function (a) { a.href = cfg.linkedin; a.textContent = cfg.linkedin.replace("https://www.", "").replace("https://", ""); });
  }
  if (cfg.garagebotName) $$("[data-gb-name]").forEach(function (e) { e.textContent = cfg.garagebotName; });
  $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  if (!demo) return;

  // ---------- demo: text ----------
  var total = demo.duration, recorded = demo.kind === "recorded";
  $$("[data-total]").forEach(function (e) { e.textContent = fmt(total); });
  $$("[data-line-label]").forEach(function (e) { e.textContent = (demo.lineLabel || "recorded call").toLowerCase(); });
  $$("[data-disclosure]").forEach(function (e) {
    e.textContent = recorded
      ? "A recorded conversation with the assistant, answering as a demo shop. The shop and its details are examples."
      : "Sample: a scripted call read by synthetic voices. The shop, prices and hours are examples.";
  });

  // ---------- audio + level meter ----------
  var audio = $("#audio");
  audio.src = demo.src;
  var speeds = [1, 1.25, 1.5], speedIdx = 0, analyser = null, freq = null;
  function setupAnalyser() {
    if (analyser || location.protocol === "file:") return;   // media from file:// is cross-origin to WebAudio and would go silent
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext, ctx = new Ctx(), src = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser(); analyser.fftSize = 128; analyser.smoothingTimeConstant = 0.7;
      src.connect(analyser); analyser.connect(ctx.destination);
      freq = new Uint8Array(analyser.frequencyBinCount); audio._ctx = ctx;
    } catch (e) { analyser = null; }
  }
  var levelsEl = $("[data-levels]"), N = 24, bars = [], heights = new Array(N).fill(2);
  for (var n = 0; n < N; n++) { var b = document.createElement("i"); levelsEl.appendChild(b); bars.push(b); }
  function drawLevels(playing) {
    var t = performance.now() / 1000;
    if (playing && analyser) analyser.getByteFrequencyData(freq);
    for (var i = 0; i < N; i++) {
      var target = 2;
      if (playing) {
        if (analyser) target = 2 + (freq[Math.min(freq.length - 1, Math.floor(i * freq.length / N * 0.9))] / 255) * 20;
        else target = 2 + (0.3 + 0.7 * Math.abs(Math.sin(t * 5 + i * 0.9) * Math.sin(t * 2.3 + i * 0.4))) * 14;
      }
      heights[i] += (target - heights[i]) * 0.35;
      bars[i].style.height = heights[i].toFixed(1) + "px";
    }
  }

  // ---------- timeline, transcript, job card ----------
  var timeline = $("[data-timeline]");
  var segs = demo.turns.map(function (t) {
    var s = document.createElement("div");
    s.className = "seg " + t.speaker;
    s.style.left = (t.start / total * 100) + "%";
    s.style.width = Math.max(0.4, (t.end - t.start) / total * 100) + "%";
    timeline.appendChild(s); return s;
  });
  var playhead = document.createElement("div"); playhead.className = "playhead"; timeline.appendChild(playhead);

  var list = $("[data-transcript]");
  var turnEls = demo.turns.map(function (t) {
    var li = document.createElement("li"), btn = document.createElement("button");
    btn.type = "button"; btn.className = "turn " + t.speaker;
    btn.setAttribute("aria-label", (t.speaker === "bot" ? "Assistant" : "Caller") + " at " + fmt(t.start) + ": " + t.text);
    btn.innerHTML = '<span class="who"></span><span class="txt"></span>';
    btn.querySelector(".who").textContent = t.speaker === "bot" ? "assistant" : "caller";
    btn.querySelector(".txt").textContent = t.text;
    btn.addEventListener("click", function () { seek(t.start + 0.02); play(); });
    li.appendChild(btn); list.appendChild(li); return btn;
  });

  var spec = $("[data-spec]"), rows = {}, shown = {}, state = $("[data-jc-state]");
  (demo.fieldLabels || []).forEach(function (f) {
    var d = document.createElement("div"); d.className = "row";
    d.innerHTML = "<dt></dt><dd>—</dd>"; d.querySelector("dt").textContent = f[0];
    spec.appendChild(d); rows[f[0]] = d;
  });
  function renderCard(t) {
    var want = {}, count = 0;
    demo.turns.forEach(function (turn) { if (turn.end <= t) Object.keys(turn.fields || {}).forEach(function (k) { want[k] = turn.fields[k]; }); });
    Object.keys(rows).forEach(function (k) {
      if (want[k] === shown[k]) return;
      var row = rows[k], dd = row.querySelector("dd");
      if (want[k]) { dd.textContent = want[k]; row.classList.add("filled"); row.classList.remove("flash"); void row.offsetWidth; row.classList.add("flash"); }
      else { dd.textContent = "—"; row.classList.remove("filled", "flash"); }
      shown[k] = want[k];
    });
    Object.keys(want).forEach(function () { count++; });
    state.textContent = want.status ? "sent to shop" : count ? "in progress" : "waiting";
  }

  var lastActive = -2;
  function update() {
    var t = audio.currentTime || 0, active = -1;
    playhead.style.left = Math.min(100, t / total * 100) + "%";
    demo.turns.forEach(function (turn, i) { segs[i].classList.toggle("played", turn.end <= t); if (t >= turn.start && t < turn.end) active = i; });
    segs.forEach(function (s, i) { s.classList.toggle("active", i === active); });
    if (active !== lastActive) {
      turnEls.forEach(function (el, i) { el.classList.toggle("active", i === active); el.classList.toggle("past", active === -1 ? demo.turns[i].end <= t : i < active); });
      lastActive = active;
      var el = active > -1 ? turnEls[active] : null;
      if (el && !audio.paused) {   // keep the current line visible inside the transcript box only; never scroll the page
        var top = el.parentNode.offsetTop, bottom = top + el.offsetHeight;
        if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) list.scrollTo({ top: Math.max(0, top - 30), behavior: reduceMotion ? "auto" : "smooth" });
      }
    }
    $$("[data-time]").forEach(function (e) { e.textContent = fmt(t); });
    timeline.setAttribute("aria-valuenow", String(Math.round(t / total * 100)));
    renderCard(t);
  }
  audio.addEventListener("timeupdate", update);
  audio.addEventListener("seeked", update);

  var raf = 0;
  function frame() { drawLevels(!audio.paused && !audio.ended); update(); raf = requestAnimationFrame(frame); }
  function setPlaying(on) {
    $("#garagebot").classList.toggle("is-playing", on);
    $$("[data-play]").forEach(function (x) { x.setAttribute("aria-pressed", String(on)); });
    if (on && !raf) frame();
    if (!on) setTimeout(function () { if (audio.paused) { cancelAnimationFrame(raf); raf = 0; drawLevels(false); update(); } }, 500);
  }
  function play() {
    setupAnalyser();
    if (audio._ctx && audio._ctx.state === "suspended") audio._ctx.resume();
    var p = audio.play(); if (p && p.catch) p.catch(function () {});
  }
  audio.addEventListener("play", function () { setPlaying(true); });
  audio.addEventListener("pause", function () { setPlaying(false); });
  audio.addEventListener("ended", function () { setPlaying(false); });
  function seek(t) { audio.currentTime = Math.max(0, Math.min(total, t)); update(); }

  $$("[data-play]").forEach(function (x) {
    x.addEventListener("click", function () { if (audio.paused) { if (audio.ended) audio.currentTime = 0; play(); } else audio.pause(); });
  });
  $("[data-speed]").addEventListener("click", function (e) {
    speedIdx = (speedIdx + 1) % speeds.length; audio.playbackRate = speeds[speedIdx]; e.currentTarget.textContent = speeds[speedIdx] + "×";
  });
  function seekFromPointer(e) { var r = timeline.getBoundingClientRect(); seek((e.clientX - r.left) / r.width * total); }
  var dragging = false;
  timeline.addEventListener("pointerdown", function (e) { dragging = true; timeline.setPointerCapture(e.pointerId); seekFromPointer(e); });
  timeline.addEventListener("pointermove", function (e) { if (dragging) seekFromPointer(e); });
  timeline.addEventListener("pointerup", function () { dragging = false; });
  timeline.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { seek(audio.currentTime + 5); e.preventDefault(); }
    if (e.key === "ArrowLeft") { seek(audio.currentTime - 5); e.preventDefault(); }
    if (e.key === " ") { e.preventDefault(); audio.paused ? play() : audio.pause(); }
  });
  update();
})();
