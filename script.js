const calendar = document.getElementById("calendar");
let events = {};

/* 読み込み */
fetch("events.json")
  .then(res => res.json())
  .then(data => {
    events = data;
    createCalendar();
  });

function createCalendar() {
  for (let i = 1; i <= 31; i++) {
    const day = document.createElement("div");
    day.className = "day";

    const img = document.createElement("img");
    img.src = events[i]?.image || "images/default.jpg";

    const label = document.createElement("span");
    label.textContent = i;

    day.appendChild(img);
    day.appendChild(label);

    day.onclick = () => openModal(i);

    calendar.appendChild(day);
  }
}

/* モーダル */
function openModal(day) {
  const e = events[day];

  if (!e) return;

  document.getElementById("title").textContent = e.title;
  document.getElementById("detail").innerHTML = `
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

/* JSON生成 */
function generateJSON() {
  const day = document.getElementById("day").value;

  const obj = {
    [day]: {
      title: document.getElementById("titleInput").value,
      date: document.getElementById("dateInput").value,
      place: document.getElementById("placeInput").value,
      hotel: document.getElementById("hotelInput").value,
      time: document.getElementById("timeInput").value,
      car: document.getElementById("carInput").value,
      image: document.getElementById("imageInput").value
    }
  };

  document.getElementById("output").value =
    JSON.stringify(obj, null, 2);
}
