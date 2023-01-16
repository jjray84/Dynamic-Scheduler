var cardArea = document.getElementById("card-area");

var listOfEmployees = JSON.parse(localStorage.getItem("employees"));

function createCards() {
  for (var i = 0; i < listOfEmployees.length; i++) {
    var Employee = listOfEmployees[i];
    console.log(Employee);
    var newCardHeader = document.createElement("div");
    newCardHeader.className = "card text-white bg-secondary mb-3";
    newCardHeader.setAttribute("style", "min-width: 20rem");
    newCardHeader.innerHTML = `
      <div class="card-header">${Employee.name}</div>
      <div class="card-body">
      <h4 class="card-text">Status: ${Employee.status}</h4>
      <p>Days Available: ${Employee.daysAvail}</p>
      </div> `;
    cardArea.appendChild(newCardHeader);
  }
}

createCards();