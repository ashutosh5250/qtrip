import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let respons = await fetch("http://3.108.59.66:8082/cities");
  let cities = await respons.json();
  return cities;
  }
 catch(error){
  console.log(error);
  return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
 // Create a new div element for the cit
 const divEle = document.getElementById("data")
 const cityDiv = document.createElement("div");
 cityDiv.className = "col-sm-12 col-md-6 col-lg-3 mb-4 tile";
 
 // Create an <a> tag and set its href and id attributes
let linkTag = document.createElement("a");
 linkTag.href=`pages/adventures/?city=${id}` ;
linkTag.id = id;
 
 const cityImage = document.createElement("img");
 cityImage.className = "tile"
 cityImage.setAttribute("src", image);
 cityImage.style.height = "350px";
 cityImage.style.objectFit = "cover";
 
 let textDiv = document.createElement("div");
 textDiv.className = "tile-text text-center";
 
 const cityName = document.createElement("h5");
 cityName.innerHTML = city;
 textDiv.append(cityName);
 
 const cityDescription = document.createElement("p");
 cityDescription.innerHTML = description;
 textDiv.append(cityDescription);
 
 linkTag.append(cityImage);
 cityDiv.append(textDiv);
 cityDiv.append(linkTag);
 // Wrap the cityDiv element with the <a> tag
 divEle.appendChild(cityDiv);
}

export { init, fetchCities, addCityToDOM };
