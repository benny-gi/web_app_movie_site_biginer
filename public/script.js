const APILINK = '/api/v1/movies';
const SEARCHAPI = '/api/v1/movies/search?query=';
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const REVIEWS_API = '/api/v1/reviews/';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const movieSection = document.getElementById("movie-section");
const reviewSection = document.getElementById("review-section");
const reviewsContainer = document.getElementById("reviews-container");
const backButton = document.getElementById("back-button");
const submitReviewButton = document.getElementById("submit-review");
const reviewMovieTitle = document.getElementById("review-movie-title");

let currentMovieId = null;

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url).then(res => res.json()).then(function(data) {
        main.innerHTML = '';
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.src = element.poster_path ? IMG_PATH + element.poster_path : "https://via.placeholder.com/250x350?text=No+Poster";

            const title = document.createElement('h3');
            title.innerHTML = `${element.title}`;

            const center = document.createElement('center');
            center.appendChild(image);

            div_card.appendChild(center);
            div_card.appendChild(title);

            div_card.onclick = () => {
                showReviews(element.id, element.title);
            };

            main.appendChild(div_card);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value;
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});

function showReviews(movieId, movieTitle) {
    currentMovieId = movieId;
    movieSection.style.display = "none";
    reviewSection.style.display = "block";
    reviewMovieTitle.innerText = movieTitle;
    loadReviews(movieId);
}

function loadReviews(movieId) {
    reviewsContainer.innerHTML = 'Loading reviews...';
    fetch(REVIEWS_API + "movie/" + movieId).then(res => res.json()).then(function(data) {
        reviewsContainer.innerHTML = '';
        if (data.length === 0) {
            reviewsContainer.innerHTML = 'No reviews yet.';
        }
        data.forEach(review => {
            const div_review = document.createElement('div');
            div_review.setAttribute('class', 'review-card');
            div_review.innerHTML = `
                <p><strong>${review.user}</strong> (${new Date(review.date).toLocaleDateString()})</p>
                <p>${review.review}</p>
                <button onclick="deleteReview('${review._id}', '${review.user}')">Delete</button>
                <button onclick="editReview('${review._id}', '${review.user}', '${review.review}')">Edit</button>
            `;
            reviewsContainer.appendChild(div_review);
        });
    });
}

backButton.onclick = () => {
    reviewSection.style.display = "none";
    movieSection.style.display = "block";
};

submitReviewButton.onclick = () => {
    const user = document.getElementById("new-review-user").value;
    const review = document.getElementById("new-review-content").value;

    if (!user || !review) {
        alert("Please fill in both name and review.");
        return;
    }

    fetch(REVIEWS_API + "new", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "movie_id": currentMovieId,
            "user": user,
            "review": review
        })
    }).then(res => res.json()).then(res => {
        console.log(res);
        loadReviews(currentMovieId);
        document.getElementById("new-review-user").value = '';
        document.getElementById("new-review-content").value = '';
    });
};

window.deleteReview = function(id, user) {
    if (confirm("Are you sure you want to delete this review?")) {
        fetch(REVIEWS_API + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "user": user })
        }).then(res => res.json()).then(res => {
            console.log(res);
            loadReviews(currentMovieId);
        });
    }
}

window.editReview = function(id, user, oldReview) {
    const newReview = prompt("Edit your review:", oldReview);
    if (newReview && newReview !== oldReview) {
        fetch(REVIEWS_API + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user": user,
                "review": newReview
            })
        }).then(res => res.json()).then(res => {
            console.log(res);
            loadReviews(currentMovieId);
        });
    }
}
