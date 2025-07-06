const apiLink = "https://api.themoviedb.org/3/discover/movie?api_key=07a5b4428b927473fade27fe52dd472e&sort_by=popularity.desc&page=1&with_genres=28"; // Updated API link to include genre filter
const imgPath = "https://image.tmdb.org/t/p/w500"; // Image path for movie posters
const searchApi = "https://api.themoviedb.org/3/search/movie?api_key=07a5b4428b927473fade27fe52dd472e&query="; // API link for searching movies

const main = document.querySelector("#section");
const form = document.getElementById("form"); // fix variable name
const search = document.getElementById("query");

returnMovies(apiLink)

function returnMovies(url) {
    fetch(url).then(res => res.json()).then(function(data) {
        console.log(data);
        //showMovies(data.results);
        data.results.forEach(element => {
            const divCard = document.createElement('div');
            divCard.setAttribute('class', 'card');

            const divRow = document.createElement('div');
            divRow.setAttribute('class', 'row');

            const divColumn = document.createElement('div');
            divColumn.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('center');


            title.innerHTML = `${element.title}`;
            image.src = imgPath + element.poster_path;

            center.appendChild(image);
            divCard.appendChild(center);
            divCard.appendChild(title);
            divColumn.appendChild(divCard);
            divRow.appendChild(divColumn);

            main.appendChild(divRow); //this is mine
    });
            
}); 
}

form.addEventListener('submit', (e) => { // fix variable name here too
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value;

    if (searchItem) {
        returnMovies(searchApi + searchItem);
        search.value ='';
    }
}); // add missing parenthesis

