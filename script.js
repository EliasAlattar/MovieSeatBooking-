// hämtar containern som innehåller alla säten
const container = document.querySelector(".container");
// hämtar alla säten som inte redan är upptagna
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
// dropdown för val av film
const movieSelect = document.getElementById("movie");
// element som visar antal valda säten och totalpris
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");

// nycklar för LocalStorage
const LocalStorage_SelectedSeatsKey = "selectedSeats";
const LocalStorage_SelectedMovieIndexKey = "selectedMovieIndex";

// spara säten per film 
function getSeatsStorageKey() {
    return `${LocalStorage_SelectedSeatsKey}_${movieSelect.selectedIndex}`;
}

let ticketPrice = 0;

// modell för filmdata från API
class Movie {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
}

// hämtar filmer från API och fyller dropdown
async function loadMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies");

        if (!response.ok) {
            throw new Error(`API error! Status: ${response.status}`);
        }

        const data = await response.json();

        movieSelect.innerHTML = "";

        data.forEach((movieData) => {
            const movie = new Movie(movieData.id, movieData.title, movieData.price);

            const option = document.createElement("option");
            option.value = movie.price;
            option.textContent = `${movie.title} (${movie.price} kr)`;

            movieSelect.appendChild(option);
        });

        // återställer vald film, laddar sedan valda säten och uppdaterar UI
        const savedMovieIndex = Number(localStorage.getItem(LocalStorage_SelectedMovieIndexKey));

        if (!Number.isNaN(savedMovieIndex) && movieSelect.options[savedMovieIndex]) {
            movieSelect.selectedIndex = savedMovieIndex;
        }
        ticketPrice = Number(movieSelect.value);
        loadSelectedSeats();
        updateCountAndTotal();
    } catch (error) {
        console.error("Kunde inte hämta filmer", error);
    }
}

// lyssnar på klick i hela seat-containern (event delegation)
container.addEventListener("click", (event) => {
    const seat = event.target;

    // kontrollerar att klicket är på ett säte som ej är upptaget
    if (
        seat.classList.contains("seat") &&
        !seat.classList.contains("occupied")
    ) {
        // växlar mellan valt och ej valt säte
        seat.classList.toggle("selected");

        // sparar valda säten och uppdaterar UI
        saveSelectedSeats();
        updateCountAndTotal();
    }
});

// uppdaterar priset vid filmbyte, sparar och laddar valda säten för den filmen
movieSelect.addEventListener("change", (event) => {
    ticketPrice = Number(event.target.value);
    localStorage.setItem(LocalStorage_SelectedMovieIndexKey, movieSelect.selectedIndex);
    loadSelectedSeats();
    updateCountAndTotal();
});

// räknar valda säten och uppdaterar texten i UI:t
function updateCountAndTotal() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const selectedCount = selectedSeats.length;

    countEl.textContent = selectedCount;
    totalEl.textContent = selectedCount * ticketPrice;
}

// sparar valda säten i LocalStorage som index
function saveSelectedSeats() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatIndexes = [...selectedSeats].map((seat) =>
        [...seats].indexOf(seat)
    );

    localStorage.setItem(getSeatsStorageKey(), JSON.stringify(seatIndexes));
}

// hämtar valda säten från LocalStorage och markerar dem i UI
function loadSelectedSeats() {
    seats.forEach((seat) => seat.classList.remove("selected"));
    const storedSeats = JSON.parse(localStorage.getItem(getSeatsStorageKey()));

    if (Array.isArray(storedSeats)) {
        storedSeats.forEach((index) => {
            if (seats[index]) {
                seats[index].classList.add("selected");
            }
        });
    }
}
(async () => {
    await loadMovies();
})();