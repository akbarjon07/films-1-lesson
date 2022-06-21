'use strict'

const elResult = document.querySelector(".movie__result-num");
const elMovieList = document.querySelector(".movie__list");
const elForm = document.querySelector(".form");
const elFormSelect = document.querySelector(".form__select");


elResult.textContent = films.length


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

    // SET ATTRIBUTE
    newItem.setAttribute("class", "card mb-3");
    newItem.style.width = "18rem";
    newImage.classList.add("card-img-top");
    newImage.setAttribute("src", film.poster);
    newWrapper.classList.add("card-body");
    newTitle.classList.add("card-title");
    newButton.setAttribute("class", "btn btn-danger");
    newButton.setAttribute("href", `https://www.youtube.com/watch?v=${film.youtubeId}`);

    newTitle.textContent = film.title;
    newButton.textContent = "Watch Trailer"

    const genresList = document.createElement("ul");

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
