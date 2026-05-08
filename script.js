const feed = document.getElementById("feed");
const modal = document.getElementById("modal");

let eventsData = [];

// =====================
// データ読み込み
// =====================
fetch("events.json")
  .then(res => res.json())
  .then(events => {
    eventsData = events;

    // 日付順ソート
    eventsData.sort((a, b) => a.sort - b.sort);

    render(eventsData);
  });

// =====================
// 描画
// =====================
function render(events) {

  feed.innerHTML = ""; // リセット

  events.forEach((e, index) => {

    // タイプ分岐
    let typeClass = "";
    if (e.type === "アルペン") typeClass = "alpine";
    if (e.type === "全体") typeClass = "full";

    const card = document.createElement("div");
    card.className = "card " + typeClass;

    card.innerHTML = `
  <img src="${e.image}">
  <div class="overlay"></div>

  <div class="badge ${e.type === "アルペン" ? "alpine" : "normal"}">
    ${e.type === "アルペン" ? "ALPINE" : "NORMAL"}
  </div>

  <div class="text">${e.day}</div>
  <div class="title">${e.title}</div>
`;
    // クリックでモーダル
    card.addEventListener("click", () => openModal(index));

    feed.appendChild(card);
  });
}

// =====================
// モーダル表示
// =====================
let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  const e = eventsData[index];

  document.getElementById("modalTitle").textContent = e.title;

  document.getElementById("modalDetail").innerHTML = `
    <strong>日程：</strong>${e.date}<br>
    <strong>場所：</strong>${e.place}<br>
    <strong>宿泊：</strong>${e.hotel}<br>
    <strong>時間：</strong>${e.time}<br>
    <strong>車：</strong>${e.car}
  `;

  modal.style.display = "flex";
}

// =====================
// モーダル閉じる
// =====================
function closeModal() {
  modal.style.display = "none";
}

// 背景クリックでも閉じる
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// =====================
// スワイプ対応（スマホ強化🔥）
// =====================
let startX = 0;

modal.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diff = endX - startX;

  // 左スワイプ → 次
  if (diff < -50) {
    nextEvent();
  }

  // 右スワイプ → 前
  if (diff > 50) {
    prevEvent();
  }
});

function nextEvent() {
  currentIndex = (currentIndex + 1) % eventsData.length;
  openModal(currentIndex);
}

function prevEvent() {
  currentIndex = (currentIndex - 1 + eventsData.length) % eventsData.length;
  openModal(currentIndex);
}

// =====================
// キーボード操作（PC用）
// =====================
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {

    if (e.key === "ArrowRight") nextEvent();
    if (e.key === "ArrowLeft") prevEvent();
    if (e.key === "Escape") closeModal();

  }
});
