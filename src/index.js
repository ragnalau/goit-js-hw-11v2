import LoadMoreBtn from './components/loadMoreButton.js';
import imgsApi from './components/imgApi.js';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true, 
});

const imgApi = new imgsApi();

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchImages);

function onSubmit(e) {
  e.preventDefault();

  const searchForm = e.currentTarget;
  imgApi.searchQuery = searchForm.elements.searchQuery.value.trim();

  if (imgApi.searchQuery === '') {
    return;
  }

  clearImgList();
  imgApi.resetPage();
  loadMoreBtn.show();

  fetchImages().finally(() => searchForm.reset());
}

function fetchImages() {
  loadMoreBtn.disable();
  return imgApi
    .getImages(imgApi.searchQuery, imgApi.page)
    .then(({ hits }) => {
      if (hits.length === 0) throw new Error('No data');

      const markup = hits.reduce(
        (markup, image) => createImageCard(image) + markup,
        ''
      );
      return markup;
    })
    .then(markup => {
      updateImgList(markup);
      loadMoreBtn.enable();
    })
    .catch(onError);
}

function createImageCard(image) {
  return `
    <div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div>
  `;
}

function clearImgList() {
  gallery.innerHTML = '';
}

function updateImgList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function onError(err) {
  console.error(err);
  clearImgList();
  updateImgList('<p>Images not found</p>');
  loadMoreBtn.hide();
}
