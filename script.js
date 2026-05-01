// 🔴 Firebase設定（あなたのもの）
const firebaseConfig = {
  apiKey: "AIzaSyC8PJ6Uf2h4jBIc_rzZJj5PUk9CREg7vtQ",
  authDomain: "ski-calendar.firebaseapp.com",
  projectId: "ski-calendar",
  storageBucket: "ski-calendar.firebasestorage.app",
  messagingSenderId: "920462939787",
  appId: "1:920462939787:web:492a35a74e9fd09d71a68e"
};

// 初期化
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

const calendar = document.getElementById("calendar");

let selectedDate = "";

/* カレンダー生成 */
for (let i = 1; i <= 31; i++) {
  const day = document.createElement("div");
  day.className = "day";
  day.id = "day-" + i;

  day.innerHTML = `<div class="date">${i}</div>`;

  day.onclick = () => openModal(i);

  calendar.appendChild(day);
}

/* リアルタイム更新 */
db.collection("events").onSnapshot(snapshot => {
  snapshot.forEach(doc => {
    const d = doc.data();
    const el = document.getElementById("day-" + d.day);

    el.innerHTML = `
      <div class="date">${d.day}</div>
      <div class="event-title">${d.text || ""}</div>
      ${d.image ? `<img src="${d.image}">` : ""}
    `;
  });
});

/* モーダル */
function openModal(day) {
  selectedDate = day;
  document.getElementById("dateTitle").textContent = day + "日";

  db.collection("events").doc(String(day)).get().then(doc => {
    if (doc.exists) {
      document.getElementById("text").value = doc.data().text || "";
    } else {
      document.getElementById("text").value = "";
    }
  });

  document.getElementById("modal").style.display = "flex";
}

/* 保存 */
async function saveEvent() {
  const text = document.getElementById("text").value;
  const file = document.getElementById("image").files[0];

  let imageUrl = "";

  if (file) {
    const ref = storage.ref("images/" + Date.now());
    await ref.put(file);
    imageUrl = await ref.getDownloadURL();
  }

  await db.collection("events").doc(String(selectedDate)).set({
    day: selectedDate,
    text: text,
    image: imageUrl
  });

  closeModal();
}

/* 閉じる */
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
