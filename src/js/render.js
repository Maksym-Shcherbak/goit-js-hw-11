export const createGallery = (arr, container) => {
  const markup = arr
    .map(
      hit => `<div class="photo-card">
      <a class = 'gallery__link' href = '${hit.largeImageURL}'>
      <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      </a>
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
  container.insertAdjacentHTML('beforeend', markup);
};
