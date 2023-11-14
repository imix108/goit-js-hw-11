import axios from "axios";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";

const searchForm = document.getElementById("search-form");
const gallery = document.querySelector(".gallery");
const loadMoreButton = document.querySelector(".load-more");
let page = 1;
let totalHits = 0;

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchQuery = searchForm.searchQuery.value;

  if (!searchQuery.trim()) {
    Notiflix.Notify.warning("Please enter a search query.");
    return;
  }

  gallery.innerHTML = "";
  page = 1;

  try {
    const data = await searchImagesByQuery(searchQuery);
    totalHits = data.totalHits;

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    appendImagesToGallery(data);
    if (totalHits > 40) {
      loadMoreButton.style.display = "block";
    }
    else {
      loadMoreButton.style.display = "none";
    }

  } catch (error) {
    console.error("Error:", error);
    Notiflix.Notify.failure("Something went wrong. Please try again later.");
  }
});

loadMoreButton.addEventListener("click", () => {
  
  searchImagesByQuery(searchForm.searchQuery.value, page)
    .then((data) => {
      appendImagesToGallery(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      Notiflix.Notify.failure("Something went wrong. Please try again later.");
    });
});

function appendImagesToGallery(data) {
  const perPage = 40;
  const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, data.hits.length);

  if (data.hits.length > 0) {
    for (let i = startIndex; i < endIndex; i++)  {
      const image = data.hits[i];
      const card = createImageCard(image);
      gallery.appendChild(card);
    }
   
    lightbox.refresh();
  } else {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }

  if (page * perPage >= totalHits) {
    window.removeEventListener("scroll", infiniteScroll);
    loadMoreButton.style.display = "none";
  }
}

async function searchImagesByQuery(query, pageNumber = 1) {
  const apiKey = "40531611-c718006264cffa07f6ed617b2";
  const perPage = 40;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
}

function createImageCard(image) {
  const card = document.createElement("div");
  card.className = "photo-card";

  const imageLink = document.createElement("a");
  imageLink.href = image.largeImageURL;

  const imageElement = document.createElement("img");
  imageElement.src = image.webformatURL;
  imageElement.alt = image.tags;
  imageElement.loading = "lazy";

  const info = document.createElement("div");
  info.className = "info";

  const likes = document.createElement("p");
  likes.className = "info-item";
  likes.innerHTML = `<b>Likes:</b> ${image.likes}`;

  const views = document.createElement("p");
  views.className = "info-item";
  views.innerHTML = `<b>Views:</b> ${image.views}`;

  const comments = document.createElement("p");
  comments.className = "info-item";
  comments.innerHTML = `<b>Comments:</b> ${image.comments}`;

  const downloads = document.createElement("p");
  downloads.className = "info-item";
  downloads.innerHTML = `<b>Downloads:</b> ${image.downloads}`;

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  imageLink.appendChild(imageElement);
  card.appendChild(imageLink);
  card.appendChild(info);

  return card;
}


const lightbox = new simpleLightbox(".photo-card a", { nav: true });
lightbox.refresh();

window.addEventListener("scroll", infiniteScroll);
function infiniteScroll() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  
  const threshold = 200;

  if (scrollPosition >= documentHeight - threshold) {
     searchImagesByQuery(searchForm.searchQuery.value, page + 1)
      .then((data) => {
        appendImagesToGallery(data);
        // Increment the page variable
        page++;
      })
      .catch((error) => {
        console.error("Error:", error);
        Notiflix.Notify.failure("Something went wrong. Please try again later.");
      });
  }
}

function loadMoreImages() {
  searchImagesByQuery(searchForm.searchQuery.value, page)
    .then((data) => {
      appendImagesToGallery(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      Notiflix.Notify.failure("Something went wrong. Please try again later.");
    });
}

// main.js


// Continue with the event listener for the load more button, infinite scroll, and other functions as needed
