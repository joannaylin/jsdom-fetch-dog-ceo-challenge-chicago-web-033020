console.log('%c HI', 'color: firebrick')


window.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed")
  grabImages()
  grabBreeds()

})

// Dog Images
function grabImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
  .then(response => response.json())
  .then(results => results.message.forEach(image => createImages(image)))
}

// load images to DOM
function createImages(imageUrl){
  const container = document.getElementById("dog-image-container")
  const newImg = document.createElement("img")
  newImg.src = imageUrl
  container.append(newImg)
}

// Dog Breeds
function grabBreeds() { 
  const breedUrl = "https://dog.ceo/api/breeds/list/all" 
  fetch(breedUrl)
  .then(response => response.json())
  .then(results => {
    const breeds = results.message;
    createBreeds(breeds);
  })
}

// this works to just create a list of breeds, but doesn't work for the breeds that have several 'subtypes' 
// function createBreeds(breeds) {
//   const list = document.getElementById("dog-breeds")
//   breeds.forEach(function(breed) {
//     let li = document.createElement("li")
//     li.innerText = breed
//     list.append(li)
//   })
// }

function createBreeds(breeds) {
  const dogList = document.getElementById("dog-breeds")
  // allDogs will have all general breeds
  // allDogBreeds is an empty array to address general breeds that have various subBreeds in it
  const allDogs = breeds
  const allDogBreeds = []
  for (const dogBreed in allDogs) {
    if (allDogs[dogBreed].length > 0) {
      allDogs[dogBreed].forEach(function(breedType){
        let breed = `${breedType} ${dogBreed}`
        allDogBreeds.push(breed)
      })
    } else {
      allDogBreeds.push(dogBreed)
    }
  }

  allDogBreeds.forEach(function(breed){
    let li = document.createElement("li")
    li.id = breed
    li.innerText = breed
    dogList.append(li)
    li.addEventListener("click", handleColor)
  })

  const dropdown = document.getElementById("breed-dropdown")
  dropdown.addEventListener("change", function(event){
    const choice = event.target.value
    const filtered = allDogBreeds.filter(dog => (dog.charAt(0)== choice))
    const ul = document.getElementById("dog-breeds")
    while (ul.firstChild) ul.removeChild(ul.firstChild)
    filtered.forEach(function(breed){
      let li = document.createElement("li")
      li.id = breed
      li.innerText = breed
      dogList.append(li)
      li.addEventListener("click", handleColor)
    })
  })

}




// changes color of the item that was clicked
function handleColor(event) {
  const li = document.getElementById(event.target.id)
  li.style.color = "blue"
}