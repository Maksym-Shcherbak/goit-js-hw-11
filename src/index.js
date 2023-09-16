import { createGallery } from './js/render';
import { PixabayAPI } from './js/PixabayAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  successRequest,
  badRequest,
  needSearchQuery,
  endListOfPictures,
} from './js/notify';

const refs = {
  searchForm: document.querySelector('.search-form'),
  submitBtn: document.querySelector('.search-button'),
  galleryList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearchByQuery);

const pixabay = new PixabayAPI();

let options = {
  root: null,
  rootMargin: '1500px',
  threshold: 0,
};

let observer = new IntersectionObserver(handleIntersect, options);

const gallery = new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  showCounter: false,
});

async function onSearchByQuery(e) {
  e.preventDefault();
  pixabay.query = e.target.elements.searchQuery.value.trim();
  pixabay.page = 1;
  pixabay.picturesOnPage = 0;
  refs.galleryList.innerHTML = '';
  observer.unobserve(refs.loadMoreBtn);
  if (!pixabay.query) {
    return needSearchQuery();
  }
  const response = await pixabay.getPhotosBySearch();
  if (response) {
    const photosArray = response.hits;
    pixabay.picturesOnPage += response.hits.length;
    if (photosArray.length === 0) {
      return badRequest();
    }
    successRequest(response.totalHits);
    createGallery(photosArray, refs.galleryList);
    observer.observe(refs.loadMoreBtn);
  }
  gallery.refresh();
}

function handleIntersect(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      const response = await pixabay.getPhotosBySearch();
      pixabay.picturesOnPage += response.hits.length;
      if (response.totalHits <= pixabay.picturesOnPage) {
        observer.unobserve(refs.loadMoreBtn);
        return endListOfPictures();
      }
      const photosArray = response.hits;
      createGallery(photosArray, refs.galleryList);
      gallery.refresh();
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  });
}
