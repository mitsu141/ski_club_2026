const feed = document.getElementById("feed");

fetch("events.json")
  .then(res => res.json())
  .then(events => {

    // 日付順
    events.sort((a, b) => a.sort - b.sort);

    events.forEach(e => {
      const card = document.createElement("div");

      let typeClass = "";
      if (e.type === "アルペン") typeClass = "alpine";
      if (e.type === "全体") typeClass = "full";

      card.className = "card " + typeClass;

      card.innerHTML = `
        <img src="${e.image}">
        <div class="overlay"></div>
        <div class="badge ${typeClass}">${e.type}</div>
        <div class="text">
          <div class="day">${e.day}</div>
          <div class="title">${e.title}</div>
        </div>
      `;

      card.onclick = () => openModal(e);
      feed.appendChild(card);
    });
  });

function openModal(e) {
  document.getElementById("modalTitle").textContent = e.title;

  document.getElementById("modalDetail").innerHTML = `
日程：${e.date}<br>
場所：${e.place}<br>
宿泊：${e.hotel}<br>
時間：${e.time}<br>
車：${e.car}
  `;

  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
