import { getPhotosBySearch } from './js/PixabayAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

getPhotosBySearch('dog')
  .then(photos => console.log(photos))
  .catch(error => console.log(error));

const refs = {
  searchForm: document.querySelector('.search-form'),
  submitBtn: document.querySelector('.search-button'),
  galleryList: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', onSearchByQuery);

function onSearchByQuery(e) {
  e.preventDefault();
  const searchQueryValue = e.target.elements.searchQuery.value;
  getPhotosBySearch(searchQueryValue).then(res => {
    const photosArray = res.hits;
    if (photosArray.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          cssAnimationStyle: 'zoom',
          closeButton: true,
          position: 'center-top',
        }
      );
    }
    Notify.success(`Hooray! We found ${res.totalHits} images.`, {
      cssAnimationStyle: 'zoom',
      position: 'center-top',
    });
    const markup = photosArray
      .map(
        hit => `<div class="photo-card">
      <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${hit.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${hit.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${hit.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${hit.downloads}
        </p>
      </div>
    </div>`
      )
      .join('');
    refs.galleryList.innerHTML = markup;
  });
}
