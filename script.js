const feed = document.getElementById("feed");
const modal = document.getElementById("modal");

let eventsData = [];

fetch("events.json")
  .then(res => res.json())
  .then(events => {

    eventsData = events.sort((a, b) => a.sort - b.sort);

    render(eventsData);
  })
  .catch(err => {
    console.error("JSONエラー:", err);
  });

function render(events) {

  feed.innerHTML = "";

  events.forEach((e, index) => {

    const typeClass =
      e.type === "ALPINE"
        ? "alpine"
        : "normal";

    const badgeText =
      e.type === "ALPINE"
        ? "ALPINE"
        : "NORMAL";

    const card = document.createElement("div");

    card.className = `card ${typeClass}`;

    card.innerHTML = `
      <img src="${e.image}" alt="">

      <div class="overlay"></div>

      <div class="badge ${typeClass}">
        ${badgeText}
      </div>

      <div class="text">
        ${e.day}
      </div>

      <div class="title">
        ${e.title}
      </div>
    `;

    card.addEventListener("click", () => {
      openModal(index);
    });

    feed.appendChild(card);

  });

}

function openModal(index) {

  const e = eventsData[index];

  document.getElementById("modalTitle").textContent = e.title;

  document.getElementById("modalDetail").innerHTML = `
    <p><b>日程：</b>${e.date}</p>
    <p><b>場所：</b>${e.place}</p>
    <p><b>宿泊：</b>${e.hotel}</p>
    <p><b>時間：</b>${e.time}</p>
    <p><b>車：</b>${e.car}</p>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}
