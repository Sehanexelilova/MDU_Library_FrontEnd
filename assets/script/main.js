const BASE_URL = "./db.json";
const page = getCurrentUrl();
let generalData;
const itemsPerPage = 10;
let currentPage = 1;
let newsCarouselContainer = document.querySelector(".news-content__carousel");
const loadingSpinner = document.querySelector(".loading-spinner");

loading();

// ! Fetch
fetch(BASE_URL)
  .then((res) => res.json())
  .then((data) => {
    generalData = data;
    if (page.pageName == "index.html") {
      getNews(data.news, 3);
      getCategory(data.category);
    }
    if (page.pageName == "news.html") {
      getRecentNews(data.news);
      pagination(data.news);
    }
    if (page.pageName == "news-inner-page.html") {
      getRecentNews(data.news);
      getNewsInnerContent(data.news);
      initSlider();
    }
    if (page.pageName == "e-catalog.html") {
      pagination(data.books);
      getOptions(data.category);
    }

    if (page.pageName == "book-inner-page.html") {
      bookDetails(data.books, data.category);
    }

    if (page.pageName == "category-inner-page.html") {
      categoryFilter(data.books);
    }
    if (page.pageName == "collaborator.html") {
      getPersonal(data.collaborators);
    }

    if (page.pageName == "audio.html") {
      pagination(data.audio);
    }
    if (page.pageName == "video.html") {
      pagination(data.video);
    }
    if (page.pageName == "gallery.html") {
      pagination(data.img);
    }
  })
  .finally(() => {
    removeLoading();
  });

//! News-page
const newsList = document.querySelector(".news-list");

function getRecentNews(data) {
  data.map((news, index) => {
    if (index < 5) {
      newsList.innerHTML += `
      <li>
                <img
                  src="${news.img}"
                  alt="${news.title}"
                  class="news-image"
                />
                <a href="./news-inner-page.html?id=${news.id}"
                  >${news.title.substring(0, 50).concat("...")}</a
                >
       </li>
      `;
    }
  });
}

//! Home-Page
const newsContainer = document.querySelector(".news-container__card-container");
const categoryContainer = document.querySelector(".e-library__card-container");

function getNews(data, count) {
  data.map((news, index) => {
    if (index < count) {
      newsContainer.innerHTML += `
      <div class="news-container__card news-page__card-width ">
                <div class="news-container__card-img">
                  <img
                    src="${news.img}"
                    alt="${news.title}"
                  />
                </div>
                <div class="news-container__card-main">
                  <div class="news-container__card-date">
                    <i class="icon-calendar-days-regular"></i>
                      ${news.date}
                    </div>
                  <a href="./news-inner-page.html?id=${news.id
        }" class="news-container__card-title">
                      ${news.title.substring(0, 25).concat("...")}
                  </a>
                  <p class="news-container__card-description">
                      ${news.content.substring(0, 55).concat("...")}
                  </p>
                  <a href="./news-inner-page.html?id=${news.id
        }" class="btn btn-primary news-container__card-link"
                    >DAHA ÇOX</a
                  >
                </div>
              </div>
      `;
    }
  });
}

function getCategory(data) {
  data.map((card) => {
    categoryContainer.innerHTML += `
    <a href="./category-inner-page.html?name=${card.title}" class="e-library__card" data-aos="zoom-in">
          <div class="e-library__card-icon">
            <i class="${card.iconClass}"></i>
          </div>
          <div class="e-library__card-name">${card.title}</div>
        </a>
`;
  });
}

// ! Personals
let collaboratorContainer = document.querySelector(
  ".collaborator-block__card-container"
);

function getPersonal(data) {
  data.map((personal, index) => {
    collaboratorContainer.innerHTML += `
      <div class="collaborator-block__card" data-aos="zoom-in">
          
            <div class="collaborator-block__card-info">
              <h3 class="collaborator-block__card-title mdu-library__title">
                ${personal.name}
              </h3>
              <div class="collaborator-block__card-description">
                <span>Vəzifə:</span>
                <p>${personal.position}</p>
             <!--
  <div class="collaborator-block__card-description">
    <span>Elmi Dərəcə:</span>
    <p>${personal.scientificDegree}</p>
  </div>
-->

            </div>
        </div>
      `;
  });
}

