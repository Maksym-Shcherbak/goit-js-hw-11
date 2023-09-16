import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const successRequest = quantity => {
  Notify.success(`Hooray! We found ${quantity} images.`, {
    cssAnimationStyle: 'zoom',
    position: 'center-top',
  });
};

export const badRequest = () => {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      cssAnimationStyle: 'zoom',
      closeButton: true,
      position: 'center-top',
    }
  );
};

export const needSearchQuery = () => {
  Notify.info('Please, write something', {
    cssAnimationStyle: 'zoom',
    position: 'center-top',
  });
};

export const endListOfPictures = () => {
  Notify.info("We're sorry, but you've reached the end of search results", {
    cssAnimationStyle: 'zoom',
    position: 'center-top',
  });
};
