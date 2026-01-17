// Fetch berita dari News API
async function getBerita() {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f2567ce8646b4527a3e83fe39e21a11a",
  );

  const data = await response.json();
  console.log(data.articles);

  if (data.articles.length > 0) {
    console.log("Data tidak ditemukan");
  }

  let html = "";
  html = generateHtmlBerita(data.articles);
  document.getElementById("berita").innerHTML = html;
}

// Generate HTML untuk berita
function generateHtmlBerita(data) {
  return data
    .map((berita) => {
      return `<div class="card-berita">
              <img
                src="${berita.urlToImage}"
                alt="gambar berita"
              />
              <div class="card-berita-teks">
                <h5>${limitText(berita.title, 40)}</h5>
                <small>${berita.publishedAt}</small>
                <p>
                  ${limitText(berita.content, 100)}
                </p>
              </div>
            </div>`;
    })
    .join("");
}

// Fungsi untuk membatasi teks
function limitText(text, limit) {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

// Panggil fungsi getBerita saat DOM sudah dimuat
document.addEventListener("DOMContentLoaded", getBerita());