//! e-catalog
const booksContainer = document.querySelector(".e-books__list");
const eCatalogSelect = document.querySelector(".e-catalog__filter-select");

if (page.pageName == "e-catalog.html") {
  const eCatalogForm = document.querySelector(".e-catalog__filter-form");
  const titleInput = document.querySelector("#book-title");
  const keywordInput = document.querySelector("#book-keyword");
  const authorInput = document.querySelector("#book-author");
  const yearInput = document.querySelector("#book-year");
  const isbnInput = document.querySelector("#book-ISBN");
  const eCatalogPagination = document.querySelector(".pagination");

  eCatalogForm.addEventListener("submit", (e) => {
    if (
      titleInput.value ||
      keywordInput.value ||
      authorInput.value ||
      yearInput.value ||
      isbnInput.value ||
      eCatalogSelect.value
    ) {
      e.preventDefault();
      eCatalogPagination.classList.add("none");
      result = search(titleInput.value, "title", generalData.books);
      result = search(keywordInput.value, "title", result);
      result = search(authorInput.value, "author", result);
      result = search(yearInput.value, "year", result);
      result = search(isbnInput.value, "isbn", result);
      result = search(eCatalogSelect.value, "category", result);
      booksContainer.innerHTML = "";
      getBooks(result);
    }
  });
}

function getBooks(data) {
  data.map((book, index) => {
    booksContainer.innerHTML += `
      <div class="e-catalog__card card" data-aos="zoom-in">
                <div class="e-catalog__card-img card-img">
                  <img
                    src="${book.img}"
                    alt="${book.title}"
                  />
                </div>
                <div class="e-catalog__card-info card-info">
                  <h3
                    class="e-catalog__card-title card-title mdu-library__title"
                  >
                  ${book.title}
                  </h3>
                  <p class="e-catalog__card-author card-author">
                  ${book.author}
                  </p>
                  <a href="./book-inner-page.html?id=${book.id}" class="btn btn-primary card-btn">DAHA ÇOX</a>
                </div>
              </div>
      `;
  });
}

function getOptions(data) {
  data.map((opt) => {
    eCatalogSelect.innerHTML += `
      <option value="${opt.title}">${opt.title}</option>
    `;
  });
}

//! news-inner-page
function getNewsInnerContent(data) {
  const newsContentCarousel = document.querySelector(".news-content__carousel");
  const newsTitle = document.querySelector(".news-title");
  const newsText = document.querySelector(".news-text");

  const findNews = data.find((news) => {
    return news.id == page.id;
  });

  newsTitle.innerHTML = findNews.title;
  newsText.innerHTML = findNews.content;

  findNews.carouselImages.map(
    (img) =>
    (newsContentCarousel.innerHTML += `
                <img
                  src="${img}"
                  alt="${findNews.title}"
                  class="main-image"
                />
    `)
  );
}

//! Book-inner-page
function bookDetails(data, categories) {
  const bookInnerContent = document.querySelector(".book-inner__content");
  const bookSidebarList = document.querySelector(".book-sidebar__list");

  const findBook = data.find((news) => {
    return news.id == page.id;
  });

  bookInnerContent.innerHTML += `

          <div class="book-inner__content-left">
            <div class="book-inner__content-img">
              <img src=${findBook.img} alt="" />
            </div>
            <a href="#" class="btn btn-primary">Kitabı Oxu</a>
          </div>
          <div class="book-inner__content-right">
            <div class="book-inner__content-text">
              <p>Kitabın adı:</p>
              <span>${findBook.title}</span>
            </div>
            <div class="book-inner__content-text">
              <p>Müəllifi:</p>
              <span>${findBook.author}</span>
            </div>
            <div class="book-inner__content-text">
              <p>Mövzusu:</p>
              <span>${findBook.description}</span>
            </div>
            <div class="book-inner__content-text">
              <p>Nəşriyyat:</p>
              <span>${findBook.publisher}</span>
            </div>

            <div class="book-inner__content-text">
              <p>Səhifə sayı:</p>
              <span>${findBook.pageCount}</span>
            </div>

            <div class="book-inner__content-text">
              <p>Dil:</p>
              <span>${findBook.language}</span>
            </div>

            <div class="book-inner__content-text">
              <p>Nəşr ili:</p>
              <span>${findBook.year}</span>
            </div>

            <div class="book-inner__content-text">
              <p>Formatı:</p>
              <span>${findBook.format}</span>
            </div>

            <div class="book-inner__content-text">
              <p>Oxunma sayı:</p>
              <span>${findBook.rating}</span>
            </div>
          </div>
  `;

  categories.map((category) => {
    bookSidebarList.innerHTML += `
          <a class="book-sidebar__list-item" href="./category-inner-page.html?name=${category.title}">
              <i class="icon-arrow-right"></i>
              <span>${category.title}</span>
            </a>
`;
  });
}

