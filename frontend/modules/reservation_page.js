import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(`http://3.108.59.66:8082/reservations/`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    const reservationTable = document.getElementById("reservation-table");
    if (reservations.length === 0) {
      document.getElementById("no-reservation-banner").style.display = "block";
      document.getElementById("reservation-table-parent").style.display = "none";
    } else {
      document.getElementById("no-reservation-banner").style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";
  
      for (let i = 0; i < reservations.length; i++) {
        let tRow = document.createElement("tr");
        let transection = document.createElement("td");
        let name = document.createElement("td");
        let adventure = document.createElement("td");
        let persons = document.createElement("td");
        let date = document.createElement("td");
        let price = document.createElement("td");
        let time = document.createElement("td");
        let action = document.createElement("td");
        let actionBtn = document.createElement("button");
        transection.textContent = reservations[i].id;
        name.textContent = reservations[i].name;
        adventure.textContent = reservations[i].adventureName;
        persons.textContent = reservations[i].person;
        const locale = "en-IN";
        const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
        date.textContent = new Date(reservations[i].date).toLocaleDateString(
          locale,
          dateOptions
        );
        price.textContent = reservations[i].price;
        const timeOption = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        };
        time.textContent = new Date(reservations[i].time)
          .toLocaleTimeString(locale, timeOption)
          .replace(" at", ",");
        let actionLink = document.createElement("a"); 
        actionLink.href = `../../adventures/detail/?adventure=${reservations[i].adventure}`; 
        actionLink.textContent = "Visit Adventure"; 
        actionBtn.classList.add("reservation-visit-button");
        actionBtn.id = reservations[i].id;
        actionBtn.appendChild(actionLink);
        action.append(actionBtn);
        tRow.append(transection);
        tRow.append(name);
        tRow.append(adventure);
        tRow.append(persons);
        tRow.append(date);
        tRow.append(price);
        tRow.append(time);
        tRow.append(action);
        reservationTable.append(tRow);
      }
    }
}

export { fetchReservations, addReservationToTable };
