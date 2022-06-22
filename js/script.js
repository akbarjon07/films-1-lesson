'use strict'

const elResult = document.querySelector(".movie__result-num");
const elMovieList = document.querySelector(".movie__list");
const elForm = document.querySelector(".form");
const elFormSelect = document.querySelector(".form__select");
const elBookmarkList = document.querySelector(".bookmark__list");

elResult.textContent = films.length

const bookmarks = [];


elBookmarkList.addEventListener("click", function(evt){
  if (evt.target.matches(".delete-btn")){
    const bookmarkDeleteId = evt.target.dataset.bookmarkDeleteId;
    const bookmarkFoundIndex = bookmarks.findIndex((bookmark) => {
      bookmark.id === bookmarkDeleteId
    })

    bookmarks.splice(bookmarkFoundIndex, 1)

    elBookmarkList.innerHTML = null;

    renderBookmarks(bookmarks, elBookmarkList);
  }
})

const renderBookmarks = function (arr, htmlElement) {
  arr.forEach((bookmark) => {
    const newBookmarkItem = document.createElement("li");
    const newDeleteDtn = document.createElement("button");

    newBookmarkItem.textContent = bookmark.title;
    newDeleteDtn.textContent = "Remove";

    newDeleteDtn.setAttribute("class", "delete-btn btn btn-danger ms-3")

    newDeleteDtn.dataset.bookmarkDeleteId = bookmark.id;

    htmlElement.appendChild(newBookmarkItem);
    newBookmarkItem.appendChild(newDeleteDtn);
  })
}


elMovieList.addEventListener("click", function (evt) {

  if (evt.target.matches(".bookmark")) {
    const bookmarkBtnId = evt.target.dataset.bookmarkBtnId;
    const foundFilmIndex = films.find((film) => film.id === bookmarkBtnId);

    if (!bookmarks.includes(foundFilmIndex)) {
      bookmarks.push(foundFilmIndex);
    }


    elBookmarkList.innerHTML = null;

    renderBookmarks(bookmarks, elBookmarkList)
  }

})


const renderGenres = function (arr) {
  const uniqueGenres = [];

  arr.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
    });
  });

  uniqueGenres.forEach((genre) => {
    const genresOption = document.createElement("option");

    genresOption.textContent = genre;
    genresOption.value = genre;



    elFormSelect.appendChild(genresOption);
  });
};

renderGenres(films)


const renderMovies = function (filmsArr, htmlElement) {
  filmsArr.forEach((film) => {
    // CREATE ELEMENTS
    const newItem = document.createElement("li");
    const newImage = document.createElement("img");
    const newWrapper = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newButton = document.createElement("a");
    const genresList = document.createElement("ul");
    const newBookmarkBtn = document.createElement("button");

    // SET ATTRIBUTE
    newItem.setAttribute("class", "card mb-3");
    newItem.style.width = "18rem";
    newImage.classList.add("card-img-top");
    newImage.setAttribute("src", film.poster);
    newWrapper.classList.add("card-body");
    newTitle.classList.add("card-title");
    newButton.setAttribute("class", "btn btn-danger");
    newButton.setAttribute("href", `https://www.youtube.com/watch?v=${film.youtubeId}`);
    newBookmarkBtn.setAttribute("class", "bookmark btn btn-secondary mt-3")

    newTitle.textContent = film.title;
    newButton.textContent = "Watch Trailer";
    newBookmarkBtn.textContent = "Bookmark";

    newBookmarkBtn.dataset.bookmarkBtnId = film.id



    film.genres.forEach((genre) => {
      const genresItem = document.createElement("li");

      genresItem.textContent = genre;

      genresList.appendChild(genresItem);
    });

    // APPEND
    htmlElement.appendChild(newItem);
    newItem.appendChild(newImage);
    newItem.appendChild(newWrapper);
    newWrapper.appendChild(newTitle);
    newWrapper.appendChild(newButton);
    newWrapper.appendChild(genresList);
    newWrapper.appendChild(newBookmarkBtn);


  });
}
renderMovies(films, elMovieList);

elForm.addEventListener("submit", function (evt){
  evt.preventDefault()

  elMovieList.innerHTML = null;

  const selectedValue = elFormSelect.value;

  const filteredFilms = [];

  films.forEach(function(film){
    if(selectedValue === "all" || film.genres.includes(selectedValue)) {
      filteredFilms.push(film)
    }
  })

  elResult.textContent = filteredFilms.length

  renderMovies(filteredFilms, elMovieList)

})