//! category-inner-page
if (page.name) {
  const categoryHeaderTitle = document.querySelector(".category__header-title");
  const categoryHeaderLink = document.querySelector(".category__header-link");
  categoryHeaderTitle.innerHTML = page.name;
  categoryHeaderLink.innerHTML = page.name;

  function categoryFilter(data) {
    let result = search(page.name, "category", data);
    pagination(result);
  }
}

// ! Audio-page

const mediaContainer = document.querySelector(".media-container");
const mediaFilterForm = document.querySelector(".media__filter-form");
const mediaPagination = document.querySelector(".pagination");
const mediaTitleInput = document.querySelector("#media__title-input");

if (page.pageName == "audio.html") {
  mediaTitleInput.addEventListener("keyup", (e) => {
    result = generalData.audio.filter((audio) => {
      return audio.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    mediaContainer.innerHTML = "";
    getAudio(result);
    if (mediaTitleInput.value) {
      mediaPagination.classList.add("none");
    } else {
      mediaPagination.classList.remove("none");
    }
  });
}

function getAudio(data) {
  data.map((audio) => {
    mediaContainer.innerHTML += `
    <div class="audio-block">
            <audio controls>
              <source
                src="${audio.audio}"
                type="audio/mpeg"
              />
            </audio>
            <p>${audio.title}</p>
      </div>
    `;
  });

  // ? Audio-select
  const audios = document.querySelectorAll(".audio-block > audio");
  audios.forEach((audio) => {
    audio.addEventListener("play", () => {
      audios.forEach((otherAudio) => {
        if (otherAudio !== audio) {
          audio.parentElement.classList.add("active");
          otherAudio.parentElement.classList.remove("active");
          otherAudio.pause();
          otherAudio.currentTime = 0;
        }
      });
    });
  });
}

//! Video-page
const mediaDateInput = document.querySelector("#media__date-input");
if (page.pageName == "video.html") {
  mediaFilterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    result = search(mediaTitleInput.value, "title", generalData.video);
    result = search(mediaDateInput.value, "date", result);
    mediaContainer.innerHTML = "";
    getVideo(result);

    if (mediaTitleInput.value || mediaDateInput.value) {
      mediaPagination.classList.add("none");
    } else {
      mediaPagination.classList.remove("none");
    }
  });
}

function getVideo(data) {
  data.map((video) => {
    mediaContainer.innerHTML += `
    <div class="video-block">
            <iframe
              width="560"
              height="315"
              src="${video.src}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <p>${video.title}</p>
            <span>${video.date.replace(/-/g, "/")}</span>
        </div>
    `;
  });
}

//! Gallery-page
const galleryCard = document.querySelector(".gallery-card");

if (page.pageName == "gallery.html") {
  mediaFilterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    result = search(mediaTitleInput.value, "title", generalData.img);
    result = search(mediaDateInput.value, "date", result);
    mediaContainer.innerHTML = "";
    getGallery(result);

    if (mediaTitleInput.value || mediaDateInput.value) {
      mediaPagination.classList.add("none");
    } else {
      mediaPagination.classList.remove("none");
    }
  });
}

