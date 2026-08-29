import { buildWaveformPath, conductionVelocity, recruitmentFraction } from "./ncs-core.mjs";

const scenarios = [
  {
    id: "normal",
    label: "Teknik olarak yeterli kayıt",
    description: "Uyarı platosunu ve başlangıç belirteçlerini doğrula.",
    latencies: { wrist: 3.6, elbow: 8.4 },
    amplitudes: { wrist: 8.6, elbow: 8.1 },
    thresholds: { wrist: 34, elbow: 40 },
    defaultCurrent: { wrist: 46, elbow: 50 },
    expectedDistance: 24,
    pattern: "beklenen aralıkta iletim örüntüsü",
  },
  {
    id: "submaximal",
    label: "Submaksimal uyarı tuzağı",
    description: "Düşük akımın CMAP genliğini ve yorum güvenini nasıl etkilediğini gör.",
    latencies: { wrist: 3.7, elbow: 8.6 },
    amplitudes: { wrist: 8.4, elbow: 7.9 },
    thresholds: { wrist: 52, elbow: 60 },
    defaultCurrent: { wrist: 24, elbow: 28 },
    expectedDistance: 24,
    pattern: "teknik yeterlilikten sonra beklenen aralıkta iletim örüntüsü",
  },
  {
    id: "slowing",
    label: "Segmental yavaşlama örüntüsü",
    description: "Teknik kontrollerden sonra sentetik yavaşlama örüntüsünü tanı.",
    latencies: { wrist: 4.2, elbow: 10.8 },
    amplitudes: { wrist: 7.8, elbow: 7.4 },
    thresholds: { wrist: 36, elbow: 44 },
    defaultCurrent: { wrist: 48, elbow: 54 },
    expectedDistance: 24,
    pattern: "segmental yavaşlama örüntüsü",
  },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const sites = ["wrist", "elbow"];
const siteText = { wrist: "Bilek uyarımı", elbow: "Dirsek uyarımı" };

let scenario = scenarios[0];
let activeSite = "wrist";
let currents = { ...scenario.defaultCurrent };
let markers = initialMarkers(scenario);
let distance = scenario.expectedDistance;

function initialMarkers(item) {
  return {
    wrist: Number((item.latencies.wrist + 0.55).toFixed(1)),
    elbow: Number((item.latencies.elbow - 0.45).toFixed(1)),
  };
}

function formatOne(value) {
  return Number.isFinite(value) ? value.toFixed(1) : "—";
}

function stimulationReady() {
  return sites.every((site) => currents[site] >= scenario.thresholds[site]);
}

function markersReady() {
  return sites.every((site) => Math.abs(markers[site] - scenario.latencies[site]) <= 0.25);
}

function distanceReady() {
  return Math.abs(distance - scenario.expectedDistance) <= 0.5;
}

function hideFeedback() {
  $("#feedback").hidden = true;
}

function renderScenarioButtons() {
  const list = $("#scenario-list");
  list.replaceChildren();
  scenarios.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "scenario-button";
    button.dataset.scenario = item.id;
    button.setAttribute("aria-pressed", String(item.id === scenario.id));
    button.innerHTML = `
      <span class="scenario-index">0${index + 1}</span>
      <span class="scenario-copy"><strong>${item.label}</strong><small>${item.description}</small></span>
      <span class="scenario-check">${item.id === scenario.id ? "✓" : ""}</span>
    `;
    button.addEventListener("click", () => selectScenario(item));
    list.append(button);
  });
}

function selectScenario(item) {
  scenario = item;
  activeSite = "wrist";
  currents = { ...item.defaultCurrent };
  markers = initialMarkers(item);
  distance = item.expectedDistance;
  hideFeedback();
  renderScenarioButtons();
  updateUI();
}

function buildGrid() {
  const svgNS = "http://www.w3.org/2000/svg";
  const grid = $("#trace-grid");
  for (let index = 0; index <= 10; index += 1) {
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", index * 76);
    line.setAttribute("x2", index * 76);
    line.setAttribute("y1", 0);
    line.setAttribute("y2", 246);
    line.setAttribute("stroke", "#89aeb4");
    line.setAttribute("stroke-opacity", index % 2 === 0 ? ".20" : ".09");
    grid.append(line);
  }
  for (let index = 0; index <= 6; index += 1) {
    const line = document.createElementNS(svgNS, "line");
    line.setAttribute("x1", 0);
    line.setAttribute("x2", 760);
    line.setAttribute("y1", index * 41);
    line.setAttribute("y2", index * 41);
    line.setAttribute("stroke", "#89aeb4");
    line.setAttribute("stroke-opacity", index === 3 ? ".22" : ".09");
    grid.append(line);
  }
  const labels = $("#trace-labels");
  [0, 4, 8, 12, 16, 20].forEach((tick) => {
    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", (tick / 20) * 744 + 4);
    text.setAttribute("y", 264);
    text.setAttribute("fill", "#78959b");
    text.setAttribute("font-size", "10");
    text.setAttribute("font-family", "ui-monospace, monospace");
    text.textContent = `${tick} ms`;
    labels.append(text);
  });
}

