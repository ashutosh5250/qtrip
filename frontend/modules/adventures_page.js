
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get("city");
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(`http://3.108.59.66:8082/adventures?city=${city}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const container = document.querySelector("#data");
  container.innerHTML = ""

  adventures.forEach(adventure => {
    // Create a card element
    let divEle = document.createElement("div");
    divEle.className = "col-sm-12 col-md-6 col-lg-3 mb-4 ";
    let card = document.createElement('div');
    card.className = 'activity-card';

    // Add image to card
    let img = document.createElement('img');
    img.src = adventure.image;
    img.classList.add('activity-card', 'img');
    card.appendChild(img);

    // Add category banner to card
    let categoryBanner = document.createElement('div');
    categoryBanner.classList.add('category-banner');
    categoryBanner.innerHTML = adventure.category;
    card.appendChild(categoryBanner);

    // Add adventure name, cost, and duration to card
    let name = document.createElement('h3');
    name.innerHTML = adventure.name;
    card.appendChild(name);

    let cost = document.createElement('p');
    cost.innerHTML = `Cost per head: ${adventure.costPerHead}`;
    card.appendChild(cost);

    let duration = document.createElement('p');
    duration.innerHTML = `Duration: ${adventure.duration}`;
    card.appendChild(duration);

    // Add link to adventure details page
    let link = document.createElement('a');
    link.href = `detail/?adventure=${adventure.id}`;
    link.id = `${adventure.id}`;
    link.appendChild(card);
    divEle.append(link)

    container.appendChild(divEle);

  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((ele) => ele.duration >= low && ele.duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((ele) => categoryList.includes(ele.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
 if(filters.duration.length>0 && filters.category.length>0){
  let choise = filters.duration.split("-");
  filteredList = filterByDuration(list , parseInt(choise[0]),parseInt(choise[1]));
  filteredList = filterByCategory(filteredList,filters.category); 
 }else if(filters.duration.length>0){
  let choise = filters.duration.split("-");
   filteredList = filterByDuration(list , parseInt(choise[0]),parseInt(choise[1]));
 }else if(filters.category.length>0){
   filteredList = filterByCategory(list,filters.category);
 }else{
  filteredList = list;
 }
 return filteredList;
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
 localStorage.setItem("filters" ,JSON.stringify(filters))
 return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem("filters"))
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters.duration;
  filters.category.forEach((key)=>{
    let ele = document.createElement("div");
    ele.className = "category-filter";
    ele.innerHTML = `<div>${key}</div>`;
    document.getElementById("category-list").append(ele);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