function getGallery(data) {
  data.map((img) => {
    mediaContainer.innerHTML += `
   <div onclick="imgDetails(${img.id})"  class="gallery-card">
            <img src="${img.src}" alt="${img.title}" />
            <span>${img.date.replace(/-/g, "/")}</span>
      </div>
    `;
  });
}

function imgDetails(id) {
  const imgDetails = document.querySelector(".img-details");
  const img = document.querySelector(".img-details  img");
  const closeButton = document.querySelector(".img-details__close-icon");
  const findImg = generalData.img.find((img) => {
    return img.id == id;
  });
  imgDetails.classList.add("active");
  img.setAttribute("src", findImg.src);
  closeButton.addEventListener("click", (e) => {
    imgDetails.classList.remove("active");
  });
}

//! functions

//* loading-spinner functions

function loading() {
  loadingSpinner.classList.add("active");
}

function removeLoading() {
  loadingSpinner.classList.remove("active");
}

//* pagination
function pagination(data) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const prevButton = document.querySelector("#pagination__prev-icon");
  const nextButton = document.querySelector("#pagination__next-icon");

  const lastSpan = document.querySelector(
    ".pagination-pages > span:last-child"
  );

  const currentSpan = document.querySelector(
    ".pagination-pages > span:nth-child(2)"
  );

  const firstSpan = document.querySelector(
    ".pagination-pages > span:first-child"
  );

  if (currentPage <= 1) {
    firstSpan.textContent = "";
  }
  currentSpan.textContent = currentPage;
  if (currentPage < totalPages) {
    lastSpan.textContent = currentPage + 1;
  } else {
    lastSpan.textContent = "";
  }

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayData(currentPage, data);
      currentSpan.textContent = currentPage;
      lastSpan.textContent = currentPage + 1;
      if (currentPage > 1) {
        firstSpan.textContent = currentPage - 1;
      } else {
        firstSpan.textContent = "";
      }
    }
  });
  displayData(currentPage, data);

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayData(currentPage, data);
      currentSpan.textContent = currentPage;
      if (totalPages > currentPage) {
        lastSpan.textContent = currentPage + 1;
      } else {
        lastSpan.textContent = "";
      }
      firstSpan.textContent = currentPage - 1;
    }
  });
}

function displayData(pageCount, data) {
  const startIndex = (pageCount - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);
  if (
    page.pageName == "e-catalog.html" ||
    page.pageName == "category-inner-page.html"
  ) {
    booksContainer.innerHTML = "";
    getBooks(pageData);
  }
  if (page.pageName == "news.html") {
    newsContainer.innerHTML = "";
    getNews(pageData, pageData.length);
  }

  if (page.pageName == "audio.html") {
    mediaContainer.innerHTML = "";
    getAudio(pageData);
  }
  if (page.pageName == "video.html") {
    mediaContainer.innerHTML = "";
    getVideo(pageData);
  }
  if (page.pageName == "gallery.html") {
    mediaContainer.innerHTML = "";
    getGallery(pageData);
  }
}

function search(searchTerm, key, data) {
  searchTerm = searchTerm.toLowerCase();
  const filteredData = data.filter((item) => {
    const currentValue = item[key].toLowerCase();
    return currentValue.includes(searchTerm);
  });
  return filteredData;
}

function getCurrentUrl() {
  let id = new URLSearchParams(window.location.search).get("id");
  let pageName = window.location.pathname.split("/").pop();
  let name = new URLSearchParams(window.location.search).get("name");

  return {
    id: id,
    pageName: pageName,
    name: name,
  };
}

//! navbar burger icon
const navbarBurgerIcon = document.querySelector(".navbar__burger-icon");
const navbarCloseIcon = document.querySelector(".navbar__close-icon");
const navbarRightSide = document.querySelector(".navbar__right-side");

navbarBurgerIcon.addEventListener("click", (e) => {
  navbarRightSide.classList.add("active");
});

navbarCloseIcon?.addEventListener("click", (e) => {
  navbarRightSide.classList.remove("active");
});

//! scroll events ---------->
window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".navbar");

  if (window.scrollY > 46) {
    navbar?.classList.add("sticky");
  } else {
    navbar?.classList.remove("sticky");
  }
});
