import { db, collection, onSnapshot } from './firebase-config.js';

const newsContainer = document.getElementById("news-container");

onSnapshot(collection(db, "news"), (snapshot) => {
  let newsItems = [];

  snapshot.forEach((doc) => {
    newsItems.push({
      id: doc.id,
      data: doc.data()
    });
  });

  displayNews(newsItems);
});

function displayNews(newsItems) {
  newsContainer.innerHTML = "";

  if (newsItems.length === 0) {
    newsContainer.innerText = "Hali yangiliklar yo'q.";
    return;
  }

  newsItems.forEach(({ id, data }) => {
    const div = document.createElement("div");
    div.className = "news-item";
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.content}</p>
      <small>${data.createdAt?.toDate().toLocaleDateString()}</small>
    `;
    newsContainer.appendChild(div);
  });
}