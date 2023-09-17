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
  backToTop: document.querySelector('.back-to-top'),
};

refs.searchForm.addEventListener('submit', onSearchByQuery);

const pixabay = new PixabayAPI();

let options = {
  root: null,
  rootMargin: '300px',
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
      if (response.totalHits <= pixabay.picturesOnPage) {
        observer.unobserve(refs.loadMoreBtn);
        return endListOfPictures();
      }
      const response = await pixabay.getPhotosBySearch();
      pixabay.picturesOnPage += response.hits.length;
      const photosArray = response.hits;
      createGallery(photosArray, refs.galleryList);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      console.log(cardHeight);
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      gallery.refresh();
    }
  });
}

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
  if (window.scrollY > 800) {
    // Add the "show-back-to-top" class
    refs.backToTop.classList.add('show-back-to-top');
  } else {
    // Remove the "show-back-to-top" class
    refs.backToTop.classList.remove('show-back-to-top');
  }
});

refs.backToTop.addEventListener('click', e => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