function updateUI() {
  const current = currents[activeSite];
  const marker = markers[activeSite];
  const recruited = recruitmentFraction(current, scenario.thresholds[activeSite]);
  const amplitude = scenario.amplitudes[activeSite] * recruited;
  const markerX = (marker / 20) * 760;
  const velocity = conductionVelocity(distance, markers.wrist, markers.elbow);

  $("#site-heading").textContent = siteText[activeSite];
  $("#current-metric").textContent = `${current} mA`;
  $("#amplitude-metric").textContent = `${formatOne(amplitude)} mV`;
  $("#marker-metric").textContent = `${formatOne(marker)} ms`;
  $("#current-value").textContent = `${current} mA`;
  $("#marker-value").textContent = `${formatOne(marker)} ms`;
  $("#current-slider").value = current;
  $("#marker-slider").value = marker;
  $("#distance-slider").value = distance;
  $("#distance-value").textContent = `${formatOne(distance)} cm`;
  $("#wrist-latency").textContent = `${formatOne(markers.wrist)} ms`;
  $("#elbow-latency").textContent = `${formatOne(markers.elbow)} ms`;
  $("#velocity-value").textContent = formatOne(velocity);
  $("#trace-path").setAttribute("d", buildWaveformPath(scenario.latencies[activeSite], scenario.amplitudes[activeSite], recruited));
  $("#marker-line").setAttribute("x1", markerX);
  $("#marker-line").setAttribute("x2", markerX);
  $("#marker-dot").setAttribute("cx", markerX);

  const siteReady = current >= scenario.thresholds[activeSite];
  const currentStatus = $("#current-status");
  currentStatus.textContent = siteReady ? "Yanıt platosu doğrulandı" : "CMAP hâlâ artıyor";
  currentStatus.classList.toggle("warning", !siteReady);

  $$(".site-button").forEach((button) => button.classList.toggle("active", button.dataset.site === activeSite));
  $("#wrist-node").classList.toggle("selected", activeSite === "wrist");
  $("#elbow-node").classList.toggle("selected", activeSite === "elbow");

  const statuses = [stimulationReady(), markersReady(), distanceReady()];
  const count = statuses.filter(Boolean).length;
  $("#check-count").textContent = count;
  $("#score-ring").textContent = count;
  $("#score-ring").style.background = `conic-gradient(#1d8b7a ${count * 33.33}%, #dce3dd 0)`;
  ["stim-check", "marker-check", "distance-check"].forEach((id, index) => $("#" + id).classList.toggle("ready", statuses[index]));
}

function evaluate() {
  const box = $("#feedback");
  const velocity = conductionVelocity(distance, markers.wrist, markers.elbow);
  let title;
  let text;
  let success = false;

  if (!stimulationReady()) {
    title = "Önce supramaksimal yanıtı doğrula";
    text = "Bilek ve dirsekte akımı basamaklı artır. CMAP genliği plato yapmadan latans ve hız yorumu güvenilir değildir.";
  } else if (!markersReady()) {
    title = "Onset belirteçlerini yeniden yerleştir";
    text = "Belirteci CMAP’ın izoelektrik hattan ilk kalıcı ayrıldığı noktaya getir. İki kayıt da ±0,2 ms içinde olmalı.";
  } else if (!distanceReady()) {
    title = "Segment mesafesini yeniden ölç";
    text = "Mesafe hatası iletim hızını doğrudan değiştirir. Anatomik seyri izleyerek iki uyarı noktası arasını ölç.";
  } else {
    title = "Ölçüm zinciri tutarlı";
    text = `Hesaplanan hız ${formatOne(velocity)} m/s. Bu sentetik kayıtta ${scenario.pattern} izleniyor. Klinik yorumda laboratuvar normlarını ve tüm sinirleri birlikte değerlendir.`;
    success = true;
  }

  box.innerHTML = `<div><strong>${success ? "✓" : "!"} ${title}</strong><span>${text}</span></div>`;
  box.classList.toggle("success", success);
  box.hidden = false;
}

$("#current-slider").addEventListener("input", (event) => {
  currents[activeSite] = Number(event.target.value);
  hideFeedback();
  updateUI();
});

$("#marker-slider").addEventListener("input", (event) => {
  markers[activeSite] = Number(event.target.value);
  hideFeedback();
  updateUI();
});

$("#distance-slider").addEventListener("input", (event) => {
  distance = Number(event.target.value);
  hideFeedback();
  updateUI();
});

$$(".site-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeSite = button.dataset.site;
    hideFeedback();
    updateUI();
  });
});

$("#reset-button").addEventListener("click", () => selectScenario(scenario));
$("#evaluate-button").addEventListener("click", evaluate);

buildGrid();
renderScenarioButtons();
updateUI();
