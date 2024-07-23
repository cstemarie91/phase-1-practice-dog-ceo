console.log('%c HI', 'color: firebrick')
let allBreeds = [];

function fetchImage() {
    let itsAnImage = fetch("https://dog.ceo/api/breeds/image/random/4")
     .then(res => res.json())
     .then(renderImages);
     console.log("After Render images")
     return itsAnImage
}   

function renderImages(data) {
    const main = document.querySelector('#dog-image-container');
    data.message.forEach(imageUrl => {
      const img = document.createElement('img');
      img.src = imageUrl;
      main.appendChild(img);
    });
}
function fetchBreeds(){
  fetch("https://dog.ceo/api/breeds/list/all")
        .then(res => res.json())
        .then(data => {
            allBreeds = Object.keys(data.message); // Store all breeds
            renderBreeds(allBreeds);
        });
    }

function renderBreeds(breeds){
    const mainBreed = document.querySelector('#dog-breeds')
    mainBreed.innerHTML = '';

    breeds.forEach(breed => {
        const breedItem = document.createElement('li');
        breedItem.textContent = breed;
        mainBreed.appendChild(breedItem);
        breedItem.addEventListener('click', breedColor);
        });
    }

function breedColor(event){
    event.target.style.color = "pink"
}
function filterBreeds(letter){
    const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter));
    renderBreeds(filteredBreeds);
}



document.addEventListener('DOMContentLoaded', function() {
    fetchImage();
    fetchBreeds();


    const breedDropdown = document.querySelector('#breed-dropdown');

    breedDropdown.addEventListener('change', (event) => {
        const selectedOption = event.target.value;
        filterBreeds(selectedOption);
    });
  });