import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  let adventureId = params.get("adventure");
  return adventureId;
  // Place holder for functionality to work in the Stubs

}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(`http://3.108.59.66:8082/adventures/detail?adventure=${adventureId}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
   let name = document.getElementById("adventure-name");
   name.textContent = adventure.name;
   let sub_title = document.getElementById("adventure-subtitle");
   sub_title.textContent = adventure.subtitle;
   let photo_gallery= document.getElementById("photo-gallery");
   adventure.images.forEach(image=>{
    let div = document.createElement("div");
     let img = document.createElement("img");
     img.src = image;
     div.classList = "activity-card-image";
     div.append(img);
    photo_gallery.append(div);
   });
   let content = document.getElementById("adventure-content");
   content.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById('photo-gallery');

  // Create the carousel element
  let carousel = document.createElement('div');
  carousel.id = 'carouselExampleIndicators';
  carousel.className = 'carousel slide';
  carousel.setAttribute('data-bs-ride', 'carousel');

  // Create the carousel indicators
  let indicators = document.createElement('ol');
  indicators.className = 'carousel-indicators';

  // Create the carousel inner element
  let inner = document.createElement('div');
  inner.className = 'carousel-inner';

  // Loop through the images and create a carousel item for each
  for (let i = 0; i < images.length; i++) {
      // Create the indicator
      let indicator = document.createElement('li');
      indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
      indicator.setAttribute('data-bs-slide-to', i);
      if (i === 0) {
          indicator.className = 'active';
      }
      indicators.appendChild(indicator);

      // Create the carousel item
      let item = document.createElement('div');
      item.className = 'carousel-item';
      if (i === 0) {
          item.classList.add('active');
      }

      // Create the image element
      let img = document.createElement('img');
      img.src = images[i];
      img.className = 'd-block w-100';
      item.appendChild(img);

      inner.appendChild(item);
  }

  // Create the previous and next controls
  let prevControl = document.createElement('a');
  prevControl.className = 'carousel-control-prev';
  prevControl.href = '#carouselExampleIndicators';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-bs-slide', 'prev');

  let prevIcon = document.createElement('span');
  prevIcon.className = 'carousel-control-prev-icon';
  prevIcon.setAttribute('aria-hidden', 'true');

  let prevText = document.createElement('span');
  prevText.className = 'visually-hidden';
  prevText.textContent = 'Previous';

  prevControl.appendChild(prevIcon);
  prevControl.appendChild(prevText);

  let nextControl = document.createElement('a');
  nextControl.className = 'carousel-control-next';
  nextControl.href = '#carouselExampleIndicators';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-bs-slide', 'next');

  let nextIcon = document.createElement('span');
  nextIcon.className = 'carousel-control-next-icon';
  nextIcon.setAttribute('aria-hidden', 'true');

  let nextText = document.createElement('span');
  nextText.className = 'visually-hidden';
  nextText.textContent = 'Next';

  nextControl.appendChild(nextIcon);
  nextControl.appendChild(nextText);

  // Append everything to the carousel element
  carousel.appendChild(indicators);
  carousel.appendChild(inner);
  carousel.appendChild(prevControl);
  carousel.appendChild(nextControl);

  // Append the carousel to the photo-gallery element
  photoGallery.innerHTML = '';
  photoGallery.appendChild(carousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById('reservation-panel-sold-out').style.display = 'none';
    document.getElementById('reservation-panel-available').style.display = 'block';
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
} else {
    document.getElementById('reservation-panel-available').style.display = 'none';
    document.getElementById('reservation-panel-sold-out').style.display = 'block';
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const cost = adventure.costPerHead * persons;
  document.getElementById('reservation-cost').textContent = cost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById('myForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const date = formData.get('date');
    const person = formData.get('person');
    const adventureId = adventure.id;
    const data = { name, date, person, adventure: adventureId };
    fetch (`http://3.108.59.66:8082/reservations/new`,  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success){
          alert('Success!');
          location.reload();
        } else {
          alert('Failed!');
        }
      });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById('reserved-banner').style.display = 'block';
  } else {
    document.getElementById('reserved-banner').style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
