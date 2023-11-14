// ui.js
import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function showNotification(message, type) {
  Notiflix.Notify[type](message);
}

export function createImageCard(image) {
    // Implementation of createImageCard function
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

export function appendImagesToGallery(data, gallery, page, totalHits) {
    // Implementation of appendImagesToGallery function
    const perPage = 40;
  const startIndex = (page - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, data.hits.length);

  if (data.hits.length > 0) {
    for (let i = startIndex; i < endIndex; i++)  {
      const image = data.hits[i];
      const card = createImageCard(image);
      gallery.appendChild(card);
    }

     page++;
    
    lightbox.refresh();
  } else {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
  }

  if (page * perPage >= totalHits) {
    window.removeEventListener("scroll", infiniteScroll);
    loadMoreButton.style.display = "none";
  }
}

export function showLoadingSpinner() {
  const loadingSpinner = document.querySelector(".loading-spinner");
  loadingSpinner.style.display = "block";
}

export function hideLoadingSpinner() {
  const loadingSpinner = document.querySelector(".loading-spinner");
  loadingSpinner.style.display = "none";
}

export function initializeLightbox() {
  const lightbox = new simpleLightbox(".photo-card a", { nav: true });
  lightbox.refresh();
}
